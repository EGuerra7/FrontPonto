import { ChangeDetectorRef, Component } from '@angular/core';
import { BlueboxComponent } from "../shared/bluebox/bluebox.component";
import { HeaderComponent } from "../shared/header/header.component";
import { PontoService } from '../service/ponto.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ponto } from '../model/ponto.model';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario.model';



@Component({
  selector: 'app-ponto-principal',
  standalone: true,
  imports: [BlueboxComponent, HeaderComponent,
    ReactiveFormsModule],
  templateUrl: './ponto-principal.component.html',
  styleUrl: './ponto-principal.component.css'
})
export class PontoPrincipalComponent {

  usuario: Usuario = new Usuario();

  pontoForm: FormGroup = new FormGroup({
    usuarioIdentificador: new FormControl(""),
    usuarioId: new FormControl("", Validators.required),
    data: new FormControl(null),
    horaInicial: new FormControl(""),
    horaFinal: new FormControl(null),
    descricao: new FormControl("Padrão")
  })


  constructor(
    private pontoService: PontoService,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }


  buscarUsuarioPorId() {
    const pontoData: Ponto = this.pontoForm.value;

    this.usuarioService.BuscaUmPorId(pontoData.usuarioId!).subscribe(response => {
        this.usuario = response;
        this.cdr.detectChanges();
    }, error => {
      this.showError("ID não cadastrado ou inativo!");
    })
  }

  entrada() {
    if (this.pontoForm.valid) {
      const pontoData: Ponto = this.pontoForm.value;

      const { dataFormatada, horaFormatada } = this.obterDataHoraAtual();


      const pontoEntrada: Ponto = new Ponto();
      pontoEntrada.usuarioIdentificador = this.usuario.identificador;
      pontoEntrada.usuarioId = pontoData.usuarioId;
      pontoEntrada.data = dataFormatada;
      pontoEntrada.horaInicial = horaFormatada;
      pontoEntrada.descricao = pontoData.descricao;
      if (pontoEntrada.data || pontoEntrada.horaInicial || pontoEntrada.descricao) {
        this.pontoService.registrar(pontoEntrada).subscribe(response => {
          this.showSuccess(horaFormatada, "Ponto aberto!")
        }, error => {
          this.showError("Você já tem um ponto em aberto!");
        });
      } else {
        this.showError("");
      }
    } else {
      this.showError("Não há um usuário para enviar!");
    }
  }

  saida() {
    if (this.pontoForm.valid) {
      const pontoData: Ponto = this.pontoForm.value;

      const { dataFormatada, horaFormatada } = this.obterDataHoraAtual();

      let pontoSaida: Ponto = new Ponto();
      pontoSaida.usuarioId = pontoData.usuarioId;
      pontoSaida.data = dataFormatada;
      pontoSaida.horaFinal = horaFormatada;
      if (pontoSaida.data || pontoSaida.horaFinal || pontoSaida.descricao) {
        this.pontoService.registrarSaida(pontoSaida).subscribe(response => {
          this.showSuccess(horaFormatada, "Ponto fechado!")
        }, error => {
          this.showError("Você não tem um ponto em aberto!");
        });
      } else {
        this.showError("");
      }
    }
    else {
      this.showError("Não há um usuário para enviar!");
    }
  }

  obterDataHoraAtual() {
    const agora = new Date();

    // Obtendo a data no formato 'yyyy-MM-dd'
    const ano = agora.getFullYear();
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0'); // Adiciona zero à esquerda se necessário
    const dia = agora.getDate().toString().padStart(2, '0'); // Adiciona zero à esquerda se necessário
    const dataFormatada = `${ano}-${mes}-${dia}`;

    // Obtendo a hora no formato 'HH:mm:ss'
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    const horaFormatada = `${horas}:${minutos}:${segundos}`;

    return { dataFormatada, horaFormatada };
  }


  showSuccess(msg: string, titulo: string) {
    this.toastr.success(msg, titulo);
  }

  showError(error: string) {
    this.toastr.error(error, "Error!")
  }
}
