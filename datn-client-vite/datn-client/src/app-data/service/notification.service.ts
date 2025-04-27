/* eslint-disable @typescript-eslint/no-explicit-any */
import customFetchBase from "@/shared/configs/customFetchBase";
import { createApi } from "@reduxjs/toolkit/query/react";

export const notificationApi = createApi({
	reducerPath: "notificationApi",
	baseQuery: customFetchBase,
	endpoints: (build) => ({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getAllNotifications: build.query({
			query: (params) => {
				return {
					url: "/notifications/",
					params,
				};
			},
		}),
	}),
});
