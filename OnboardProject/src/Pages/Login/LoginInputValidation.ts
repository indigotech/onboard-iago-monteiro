export const checkPasswordFormat = (password:string) : string | undefined=> {

    if (password.length < 7) {
      return  "Senha curta demais";
    }

    const re = new RegExp('^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$');

    if (re.test(password)) {
      return undefined;
    }
    return "Formato de senha inválido. Deveria ter pelo menos um número e uma letra";
    }

export const checkEmailFormat = (email: string): string | undefined=> {

    const re = new RegExp('^[a-z0-9.]+@[a-z0-9]+\.(com)');

    if (re.test(email)) {
      return undefined;
    }
    return "Formato de e-mail inválido";
}