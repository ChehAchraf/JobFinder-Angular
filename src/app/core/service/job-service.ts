import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';
import { Job, JobResponse } from '../model/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {

  private readonly http = inject(HttpClient)
  private readonly apiUrl: string = environment.apiUrl

  getJobs(page: number = 1, search?: string, location?: string): Observable<JobResponse> {
    // Standard pagination with client-side filter (current page only)
    // Used when strictly browsing or if we revert to server-pagination
    let params = new HttpParams().set('page', page.toString())
    if (location) {
      params = params.set('location', location)
    }
    return this.http.get<JobResponse>(this.apiUrl, { params })
  }

  // Fetch multiple pages to simulate global search
  searchGlobalJobs(search: string, location: string): Observable<Job[]> {
    const pagesToFetch = [0, 1, 2, 3, 4]; // Fetch first 5 pages (API starts at 0 sometimes, checking standard)
    // The Muse API uses page=0 or page=1? Previous response usually showed page 1. safely try 0-4 or 1-5.
    // Let's use items_per_page=50 to get specific density.

    const requests = pagesToFetch.map(page => {
      let params = new HttpParams()
        .set('page', page.toString())
        .set('items_per_page', '50'); // Fetch 50 per page

      return this.http.get<JobResponse>(this.apiUrl, { params }).pipe(
        map(res => res.results)
      );
    });

    return forkJoin(requests).pipe(
      map(resultsArray => {
        // Flatten array of arrays
        const allJobs = resultsArray.flat();

        // Client-side filtering
        const keyword = search.trim().toLowerCase();
        const loc = location.trim().toLowerCase();

        return allJobs.filter(job => {
          const matchesKeyword = !keyword ||
            job.name.toLowerCase().includes(keyword) ||
            job.company.name.toLowerCase().includes(keyword);

          const matchesLocation = !loc ||
            job.locations.some(l => l.name.toLowerCase().includes(loc));

          return matchesKeyword && matchesLocation;
        });
      })
    );
  }

}
