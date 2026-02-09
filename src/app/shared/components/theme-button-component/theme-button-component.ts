import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-button-component',
  imports: [],
  templateUrl: './theme-button-component.html',
  styleUrl: './theme-button-component.css',
})
export class ThemeButtonComponent {
  currentTheme = 'light';
  ngOnInit(){
    const theme = localStorage.getItem("theme");

    if(theme){
      this.currentTheme = theme;
      document.documentElement.setAttribute('data-theme',theme);
    }
  }

  toggleTheme(event: any){
    const isChecked = event.target.checked;
    const theme = isChecked ? 'dracula' : 'light';

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

}
