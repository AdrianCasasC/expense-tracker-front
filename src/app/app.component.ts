import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';
import { NotificationComponent } from './components/notification/notification.component';

// "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=4200 --user-data-dir="C:\chrome-debug"
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterMenuComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'expense-tracker-front';
}
