//xlasse base usuaria
class Usuario {
     constructor(nome, email, senha){
        this.nome = nome;
        this.email = email;
        this._senha = senha; //atributo privado
     }

autenticar(senha){
    return senha == this._senha; 
}

alterarSenha(novaSenha){
    this._senha = novaSenha
    console.log ('senha alterada com sucesso')
}

}
class Admin extends Usuario {
    constructor(nome, email, senha, nivelAcesso){
        super(nome, email, senha);
        this.nivelAcesso = nivelAcesso;
    }
    banirUsuario(usuario){
        console.log(`${usuario.nome} foi banido pelo admin ${this.nome}`);
    }
    //polimofismosobrepondo o metodo ja existente 
    autenticar (senhas){
        return senha === this._senha && this.nivelAcesso === 'alto';yhu
    }
}

//exemplo de uso

const usuario1 = new Usuario('Luiz', 'luiz@gmail.com', '1234');

console.log(usuario1.autenticar(1234));
console.log(usuario1.autenticar(2009));
console.log(usuario1.alterarSenha('luizboas@gmail.com'));
console.log(usuario1.autenticar('luizboas@gmail.com'));
