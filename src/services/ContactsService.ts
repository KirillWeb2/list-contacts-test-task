import { IChangeContacts } from './../models/ContactModels';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IAddContact, IContact, IDeleteContacts } from '../models/ContactModels'


export const contactsAPI = createApi({
  reducerPath: 'contactsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/contacts' }),
  tagTypes: ['Contacts'],
  endpoints: (build) => ({
    getContacts: build.query<IContact[], number>({
      query: (limit: number) => ({
        url: `/`,
      }),
      providesTags: (result) => ['Contacts'],
    }),
    addContact: build.mutation<IContact[], IAddContact>({
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContacts: build.mutation<IContact[], IDeleteContacts>({
      query: (data) => ({
        url: `/${data.id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Contacts'],
    }),
    changeContacts: build.mutation<IContact[], IChangeContacts>({
      query: (data) => ({
        url: `/${data.id}/`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
})
