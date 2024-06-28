/* eslint-disable @typescript-eslint/no-explicit-any */
import customFetchBase from "@/shared/configs/customFetchBase";
import { createApi } from "@reduxjs/toolkit/query/react";

export const conversationApi = createApi({
	reducerPath: "conversationApi",
	baseQuery: customFetchBase,
	endpoints: (build) => ({
		createConversation: build.mutation<any, any>({
			query: (body) => ({
				url: "/communications/conversations",
				method: "POST",
				body,
			}),
		}),
		getConversationByParentId: build.query<any, { parentId: string }>({
			query: (params) => ({
				url: "/communications/conversations",
				params,
			}),
		}),
		updateConversation: build.mutation<any, any>({
			query: (body) => ({
				url: `/communications/conversations/${body?.id}`,
				method: "PUT",
				body,
			}),
		}),
		deleteConversation: build.mutation<any, any>({
			query: (id) => ({
				url: `/communications/conversations/${id}`,
				method: "DELETE",
			}),
		}),

		createComment: build.mutation<any, any>({
			query: (body) => ({
				url: "/communications/comments",
				method: "POST",
				body,
			}),
		}),
		updateComment: build.mutation<any, any>({
			query: (body) => ({
				url: `/communications/comments/${body?.id}`,
				method: "PUT",
				body,
			}),
		}),
		deleteComment: build.mutation<any, any>({
			query: (id) => ({
				url: `/communications/comments/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});
