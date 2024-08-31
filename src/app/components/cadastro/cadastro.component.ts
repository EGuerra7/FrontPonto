import { UsuarioService } from './../service/usuario.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { BlueboxComponent } from '../shared/bluebox/bluebox.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../model/usuario.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [HeaderComponent, BlueboxComponent, CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, RouterModule, FooterComponent],
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

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) { }

  cadastrar() {
    const formData: Usuario = this.usuarioForm.value;

    this.usuarioService.registrarUsuario(formData).subscribe(response => {
      this.showSuccess(formData.nome!, "Usuário cadastrado!")
      this.usuarioForm.reset();
    }, error => {
      this.showError()
    })
  }

  showSuccess( msg: string, titulo: string) {
    this.toastr.success(msg, titulo);
  }

  showError(){
    this.toastr.error("Erro no cadastro", "Error!")
  }
}
