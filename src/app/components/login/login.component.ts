import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { BlueboxComponent } from "../shared/bluebox/bluebox.component";
import { Router } from '@angular/router';
import { LoginReponse } from '../model/login.model';
import { LoginService } from '../service/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, BlueboxComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData: LoginReponse = { email: '', senha: '' };

  constructor(private loginService: LoginService, private router: Router) { }

  login() {
    console.log('Botão de login clicado');
    this.loginService.login(this.loginData).subscribe({
      next: (usuario) => {
        this.loginService.salvarUsuario(usuario);
        if (usuario.permissao === 'Administrador') {
          this.router.navigate(['/home']);
        } else {
          alert("Calma lá amigão!");
        }
      },
      error: (err) => {
        console.error('Erro no login', err);
        alert('Login ou senha inválidos');
      },
    });
  }
}

