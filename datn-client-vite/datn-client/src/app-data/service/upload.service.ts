/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/shared/configs/customFetchBase";

export const uploadApi = createApi({
	reducerPath: "uploadApi",
	baseQuery: customFetchBase,
	endpoints: (build) => ({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		uploadFile: build.mutation<{ success: boolean; data: any }, any>({
			query: (body) => {
				return {
					url: "/files",
					method: "POST",
					body: body,
					credentials: "include",
					// headers: {
					//   'content-type': 'multipart/form-data'
					// }
				};
			},
		}),
	}),
});
