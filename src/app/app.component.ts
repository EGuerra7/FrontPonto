import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroComponent } from "./components/cadastro/cadastro.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CadastroComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FRONTPONTO';
}
