import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'expense-tracker-front';
}
