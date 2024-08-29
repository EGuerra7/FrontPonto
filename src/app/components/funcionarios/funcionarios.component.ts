import { Usuario } from './../model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { response } from 'express';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [HeaderComponent, RouterModule, FormsModule, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.css'
})
export class FuncionariosComponent implements OnInit {

  listaDeUsuario: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.buscarUsuarios()
  }

  buscarUsuarios() {
    this.usuarioService.buscarUsuarios().subscribe((response: Usuario[]) => {
      this.listaDeUsuario = response;
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
