import { Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'funcionarios',
    component: LoginComponent
  },
  {
    path: 'pontos',
    component: LoginComponent
  }
];
