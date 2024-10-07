// src/components/CountryList.tsx
import React from "react";

interface Country {
	id: number;
	name: string;
	code: string;
	emoji: string;
}

interface CountryListProps {
	countries: Country[];
}

const CountryList: React.FC<CountryListProps> = ({ countries }) => {
	return (
		<ul>
			{countries.map((country) => (
				<li key={country.id}>
					{country.name} ({country.code}) {country.emoji}
				</li>
			))}
		</ul>
	);
};

export default CountryList;
