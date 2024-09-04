import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { BlueboxComponent } from "../shared/bluebox/bluebox.component";
import { Router } from '@angular/router';
import { LoginReponse } from '../model/login.model';
import { LoginService } from '../service/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../shared/footer/footer.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, BlueboxComponent, CommonModule, FormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData: LoginReponse = { email: '', senha: '' };

  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService) { }

  login() {
    this.loginService.login(this.loginData).subscribe({
      next: (usuario) => {
        let msg = "Bem-vindo(a) " + usuario.nome;
        this.showSuccess(msg, "Login efetuado");
        this.loginService.salvarUsuario(usuario);
        if (usuario.permissao === 'Administrador') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/relatorioIndividual'], { queryParams: usuario });
        }
      },
      error: (err) => {
        console.log(JSON.stringify(err));
        this.showError();
      },
    });
  }

  showSuccess(msg: string, titulo: string) {
    this.toastr.success(msg, titulo);
  }

  showError() {
    this.toastr.error("Login ou senha inválidos", "Error!")
  }
}

