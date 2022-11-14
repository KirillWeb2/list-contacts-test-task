export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  date: string;
}

export interface IAddContact {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  date: string;
}

export interface IModalFormContact {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
}

export interface IDeleteContacts {
  id: number;
}

export interface IQueryParams {
  firstName: string;
  lastName: string;
}

export interface IUpdateContacts {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  date: string;
}
