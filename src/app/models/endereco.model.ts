import { Cidade } from "./cidade.model";

export class Endereco {
  id!: number;
  nome!: string;
  sobrenome!: string;
  cep!: string;
  endereco!: string;
  numero!: string;
  bairro!: string;
  complemento!: string;
  cidade!: Cidade;
  telefone!: string;
}