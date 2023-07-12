import {useState} from 'react';

const SearchForm = ({setLoading, setNotFound, setSearchQuery}) => {

  const allowedCharacters = /^[a-zA-Z- :]+$/;
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
		setSearchText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setNotFound(false);

		if (allowedCharacters.test(searchText)) setSearchQuery(searchText);
		else {
			setLoading(false);
			setNotFound(true);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Search a recipe"
				onChange={handleChange}
				value={searchText}
				className="py-2 px-4 outline-none rounded-[15px] mr-4 mb-16 shadow-md"
			/>
			<input
				type="submit"
				value="Search"
				className="bg-button hover:bg-pinkdark cursor-pointer py-2 px-3 text-white font-bold rounded-[15px] shadow-md mb-24"
			/>
		</form>
	);
};

export default SearchForm;
