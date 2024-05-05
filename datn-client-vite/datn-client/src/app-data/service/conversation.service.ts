/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/shared/configs/customFetchBase";

export const conversationApi = createApi({
	reducerPath: "conversationApi",
	baseQuery: customFetchBase,
	endpoints: (build) => ({
		createConversation: build.mutation<any, any>({
			query: (body) => ({
				url: "/conversations",
				method: "POST",
				body,
			}),
		}),
		updateConversation: build.mutation<any, any>({
			query: (body) => ({
				url: `/conversations/${body?.id}`,
				method: "PUT",
				body,
			}),
		}),
		deleteConversation: build.mutation<any, any>({
			query: (id) => ({
				url: `/conversations/${id}`,
				method: "DELETE",
			}),
		}),

		createComment: build.mutation<any, any>({
			query: (body) => ({
				url: "/comments",
				method: "POST",
				body,
			}),
		}),
		updateComment: build.mutation<any, any>({
			query: (body) => ({
				url: `/comments/${body?.id}`,
				method: "PUT",
				body,
			}),
		}),
		deleteComment: build.mutation<any, any>({
			query: (id) => ({
				url: `/comments/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});
