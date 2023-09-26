export class Usuario {
    id!: number;
    nome!: string;
    login!: string;
    senha!: string;
    cpf!: string;
    telefones: Telefone[] = [];
    enderecos: Endereco[] = [];
}

export class Telefone {
    id!: number;
    ddd!: string;
    numero!: string;
}

export class Endereco {
    id!: number;
    logradouro!: string;
    numero!: string;
    complemento!: string;
    bairro!: string;
    cep!: string;
}