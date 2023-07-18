import { useState } from "react";

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
		<form onSubmit={handleSubmit} className="flex md:flex-row flex-col justify-center items-center mb-16 gap-4">
			<input
				type="text"
				placeholder="Search a recipe"
				onChange={handleChange}
				value={searchText}
				className="px-4 py-2 outline-none rounded-xl shadow-md outline-dotted outline-logopink"
			/>
			<input
				type="submit"
				value="Search"
				className="px-4 py-3 bg-logopink hover:bg-pinkdark cursor-pointer text-white font-bold rounded-xl shadow-md"
			/>
		</form>
	);
};

export default SearchForm;
