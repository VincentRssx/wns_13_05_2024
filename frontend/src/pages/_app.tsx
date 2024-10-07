import React from "react";
import type { AppProps } from "next/app";
import "../styles/style.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default MyApp;
