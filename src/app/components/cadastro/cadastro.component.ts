import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { BlueboxComponent } from '../shared/bluebox/bluebox.component';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [HeaderComponent, BlueboxComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

}
