import { request } from 'src/utils/request';

interface ITransactionInterface {
  id: number;
  user_id: number;
  from: string;
  to: string;
  amount: string;
  image_url: string;
  name: string;
  country: string;
  address: string;
  email: string;
  recharge_chan: number;
  hash: string;
  type: number;
  reg_number: string;
  license: string;
  status: number;
  create_time: number;
  update_time: number;
  operate_id: number;
  remark: string;
}

export const transactionInfoRequest = () => request.get('assets/list', {}) as Promise<Array<ITransactionInterface>>;
