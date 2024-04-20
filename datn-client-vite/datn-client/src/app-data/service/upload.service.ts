import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/shared/configs/customFetchBase";
import { FileUpload } from "@/shared/schema/upload.schema";

export const uploadApi = createApi({
	reducerPath: "uploadApi",
	baseQuery: customFetchBase,
	endpoints: (build) => ({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		uploadFile: build.mutation<
			{ success: boolean; data: FileUpload },
			{ url: string }
		>({
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
