import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';
import { UsuarioService } from '../../service/usuario.service';
import { PontoService } from '../../service/ponto.service';
import { Ponto } from '../../model/ponto.model';
import { PontosMensais } from '../../model/pontosMensais.model';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-individual',
  standalone: true,
  imports: [HeaderComponent, MatIconModule, RouterModule, CommonModule, FooterComponent],
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.css'
})
export class IndividualComponent implements OnInit {
  userData?: Usuario;
  userLogin: any;
  listaDePontos: Ponto[] = [];
  listaMensalDePontos: PontosMensais = {};

  constructor(private route: ActivatedRoute, private loginService: LoginService, private pontoService: PontoService, private usuarioService: UsuarioService ,private cdr: ChangeDetectorRef) {}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.userData = params;
    });
    this.buscarPontos();
    this.buscarPorMes();
    this.userLogin = this.loginService.obterUsuario();
  }

  buscarPontos() {
    this.pontoService.buscarPontosIndividuais(this.userData?.id!).subscribe((response: Ponto[]) => {
      this.listaDePontos = response;
      this.cdr.detectChanges();

      this.listaDePontos = response.map(ponto => ({
        ...ponto,
        horasFormatadas: this.formatarHoras(ponto.horasFeitas!)}));
    }, (error) => {
      console.log('Error ao buscar os pontos', error);
    });
  }

  buscarPorMes(){
    this.pontoService.buscarMensal(this.userData?.id!).subscribe((response: PontosMensais) => {
      this.listaMensalDePontos = {}; // Inicializamos o objeto

      // Iteramos sobre as chaves do objeto response
      for (const mes in response) {
        if (response.hasOwnProperty(mes)) {
          const totalMinutos = response[mes] as number; // Já garantimos que totalMinutos é um número
          this.listaMensalDePontos[mes] = this.formatarHoras(totalMinutos); // Armazenamos a string formatada
        }
      }

      this.cdr.detectChanges();
    }, (error) => {
      console.log('Erro ao buscar os pontos mensais', error);
    });
  }


  formatarHoras(minutos: number): string {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${horas}h ${minutosRestantes}m`;
  }
}
