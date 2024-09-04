import { map } from 'rxjs';
import { Usuario } from './../model/usuario.model';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../shared/popup/edit/edit.component';
import { FooterComponent } from "../shared/footer/footer.component";
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [HeaderComponent, RouterModule, FormsModule, ReactiveFormsModule, CommonModule, MatIconModule, FooterComponent],
  templateUrl: './funcionarios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './funcionarios.component.css'
})
export class FuncionariosComponent implements OnInit {

  listaDeUsuario: Usuario[] = [];
  searchTerm: string = '';
  filteredUsuarios:Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.buscarUsuarios();
  }

  relatorioIndividual(usuario: Usuario) {
    const userData = {
      id: usuario.id,
      nome: usuario.nome,
      cargo: usuario.cargo,
      cargaHoraria: usuario.cargaHoraria,
      email: usuario.email,
      senha: usuario.senha,
      permissao: usuario.permissao
    };

    this.router.navigate(['/relatorioIndividual'], { queryParams: userData });
  }




  openDialog(usuario: Usuario) {
    const userData = {
      identificador: usuario.identificador,
      id: usuario.id,
      nome: usuario.nome,
      cargo: usuario.cargo,
      cargaHoraria: usuario.cargaHoraria,
      email: usuario.email,
      senha: usuario.senha,
      ativo: usuario.ativo,
      permissao: usuario.permissao
    };

    const dialogRef = this.dialog.open(EditComponent, {
      data: userData,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.atualizarPag();
    })
  }


  atualizarPag() {
    window.location.reload();  // Recarrega a página
  }

  buscarUsuarios() {
    this.usuarioService.buscarUsuarios().subscribe((response: Usuario[]) => {
      this.listaDeUsuario = response;
      this.listaDeUsuario = response.map(usuario => ({
        ...usuario,
        ativoFormatado: this.formatarAtivo({ ativo: usuario.ativo! })
      })

      )

      this.filteredUsuarios = [...this.listaDeUsuario];
      this.cdr.detectChanges();
    }, (error) => {
      console.log('Error ao buscar os usuários', error);
    })
  }

  filterUsuarios() {
    if (this.searchTerm) {
      this.filteredUsuarios = this.listaDeUsuario.filter(usuario =>
        usuario.nome!.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsuarios = [...this.listaDeUsuario];
    }
  }

  formatarAtivo({ ativo }: { ativo: boolean }): "Trabalhando" | "Desativado" | undefined {
    if (ativo === true) {
      return "Trabalhando";
    } else if (ativo === false) {
      return "Desativado";
    }
    return undefined;
  }



  showSuccess(msg: string, titulo: string) {
    this.toastr.success(msg, titulo);
  }

  showError() {
    this.toastr.error("Ocorreu algum erro ao deletar o usuário.", "Error!");
  }




}
