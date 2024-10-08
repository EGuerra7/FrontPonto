import { CommonModule } from '@angular/common';
import { LoginService } from './../service/login.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";
import { ToastrService } from 'ngx-toastr';
import { BlueboxComponent } from "../shared/bluebox/bluebox.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent, BlueboxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  usuario: any;

  constructor(private loginService: LoginService, private toastr: ToastrService){}

  ngOnInit(){
    const usuarioCompleto = this.loginService.obterUsuario();
    if (usuarioCompleto && usuarioCompleto.nome) {
      const nomePartes = usuarioCompleto.nome.split(' ');
      this.usuario = {
        ...usuarioCompleto,
        nomeFormatado: `${nomePartes[0]} ${nomePartes[nomePartes.length - 1]}`
      };
    } else {
      this.usuario = usuarioCompleto; // ou defina um valor padrão
    };
  }

  logout(){
    this.loginService.logout();
    let msg = this.usuario.nomeFormatado + " desconectado!"
    this.showInfo(msg, "Desconectado");
  }

  showInfo( msg: string, titulo: string) {
    this.toastr.info(msg, titulo);
  }


}
