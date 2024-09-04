import { Usuario } from './../model/usuario.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { PontoService } from '../service/ponto.service';
import { Ponto } from '../model/ponto.model';
import { CommonModule, DatePipe } from '@angular/common';
import { UsuarioService } from '../service/usuario.service';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { FooterComponent } from "../shared/footer/footer.component";


@Component({
  selector: 'app-pontos',
  standalone: true,
  imports: [HeaderComponent, CommonModule, DatePipe, FooterComponent],
  templateUrl: './pontos.component.html',
  styleUrl: './pontos.component.css'
})
export class PontosComponent implements OnInit {

  listaDePontos: Ponto[] = [];
  usuario: Usuario = new Usuario();

  constructor(private pontoService: PontoService, private usuarioService: UsuarioService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.buscarPontos()
  }




  buscarPontos() {
    this.pontoService.buscarPontos().subscribe((response: Ponto[]) => {
      this.listaDePontos = response;
      this.cdr.detectChanges();

      this.listaDePontos = response.map(ponto => ({
        ...ponto,
        horasFormatadas: this.formatarHoras(ponto.horasFeitas!)
      }));

      // Crie um array de observables para buscar todos os usuários
      const userRequests = this.listaDePontos.map(ponto =>
        this.usuarioService.BuscaUmPorIdentificador(ponto.usuarioIdentificador!).pipe(
          map(usuario => ({
            ...ponto,
            usuario: usuario ? usuario.nome : 'Usuário não encontrado'
          }))
        )
      );

      // Combine todos os observables e atualize a lista de pontos com os nomes dos usuários
      forkJoin(userRequests).subscribe(pontosComUsuarios => {
        this.listaDePontos = pontosComUsuarios;
      }, (error) => {
        console.log('Error ao buscar os usuários', error);
      });
    }, (error) => {
      console.log('Error ao buscar os pontos', error);
    });
  }

  formatarHoras(minutos: number): string {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${horas}h ${minutosRestantes}m`;
  }

}
