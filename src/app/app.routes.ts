import { Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { AdmAuthService } from './components/service/security/adm-auth.service';
import { AuthLoginService } from './components/service/security/auth-login.service';
import { IndividualComponent } from './components/funcionarios/individual/individual.component';
import { PontosComponent } from './components/pontos/pontos.component';
import { RetroativoComponent } from './components/retroativo/retroativo.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [AdmAuthService]
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
    canActivate: [AdmAuthService],
    pathMatch: 'full'
  },
  {
    path: 'pontos',
    component: PontosComponent,
    canActivate: [AdmAuthService]
  },
  {
    path: "relatorioIndividual",
    component: IndividualComponent,
    canActivate: [AuthLoginService]
  },
  {
    path: "retroativo",
    component: RetroativoComponent,
    canActivate: [AdmAuthService]
  }
];
