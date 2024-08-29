import { Time } from "@angular/common";


export class Ponto{
  id?: number;
  horaInicial?: Time;
  horaFinal?: Time;
  data?: Date;
  usuarioId?: string;
  horasFeitas?: number;
  descricao?: string;
}
