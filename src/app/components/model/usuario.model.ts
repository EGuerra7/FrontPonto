import { Time } from "@angular/common";

export class Usuario{
  id?: string;
  nome?: string;
  cargaHoraria?: Time;
  cargo?: string;
  email?: string;
  senha?: string;
  permissao?: string;
}
