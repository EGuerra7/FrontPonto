import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { BlueboxComponent } from "../shared/bluebox/bluebox.component";
import { HeaderComponent } from "../shared/header/header.component";
import { PontoService } from '../service/ponto.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ponto } from '../model/ponto.model';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario.model';
import { RfidService } from '../service/rfid.service';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../shared/footer/footer.component";





@Component({
  selector: 'app-ponto-principal',
  standalone: true,
  imports: [BlueboxComponent, HeaderComponent,
    ReactiveFormsModule, CommonModule, FooterComponent],
  templateUrl: './ponto-principal.component.html',
  styleUrl: './ponto-principal.component.css'
})
export class PontoPrincipalComponent implements OnInit {
  usuario: Usuario | null = null;
  ultimoRfid: string | null = null;
  pontoForm: FormGroup;
  private subscription!: Subscription;

  constructor(
    private pontoService: PontoService,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private rfidService: RfidService,
    private ngZone: NgZone
  ) {
    this.pontoForm = new FormGroup({
      usuarioId: new FormControl(null),
      usuarioRfid: new FormControl('', Validators.required),
      data: new FormControl(null),
      horaInicial: new FormControl(''),
      horaFinal: new FormControl(null),
      descricao: new FormControl('Padrão'),
      ativo: new FormControl(true)
    });
  }

  ngOnInit() {
    this.fetchLatestRFID();
  }


  fetchLatestRFID() {
    this.rfidService.getRfid().subscribe({
      next: (response) => {
        if (response !== this.ultimoRfid) {
          this.ultimoRfid = response;
          this.buscarUsuarioPorRfid();

          this.pontoForm.get('usuarioRfid')?.setValue(this.ultimoRfid);

          if (response != "" && typeof window !== 'undefined') {
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          } else {
            console.warn('RFID: ' + this.ultimoRfid);
          }


        }
      },
      error: () => {
        console.log('ID não cadastrado ou inativo!');
      }
    });
  }

  buscarUsuarioPorRfid() {
    this.usuarioService.BuscaUmPorRfid(this.ultimoRfid!).subscribe({
      next: (response) => {
        this.usuario = response ? response : null;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao buscar usuário:', error);
        this.usuario = null;
        this.cdr.detectChanges();
      }
    });
  }

  entrada() {
    if (this.pontoForm.valid) {
      const pontoData: Ponto = this.pontoForm.value;

      const { dataFormatada, horaFormatada } = this.obterDataHoraAtual();


      const pontoEntrada: Ponto = new Ponto();
      pontoEntrada.usuarioId = this.usuario?.id;
      pontoEntrada.usuarioRfid = pontoData.usuarioRfid;
      pontoEntrada.data = dataFormatada;
      pontoEntrada.horaInicial = horaFormatada;
      pontoEntrada.descricao = pontoData.descricao;
      pontoEntrada.ativo = pontoData.ativo;
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
      pontoSaida.usuarioRfid = pontoData.usuarioRfid;
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
