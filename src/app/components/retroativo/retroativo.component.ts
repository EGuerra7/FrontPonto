
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { BlueboxComponent } from "../shared/bluebox/bluebox.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { Ponto } from '../model/ponto.model';
import { PontoService } from '../service/ponto.service';
import { FooterComponent } from "../shared/footer/footer.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-retroativo',
  standalone: true,
  imports: [HeaderComponent, BlueboxComponent, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,
    ReactiveFormsModule, FooterComponent],
  templateUrl: './retroativo.component.html',
  styleUrl: './retroativo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetroativoComponent implements OnInit {
  listaDeUsuarios: Usuario[] = [];
  pontoForm: FormGroup = new FormGroup({
    usuarioIdentificador: new FormControl(null),
    usuarioId: new FormControl(""),
    data: new FormControl(""),
    horaInicial: new FormControl(""),
    horaFinal: new FormControl(""),
    descricao: new FormControl("")
  })



  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
    private pontoService: PontoService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.buscarUsuarios();
  }

  buscarUsuarios() {
    this.usuarioService.buscarUsuarios().subscribe((response: Usuario[]) => {
      this.listaDeUsuarios = response;
      this.cdr.detectChanges();
    }, (error) => {
      console.log('Error ao buscar os usuários', error);
    })
  }


  pontoRetroativo() {
    const pontoData: Ponto = this.pontoForm.value;
    this.usuarioService.BuscaUmPorIdentificador(pontoData.usuarioIdentificador!).subscribe(usuario => {
      pontoData.usuarioId = usuario.id;

      const dataFormatada = this.converterDataParaFormatoBackend(pontoData.data!);

      const dadosParaEnviar = {
        ...pontoData,
        data: dataFormatada
      };

      console.log(dadosParaEnviar);
      this.pontoService.registrar(dadosParaEnviar).subscribe(response => {
        this.showSuccess(pontoData.descricao!, "Ponto registrado!");
        this.pontoForm.reset();
      }, error => {
        this.showError(JSON.stringify(error));
      });

    }, error => {
      this.showError('Erro ao buscar usuário');
      console.error('Erro ao buscar usuário', error);
    });
  }

  converterDataParaFormatoBackend(data: string): string {
    // Supondo que a data está no formato "dd/MM/yyyy"
    const partes = data.split('/');
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];

    // Reformatar para "yyyy-MM-dd"
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }

  showSuccess(msg: string, titulo: string) {
    this.toastr.success(msg, titulo);
  }

  showError(error: string) {
    this.toastr.error(error, "Error!")
  }

}
