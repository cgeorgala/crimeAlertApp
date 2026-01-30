import { createApi } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout, updateUserData } from './auth';
import { baseQueryWithAuth } from './utils';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  endpoints: builder => ({
    // USER
    createUser: builder.mutation({
      query: data => ({
        url: '/users/addUser',
        method: 'POST',
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: data => ({
        url: '/users/loginUser',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setCredentials(data));
      },
    }),
    logoutUser: builder.query({
      query: () => '/users/logoutUser',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(logout());
      },
    }),
    modifyUserInfo: builder.mutation({
      query: data => ({
        url: '/users/modifyUserInfo',
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(updateUserData(data?.success));
      },
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: '/users/deleteUser',
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(logout());
      },
    }),

    // INCIDENTS
    getMyIncidents: builder.query({
      query: () => '/incidents/myIncidents',
    }),
    createIncident: builder.mutation({
      query: data => ({
        url: '/incidents/addIncident',
        method: 'POST',
        body: data,
      }),
    }),
    getMyIncidentsMap: builder.query({
      query: params => {
        const queryString = new URLSearchParams(params).toString();
        return `/incidents/map?${queryString}`;
      },
    }),
    getAllIncidents: builder.query({
      query: params => {
        const queryString = new URLSearchParams(params).toString();
        return `/incidents/showAll?${queryString}`;
      },
    }),

    // INFO
    getTermsOfUse: builder.query({
      query: () => '/info/termsOfUse',
    }),
    getOrganization: builder.query({
      query: () => '/info/organization',
    }),
    getPrivacyPolicy: builder.query({
      query: () => '/info/privacyPolicy',
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useCreateIncidentMutation,
  useGetMyIncidentsQuery,
  useLazyLogoutUserQuery,
  useModifyUserInfoMutation,
  useGetTermsOfUseQuery,
  useGetOrganizationQuery,
  useGetPrivacyPolicyQuery,
  useDeleteUserMutation,
  useLazyGetMyIncidentsMapQuery,
  useLazyGetAllIncidentsQuery,
} = api;
