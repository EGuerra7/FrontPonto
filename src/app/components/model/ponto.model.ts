import { Time } from "@angular/common";


export class Ponto{
  id?: number;
  horaInicial?: Time;
  horaFinal?: Time;
  data?: string;
  usuarioId?: string;
  usuario?: string;
  horasFeitas?: number;
  horasFormatadas?: string;
  descricao?: string;
}
