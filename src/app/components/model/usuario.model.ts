import { Time } from "@angular/common";

export class Usuario{
  identificador?: number;
  id?: string;
  nome?: string;
  cargaHoraria?: Time;
  cargo?: string;
  email?: string;
  senha?: string;
  ativo?: boolean;
  ativoFormatado?: string | null;
  permissao?: string;
}
