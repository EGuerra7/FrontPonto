import { UsuarioService } from './../service/usuario.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { BlueboxComponent } from '../shared/bluebox/bluebox.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    id: new FormControl('', Validators.required),
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    cargaHoraria: new FormControl(null, [Validators.required]),
    cargo: new FormControl('', Validators.required),
    email: new FormControl(''),
    senha: new FormControl(''),
    ativo: new FormControl(true),
    permissao: new FormControl(null)
  })

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) { }

  cadastrar() {
    if(this.usuarioForm.valid){
      const formData: Usuario = this.usuarioForm.value;

      this.usuarioService.registrarUsuario(formData).subscribe(response => {
        this.showSuccess(formData.nome!, "Usuário cadastrado!")
        this.usuarioForm.reset();
      }, error => {
        this.showError("Erro no cadastro");
      })
    } else {
      this.showError("Está faltando informações");
    }
}

  showSuccess( msg: string, titulo: string) {
    this.toastr.success(msg, titulo);
  }

  showError(msg: string){
    this.toastr.error(msg, "Error!")
  }
}
