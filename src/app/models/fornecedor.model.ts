export class Fornecedor {
    id       !: number;
    nome     !: string;
    enderecos: Endereco[] = []
}

export class Endereco {
    id         !: number;
    logradouro !: string;
    numero     !: string;
    complemento!: string;
    bairro     !: string;
    cep        !: string;
}