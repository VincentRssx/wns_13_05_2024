// src/pages/index.tsx
import React, { useEffect, useState } from "react";
import CountryList from "../components/CountryList";
import AddCountry from "../components/AddCountry";

interface Country {
	id: number;
	name: string;
	code: string;
	emoji: string;
}

const Home: React.FC = () => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [isMounted, setIsMounted] = useState(false); // Nouveau state pour vérifier si le composant est monté

	const fetchCountries = async () => {
		try {
			const response = await fetch("http://localhost:4000/graphql", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `
                    {
                        countries {
                            id
                            name
                            code
                            emoji
                        }
                    }
                    `,
				}),
			});

			const data = await response.json();
			setCountries(data.data.countries);
		} catch (error) {
			console.error("Error fetching countries:", error);
		}
	};

	useEffect(() => {
		fetchCountries();
		setIsMounted(true); // Marquer le composant comme monté
	}, []);

	const handleAddCountry = async (country: {
		name: string;
		code: string;
		emoji: string;
	}) => {
		const query = `
            mutation {
                addCountry(data: {
                    name: "${country.name}",
                    code: "${country.code}",
                    emoji: "${country.emoji}"
                }) {
                    id
                    name
                    code
                    emoji
                }
            }
        `;

		try {
			const response = await fetch("http://localhost:4000/graphql", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query }),
			});

			const data = await response.json();

			if (data.data && data.data.addCountry) {
				setCountries((prevCountries) => [
					...prevCountries,
					data.data.addCountry,
				]);
			} else {
				console.error("addCountry not found in response:", data);
			}
		} catch (error) {
			console.error("Error adding country:", error);
		}
	};

	// Vérifiez si le composant est monté avant de rendre les composants enfants
	if (!isMounted) {
		return null; // Ou un chargeur si vous le souhaitez
	}

	return (
		<div>
			<h1>Bienvenue dans l'application des Pays</h1>
			<AddCountry onAddCountry={handleAddCountry} />
			<CountryList countries={countries} />
		</div>
	);
};

export default Home;
