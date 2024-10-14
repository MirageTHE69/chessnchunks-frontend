import { baseApi } from "./baseApi";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: data,
      }),
    }),
    getMessages: builder.query({
      query: (conversationWith) => ({
        url: `/messages?conversationWith=${conversationWith}`,
        method: "GET",
      }),
    }),
    getConversations: builder.query({
      query: () => ({
        url: `/messages/conversations`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
  useGetConversationsQuery,
} = messageApi;
