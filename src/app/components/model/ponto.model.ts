import { Time } from "@angular/common";


export class Ponto{
  id?: number;
  horaInicial?: Time | string;
  horaFinal?: Time | string;
  data?: string;
  usuarioId?: string;
  identificador?: number;
  usuario?: string;
  horasFeitas?: number;
  horasFormatadas?: string;
  descricao?: string;
}
