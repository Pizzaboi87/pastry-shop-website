import { useState } from "react";
import { otherText } from "../constants";

const SearchForm = ({ setLoading, setNotFound, setSearchQuery, setOffset }) => {
	const allowedCharacters = /^[a-zA-Z- :]+$/;
	const [searchText, setSearchText] = useState("");

	const handleChange = (e) => {
		setSearchText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setNotFound(false);

		if (allowedCharacters.test(searchText)) {
			setOffset(0);
			setSearchQuery(searchText);
		} else {
			setLoading(false);
			setNotFound(true);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex md:flex-row flex-col justify-center items-center mb-16 gap-4"
		>
			<input
				type="text"
				placeholder={otherText.searchForm.placeholder}
				onChange={handleChange}
				value={searchText}
				className="px-4 py-2 rounded-xl shadow-md outline-dotted outline-2 outline-offset-2 outline-text"
			/>
			<button
				type="submit"
				className="px-4 py-3 bg-logopink hover:bg-pinkdark cursor-pointer text-white font-bold rounded-xl shadow-md"
			>
				{otherText.searchForm.button}
			</button>
		</form>
	);
};

export default SearchForm;
