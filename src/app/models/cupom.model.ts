import { Hardware } from "./hardware.model";

export class Cupom {
  id!: number;
  descricao!: string;
  codigo!: string;
  inicio!: Date;
  termino!: Date
  desconto!: number;
}

export { Hardware }