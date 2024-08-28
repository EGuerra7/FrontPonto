import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { BlueboxComponent } from "../shared/bluebox/bluebox.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, BlueboxComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
