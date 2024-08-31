import { CommonModule } from '@angular/common';
import { LoginService } from './../service/login.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  usuario: any;

  constructor(private loginService: LoginService){}

  ngOnInit(){
      this.usuario = this.loginService.obterUsuario();
  }


}
