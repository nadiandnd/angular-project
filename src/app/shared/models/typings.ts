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

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}

export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ToDoState {
  isLoading: boolean;
  currentMember: User | undefined;
  memberToDos: ToDo[];
  incompleteOnly: boolean;
  error: string | null;
}
