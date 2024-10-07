import React, { useState } from "react";

interface CountryFormProps {
	onAddCountry: (country: {
		name: string;
		code: string;
		emoji: string;
	}) => void;
}

const AddCountry: React.FC<CountryFormProps> = ({ onAddCountry }) => {
	const [name, setName] = useState("");
	const [code, setCode] = useState("");
	const [emoji, setEmoji] = useState("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Appel de la fonction onAddCountry avec les valeurs du formulaire
		onAddCountry({ name, code, emoji });
		// Réinitialiser le formulaire
		setName("");
		setCode("");
		setEmoji("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Nom du pays"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<input
				type="text"
				placeholder="Code du pays"
				value={code}
				onChange={(e) => setCode(e.target.value)}
				required
			/>
			<input
				type="text"
				placeholder="Emoji du pays"
				value={emoji}
				onChange={(e) => setEmoji(e.target.value)}
				required
			/>
			<button type="submit">Ajouter le pays</button>
		</form>
	);
};

export default AddCountry;