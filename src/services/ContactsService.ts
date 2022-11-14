import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import {
  IAddContact,
  IContact,
  IDeleteContacts,
  IUpdateContacts,
} from "../models/ContactModels";

export const contactsAPI = createApi({
  reducerPath: "contactsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/contacts" }),
  tagTypes: ["Contacts"],
  endpoints: (build) => ({
    getContacts: build.query<IContact[], void>({
      query: () => ({
        url: `/`,
      }),
      providesTags: () => ["Contacts"],
    }),
    searchContacts: build.query<IContact[], string>({
      query: (value) => ({
        url: ``,
        params: {
          q: value,
        },
      }),
    }),
    addContact: build.mutation<IContact[], IAddContact>({
      query: (data) => ({
        url: `/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteContacts: build.mutation<IContact[], IDeleteContacts>({
      query: (data) => ({
        url: `/${data.id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
    changeContacts: build.mutation<IContact[], IUpdateContacts>({
      query: (data) => ({
        url: `/${data.id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useAddContactMutation,
  useChangeContactsMutation,
  useDeleteContactsMutation,
  useGetContactsQuery,
  useLazySearchContactsQuery,
} = contactsAPI;
