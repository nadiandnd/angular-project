export interface IAccessTokenResp {
  portalUser: IPortalUserAccount;
  access_token: string;
  tokentype: string;
  expires_in: number;
}

export interface IPortalUserAccount {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  credentialsExpired: boolean;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  attribute: string[];
}
