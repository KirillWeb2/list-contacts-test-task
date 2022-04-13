
export interface IContact {
  id: number
  firstName: string
  lastName: string
  country: string
  city: string
  date: string
}

export interface IAddContact {
  id: number
  firstName: string
  lastName: string
  country: string
  city: string
  date: string
}

export interface IDeleteContacts {
  id: number
}

export interface IChangeContacts {
  id: number
  firstName: string
  lastName: string
  country: string
  city: string
  date: string
}

