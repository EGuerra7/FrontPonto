import { Time } from "@angular/common";

export class Usuario {
  id?: number;
  rfid?: string;
  nome?: string;
  cargaHoraria?: Time;
  cargo?: string;
  email?: string;
  senha?: string;
  ativo?: boolean;
  ativoFormatado?: string | null;
  permissao?: string;
}
