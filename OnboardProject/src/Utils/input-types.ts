import * as validators from './input-validation-functions';

export const email = {label: "e-mail", validator: validators.checkEmailFormat}
export const phone = {label: "telefone", validator: validators.checkPhoneFormat}
export const name = {label: "nome", validator: validators.checkNameFormat}
export const birthDate = {label: "data de nascimento", validator: validators.checkBirthDateFormat}
export const role = {label: "role", validator: validators.checkRoleFormat}
export const password = {label: "senha", validator: validators.checkPasswordFormat}