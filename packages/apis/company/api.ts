import { request } from "utils";

export const companyInfoRequest = () =>
  request.get("company/get", {}) as Promise<{
    bank_name: string;
    bank_address: string;
    card_no: string;
    country: string;
    name: string;
    swift: string;
  }>;

export const minInAmountRequest = () => request.get("assets/get", {});
