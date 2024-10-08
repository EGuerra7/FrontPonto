import { Time } from "@angular/common";


export class Ponto {
  id?: number;
  horaInicial?: Time | string;
  horaFinal?: Time | string;
  data?: string;
  usuarioRfid?: string;
  usuarioId?: number;
  usuario?: string | null;
  horasFeitas?: number;
  horasFormatadas?: string;
  descricao?: string;
  ativo?: boolean;
}
