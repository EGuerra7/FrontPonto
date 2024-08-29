import { UsuarioService } from './../service/usuario.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { BlueboxComponent } from '../shared/bluebox/bluebox.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../model/usuario.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [HeaderComponent, BlueboxComponent, CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  usuarioForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),
    cargaHoraria: new FormControl(null),
    cargo: new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
    permissao: new FormControl(null)
  })

  constructor(private usuarioService: UsuarioService) { }

  cadastrar() {
    const formData: Usuario = this.usuarioForm.value;

    console.log(formData);

    this.usuarioService.registrarUsuario(formData).subscribe(response => {
      alert("Usuario cadastrado com sucesso!");
      this.usuarioForm.reset();
    }, error => {
      alert("Error!" + JSON.stringify(error));
    })
  }
}
