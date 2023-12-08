import { Tipo } from "./tipo.model";

export class Cartao {
  id!: number;
  tipo!: Tipo;
  numero!: string;
  cvv!: string;
  validade!: Date;
  titular!: string;
  cpf!: string;
}