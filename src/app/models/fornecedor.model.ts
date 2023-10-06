import { Hardware } from "./hardware.model";

export class Fornecedor {
    id       !: number;
    nome     !: string;
    enderecos: Endereco[] = []
    hardwares: Hardware[] = []
}

export class Endereco {
    id         !: number;
    logradouro !: string;
    numero     !: string;
    complemento!: string;
    bairro     !: string;
    cep        !: string;
}