export const checkPasswordFormat = (password: string): string | undefined => {

  if (password.length < 7) {
    return "Senha curta demais";
  }

  const re = new RegExp('^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$');

  if (re.test(password)) {
    return;
  }
  return "Formato de senha inválido. Deveria ter pelo menos um número e uma letra";
}

export const checkEmailFormat = (email: string): string | undefined => {

  const re = new RegExp('^[a-z0-9.]+@[a-z0-9]+\.(com)(\.br)?');

  if (re.test(email)) {
    return;
  }
  return "Formato de e-mail inválido";
}

export const checkRole = (role: string): string | undefined => {
  const roleString = role.toLowerCase();
  if (roleString === 'admin' || roleString === 'user') {
    return;
  }
  return 'Role tem que ser \"admin\" ou \"user\"';
}

export const checkPhoneFormat = (phone: string): string | undefined => {
  if (phone.length < 8) {
    return "Número de telefone curto demais";
  }
  if (isNaN(Number(phone))) {
    return "Insira apenas números para o número de telefone";
  }
}

export const checkBirthDate = (date: Date) => {
  const thisYear = (new Date()).getFullYear();
  if (date.getFullYear() === thisYear) {
    return "Favor inserir uma data de nascimento válida.";
  }
}

export const checkName = (name:string) => {
  if(name.length < 3){
    return "Nome curto demais";
  }
}
