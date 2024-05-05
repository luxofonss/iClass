/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi } from "@/app-data/service/auth.service";
import { login, logout, setUser } from "@/app-data/slices/authSlice";
import LoadingPage from "@/container/common/LoadingPage";
import { ConfigProvider } from "antd";
import { FC, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import appRoutes from "./routes/appRoutes";
import authRoutes from "./routes/authRoutes";
import commonRoutes from "./routes/commonRoutes";

const App: FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [getProfile] = authApi.endpoints.getProfile.useLazyQuery();

	const dispatch = useDispatch();

	async function getProfileHandler() {
		try {
			const profile = await getProfile(null, false).unwrap();
			dispatch(login());
			dispatch(setUser(profile.data));
		} catch (error: any) {
			dispatch(logout());
			toast.error(
				error?.data?.message || error?.message || "Something went wrong"
			);
		}
		setIsLoading(false);
	}

	useEffect(() => {
		getProfileHandler();
	}, []);

	// const role = null
	// let accessRoutes = null
	// if (role === ROLE.USER) {
	//   accessRoutes = appRoutes
	// } else {
	//   accessRoutes = authRoutes
	// }
	const router = createBrowserRouter([
		...commonRoutes,
		...authRoutes,
		...appRoutes,
	]);

	if (isLoading) return <LoadingPage />;
	else
		return (
			<ConfigProvider
				theme={{
					token: {
						fontFamily: "SF Pro Text",
						fontSize: 14,
						colorPrimary: "#9B16F3",
					},
					components: {
						Divider: {
							marginLG: 12,
							margin: 8,
							marginXS: 4,
						},
						Form: {
							labelColor: "rgb(51, 56, 63)",
							marginLG: 12,
						},
						Button: {
							borderRadius: 12,
						},
						Collapse: {
							headerBg: "#F7ECFE",
							colorBorder: "#f7f7f7",
						},
						Input: {
							borderRadius: 12,
							colorBorder: "rgb(202, 204, 206)",
							colorTextPlaceholder: "rgb(160, 164, 167)",
							colorText: "#4E5255",
							fontSize: 14,
						},
					},
				}}
			>
				<Toaster />
				<RouterProvider router={router} />
			</ConfigProvider>
		);
};

export default App;
