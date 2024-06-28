/* eslint-disable @typescript-eslint/no-explicit-any */
import customFetchBase from "@/shared/configs/customFetchBase";
import { createApi } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
	reducerPath: "uploadApi",
	baseQuery: customFetchBase,
	endpoints: (build) => ({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		uploadFile: build.mutation<{ success: boolean; data: any }, FormData>({
			query: (body) => {
				return {
					url: "/files/upload",
					method: "POST",
					body: body,
				};
			},
		}),
		getResourceById: build.query({
			query: (id) => {
				return {
					url: `/files/${id}`,
					method: "GET",
				};
			},
		}),
	}),
});
