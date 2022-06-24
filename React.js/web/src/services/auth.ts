export interface User {
  id: number,
  name: string;
  email: string;
}

export interface ResponseSignInData {
  token: string,
  user: User,
}

export interface ResponseSignUpData {
  token: string,
  user: User,
}

export function AuthSignIn():  Promise<ResponseSignInData> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: '77fb20c1-27f1-4107-a508-075b8adfb665',
        user: {
          id: 20,
          name: 'MyName',
          email: 'suporte@suporte.com.br',
        },
      });
    }, 2000);
  });
}

export function AuthSignUp():  Promise<ResponseSignUpData> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: '77fb20c1-27f1-4107-a508-075b8adfb665',
        user: {
          id: 20,
          name: 'MyName',
          email: 'suporte@suporte.com.br',
        },
      });
    }, 2000);
  });
}
