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



@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [HeaderComponent, RouterModule, FormsModule, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './funcionarios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './funcionarios.component.css'
})
export class FuncionariosComponent implements OnInit {

  listaDeUsuario: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.ngOnInit();
   }

  ngOnInit() {
    this.buscarUsuarios()
  }

  relatorioIndividual(usuario: Usuario){
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
      id: usuario.id,
      nome: usuario.nome,
      cargo: usuario.cargo,
      cargaHoraria: usuario.cargaHoraria,
      email: usuario.email,
      senha: usuario.senha,
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
      this.cdr.detectChanges();
    }, (error) => {
      console.log('Error ao buscar os usuários', error);
    })
  }

  deletarUsuario(usuario: Usuario) {
    this.usuarioService.DeletarUsuario(usuario).subscribe(response => {
      this.ngOnInit();
      alert("Usuario " + usuario.nome + " deletado com sucesso!");
    }, (error) => {
      alert('Error ao deletar!');
    })
  }


}
