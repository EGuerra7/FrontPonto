import { Usuario } from './../model/usuario.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { PontoService } from '../service/ponto.service';
import { Ponto } from '../model/ponto.model';
import { CommonModule, DatePipe } from '@angular/common';
import { UsuarioService } from '../service/usuario.service';
import { forkJoin, map } from 'rxjs';
import { FooterComponent } from "../shared/footer/footer.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-pontos',
  standalone: true,
  imports: [HeaderComponent, CommonModule, DatePipe, FooterComponent, FormsModule, ReactiveFormsModule, MatSlideToggleModule],
  templateUrl: './pontos.component.html',
  styleUrl: './pontos.component.css'
})
export class PontosComponent implements OnInit {

  listaDePontos: Ponto[] = [];
  searchTerm: string = '';
  filteredPontos: Ponto[] = [];
  usuario: Usuario = new Usuario();

  constructor(private pontoService: PontoService, private usuarioService: UsuarioService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.buscarPontos();

  }




  buscarPontos() {
    this.pontoService.buscarPontos().subscribe((response: Ponto[]) => {
      this.listaDePontos = response;


      this.listaDePontos = response.map(ponto => ({
        ...ponto,
        horasFormatadas: this.formatarHoras(ponto.horasFeitas!)
      }));

      // Crie um array de observables para buscar todos os usuários
      const userRequests = this.listaDePontos.map(ponto =>
        this.usuarioService.BuscaUmPorId(ponto.usuarioId!).pipe(
          map(usuario => ({
            ...ponto,
            usuario: usuario ? usuario.nome : 'Usuário não encontrado'
          }))
        )
      );

      // Combine todos os observables e atualize a lista de pontos com os nomes dos usuários
      forkJoin(userRequests).subscribe(pontosComUsuarios => {
        this.listaDePontos = pontosComUsuarios;

        // Atualize a lista filtrada com todos os pontos ao iniciar
        this.filteredPontos = [...this.listaDePontos];
      }, (error) => {
        console.log('Error ao buscar os usuários', error);
      });
    }, (error) => {
      console.log('Error ao buscar os pontos', error);
    });
  }
  filterUsuarios() {
    if (this.searchTerm) {
      this.filteredPontos = this.listaDePontos.filter(ponto =>
        ponto.usuario!.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPontos = [...this.listaDePontos];
    }
  }

  onToggleChange(ponto: Ponto, event: any) {
    ponto.ativo = event.checked;

    this.pontoService.ativo(ponto).subscribe(response => {
      console.log('Status atualizado com sucesso', response);
    }, error => {
      console.error('Erro ao atualizar o status', error);
    });
  };


  formatarHoras(minutos: number): string {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${horas}h ${minutosRestantes}m`;
  }


}
