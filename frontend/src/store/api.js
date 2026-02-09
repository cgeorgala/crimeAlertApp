import { createApi } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout, updateUserData } from './auth';
import { baseQueryWithAuth } from './utils';
import { showToast } from './toaster';


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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try{
            const { data } = await queryFulfilled;
            dispatch(showToast({
              message: 'Ο λογαριασμός δημιουργήθηκε επιτυχώς',
              severity: 'success',
            }));
        }
        catch(err){
            dispatch(showToast({
              message: err?.error?.data?.message ||'Το email ή το username χρησιμοποιείται ήδη',
              severity: 'error',
            }));
        }
      },
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
    getIncidentById: builder.query({
      query: (id) => `/incidents/${id}`,
    }),
    createIncident: builder.mutation({
      query: data => ({
        url: '/incidents/addIncident',
        method: 'POST',
        body: data,
      }),
    }),
    modifyIncident: builder.mutation({
      query: data => ({
        url: '/incidents/modifyIncident',
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // const { data } = await queryFulfilled;
        // dispatch(updateIncidentData(data?.success));
        try{
            const { data } = await queryFulfilled;
            dispatch(showToast({
              message: 'Η επεξεργασία του συμβάντος ολοκληρώθηκε',
              severity: 'success',
            }));
        }
        catch(err){
            dispatch(showToast({
              message: err?.error?.data?.message ||'Σφάλμα επεξεργασίας συμβάντος',
              severity: 'error',
            }));
        }
      },
    }),
    validateIncident: builder.mutation({
      query: ({id, status}) => ({
        url: '/incidents/validateIncident',
        method: 'PUT',
        body: {
          id, 
          verify_status: status,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try{
            const { data } = await queryFulfilled;
            dispatch(showToast({
              message: 'Η κατάσταση επαλήθευσης του συμβάντος ενημερώθκε',
              severity: 'success',
            }));
        }
        catch(err){
            dispatch(showToast({
              message: err?.error?.data?.message ||'Σφάλμα επαλήθευσης συμβάντος',
              severity: 'error',
            }));
        }
      },
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
    submitContactForm: builder.mutation({
      query: data => ({
        url: '/info/contact',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useCreateIncidentMutation,
  useModifyIncidentMutation,
  useValidateIncidentMutation,
  useGetMyIncidentsQuery,
  useGetIncidentByIdQuery,
  useLazyLogoutUserQuery,
  useModifyUserInfoMutation,
  useGetTermsOfUseQuery,
  useGetOrganizationQuery,
  useGetPrivacyPolicyQuery,
  useDeleteUserMutation,
  useLazyGetMyIncidentsMapQuery,
  useLazyGetAllIncidentsQuery,
  useSubmitContactFormMutation,
} = api;
