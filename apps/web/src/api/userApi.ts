export enum QueryKey {
  SendCode = 'sendCode',
  Login1 = 'login1',
  GetUserInfo = 'getUserInfo',
}

interface Api {
  url: string;
  method: 'post' | 'get';
  queryKey: QueryKey;
}

const userApi: Array<Api> = [
  { url: 'user/email/send', method: 'post', queryKey: QueryKey.SendCode },
  { url: 'user/login1', method: 'post', queryKey: QueryKey.Login1 },
  { url: 'user/get', method: 'get', queryKey: QueryKey.GetUserInfo },
];

export default userApi;
