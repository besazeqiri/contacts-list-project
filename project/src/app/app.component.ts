import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  color = 'red';



  opened = false;

  toggleSidebar() {
    this.opened = !this.opened;

  }
}
