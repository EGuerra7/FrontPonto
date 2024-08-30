import { Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { AdmAuthService } from './components/service/security/adm-auth.service';
import { AuthLoginService } from './components/service/security/auth-login.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [AuthLoginService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AdmAuthService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'relatorio',
    component: FuncionariosComponent,
    canActivate: [AuthLoginService]
  },
  {
    path: 'pontos',
    component: LoginComponent,
    canActivate: [AuthLoginService]
  }
];
