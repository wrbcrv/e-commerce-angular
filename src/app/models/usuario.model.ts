import { Endereco } from "./fornecedor.model";
import { Telefone } from "./telefone.model";

export class Usuario {
    id!: number;
    email!: string;
    senha!: string;
    nome!: string;
    cpf!: string;
    telefones: Telefone[] = [];
    enderecos: Endereco[] = [];
}

export { Telefone }
export { Endereco }