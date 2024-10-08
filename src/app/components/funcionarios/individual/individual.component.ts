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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-individual',
  standalone: true,
  imports: [HeaderComponent, MatIconModule, RouterModule, CommonModule, FooterComponent, FormsModule],
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.css'
})
export class IndividualComponent implements OnInit {
  userData?: Usuario;
  userLogin: any;
  listaDePontos: Ponto[] = [];
  mesesDisponiveis: string[] = [];
  pontosFiltrados: Ponto[] = [];
  mesSelecionado: string = "Todos";
  pontosPorMes: { [mesAno: string]: Ponto[] } = {};
  listaMensalDePontos: PontosMensais = {};

  constructor(private route: ActivatedRoute, private loginService: LoginService, private pontoService: PontoService, private usuarioService: UsuarioService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userData = params;
  
      if (this.userData?.id) {
        this.buscarPontos();
        this.buscarPorMes();
        this.userLogin = this.loginService.obterUsuario();
      } else {
        console.error('ID do usuário não encontrado nos parâmetros.');
      }
    });
  }

  buscarPontos() {
    this.pontoService.buscarPontosIndividuais(this.userData?.id!).subscribe((response: Ponto[]) => {
      console.log('Dados recebidos:', response);
      this.listaDePontos = response.map(ponto => ({
        ...ponto,
        horasFormatadas: this.formatarHoras(ponto.horasFeitas!)
      }));

      this.pontosPorMes = this.agruparPontosPorMes(this.listaDePontos);
      this.mesesDisponiveis = ["Todos", ...Object.keys(this.pontosPorMes)];

      // Exibindo todos os pontos inicialmente
      this.onMesChange();

    }, (error) => {
      console.log('Error ao buscar os pontos', error);
    });
  }

  agruparPontosPorMes(pontos: Ponto[]): { [mesAno: string]: Ponto[] } {
    return pontos.reduce((acc, ponto) => {
      const mesAno = this.formatarMesAno(ponto.data!);
      if (!acc[mesAno]) {
        acc[mesAno] = [];
      }
      acc[mesAno].push(ponto);
      return acc;
    }, {} as { [mesAno: string]: Ponto[] });
  }

  onMesChange() {
    if (this.mesSelecionado === 'Todos') {
      this.pontosFiltrados = this.listaDePontos;
    } else {
      this.pontosFiltrados = this.pontosPorMes[this.mesSelecionado] || [];
    }
  }

  buscarPorMes() {
    this.pontoService.buscarMensal(this.userData?.id!).subscribe((response: PontosMensais) => {
      this.listaMensalDePontos = {}; 
  
      for (const mes in response) {
        if (response.hasOwnProperty(mes)) {
          const totalMinutos = response[mes] as number; 
          this.listaMensalDePontos[mes] = this.formatarHoras(totalMinutos); 
        }
      }
  
      this.cdr.detectChanges();
    }, (error) => {
      console.log('Erro ao buscar os pontos mensais', error);
    });
  }

  formatarMesAno(data: string): string {
   // Separar a string da data manualmente para evitar problemas de timezone
  const [ano, mes] = data.split('-');
  
  // Retorna no formato MM/YYYY
  return `${mes}/${ano}`;
  }


  formatarHoras(minutos: number): string {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${horas}h ${minutosRestantes}m`;
  }
}
