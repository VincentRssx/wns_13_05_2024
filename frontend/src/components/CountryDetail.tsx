import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Continent {
	name: string;
}

interface Country {
	id: number;
	name: string;
	code: string;
	emoji: string;
	continent?: Continent;
}

const CountryDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [country, setCountry] = useState<Country | null>(null);

	useEffect(() => {
		const fetchCountry = async () => {
			try {
				const response = await fetch(`http://localhost:4000/graphql`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						query: `
                            {
                                country(id: ${id}) {
                                    id
                                    name
                                    code
                                    emoji
                                    continent {
                                        name
                                    }
                                }
                            }
                        `,
					}),
				});

				const data = await response.json();
				setCountry(data.data.country);
			} catch (error) {
				console.error("Error fetching country details:", error);
			}
		};

		fetchCountry();
	}, [id]);

	if (!country) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Détails de {country.name}</h1>
			<p>
				<strong>Code :</strong> {country.code}
			</p>
			<p>
				<strong>Emoji :</strong> {country.emoji}
			</p>
			{country.continent && (
				<p>
					<strong>Continent :</strong> {country.continent.name}
				</p>
			)}
		</div>
	);
};

export default CountryDetails;
