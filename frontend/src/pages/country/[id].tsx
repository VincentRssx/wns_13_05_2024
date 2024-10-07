// pages/country/[id].tsx
import { useRouter } from "next/router";
import React from "react";

const CountryPage: React.FC = () => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<div>
			<h1>Détails du pays : {id}</h1>
		</div>
	);
};

export default CountryPage;
