import Cookies from 'js-cookie';

const TokenKey: string = 'admin_template_token'

export function getToken(): string | any | undefined {
  return Cookies.get(TokenKey)
}

export function setToken(value: any): string | undefined {
  return Cookies.set(TokenKey, value)
}

export function removeToken(): void {
  return Cookies.remove(TokenKey)
}