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

export const getCookie = (name: string): string => {
  let cookieValue = '';
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}