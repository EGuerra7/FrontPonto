import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../service/usuario.service';
import { Usuario } from '../../../model/usuario.model';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  readonly dialogRef = inject(MatDialogRef<EditComponent>)

  usuarioForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),
    cargaHoraria: new FormControl(null),
    cargo: new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
    permissao: new FormControl(null)
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) { }

  onNoClick() {
    this.dialogRef.close();
  }

  editar() {
    const formData: Usuario = this.usuarioForm.value;

    this.usuarioService.editarUsuario(formData).subscribe(response => {
      this.usuarioForm.reset();
      this.dialogRef.close();
      this.showSuccess(formData.nome!, "Edição Finalizada!")
    }, error => {
      this.showError(JSON.stringify(error));
    })
  }

  showSuccess( msg: string, titulo: string) {
    this.toastr.success(msg, titulo);
  }

  showError(error: string){
    this.toastr.error(error, "Error!")
  }
}
