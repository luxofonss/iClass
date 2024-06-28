/* eslint-disable @typescript-eslint/no-explicit-any */
import customFetchBase from "@/shared/configs/customFetchBase";
import { LoginSchema, RegisterSchema } from "@/shared/schema/auth.schema";
import { createApi } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: customFetchBase,
	endpoints: (build) => ({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		login: build.mutation<{ success: boolean; data: LoginSchema }, any>({
			query: (body) => {
				return {
					url: "/users/auth/login",
					method: "POST",
					body: body,
					headers: {
						"content-type": "application/json",
					},
					async responseHandler(response) {
						const jsonResponse = await response.json();
						console.log("jsonResponse:: ", jsonResponse);
						cookies.set(
							"access_token",
							jsonResponse?.data?.accessToken,
							{
								path: "/",
							}
						);
						cookies.set(
							"refresh_token",
							jsonResponse?.data?.refreshToken,
							{
								path: "/",
							}
						);
						return jsonResponse;
					},
				};
			},
		}),
		register: build.mutation<
			{ success: boolean; data: RegisterSchema },
			any
		>({
			query: (body) => {
				return {
					url: "/users/auth/register",
					method: "POST",
					body: body,
					headers: {
						"content-type": "application/json",
					},
				};
			},
		}),
		getProfile: build.query<any, any>({
			query: () => {
				return {
					url: "/users/auth/who-am-i",
					method: "GET",
					headers: {
						"content-type": "application/json",
					},
				};
			},
		}),
	}),
});

export const { useLoginMutation } = authApi;
