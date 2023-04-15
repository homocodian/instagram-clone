import type { AppProps } from "next/app";

import { RecoilRoot } from "recoil";

import { AuthProvider } from "@utils/AuthProvider";

import "@styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</RecoilRoot>
	);
}

export default MyApp;
