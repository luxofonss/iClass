/* eslint-disable @typescript-eslint/no-explicit-any */
import customFetchBase from "@/shared/configs/customFetchBase";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: customFetchBase,
	endpoints: (build) => ({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getAllUsers: build.query({
			query: () => {
				return {
					url: "/users/all",
				};
			},
		}),
		deactivateUser: build.mutation({
			query: (userId) => {
				return {
					url: `users/${userId}/deactivate`,
					method: "POST",
				};
			},
		}),
		activateUser: build.mutation({
			query: (userId) => {
				return {
					url: `users/${userId}/activate`,
					method: "POST",
				};
			},
		}),
	}),
});
