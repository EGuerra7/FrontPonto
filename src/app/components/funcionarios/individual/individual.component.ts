import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-individual',
  standalone: true,
  imports: [HeaderComponent, MatIconModule, RouterModule, CommonModule],
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.css'
})
export class IndividualComponent implements OnInit {
  userData?: Usuario;
  userLogin: any;

  constructor(private route: ActivatedRoute, private loginService: LoginService) {}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.userData = params;
      console.log(this.userData); // Aqui você pode acessar os dados
    });

    this.userLogin = this.loginService.obterUsuario();
  }
}
