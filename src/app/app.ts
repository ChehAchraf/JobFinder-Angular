import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ThemeButtonComponent} from './shared/components/theme-button-component/theme-button-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('JobFinder');
}
