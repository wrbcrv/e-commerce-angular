import { Endereco } from "./fornecedor.model";
import { Telefone } from "./telefone.model";

export class Usuario {
    id!: number;
    nome!: string;
    login!: string;
    senha!: string;
    cpf!: string;
    telefones: Telefone[] = [];
    enderecos: Endereco[] = [];
}

export { Telefone }
export { Endereco }