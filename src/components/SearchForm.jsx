import { useState } from "react";
import { otherText } from "../constants";
import { Theme_Button } from "../styles";

const SearchForm = ({ setLoading, setNotFound, setSearchQuery, setOffset }) => {
  const allowedCharacters = /^[a-zA-Z- :]+$/;
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setNotFound(false);

    if (allowedCharacters.test(searchText)) {
      setOffset(0);
      setSearchQuery(searchText);
    } else {
      setLoading(false);
      setNotFound(true);
      return;
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
      <Theme_Button
        type="submit"
        $bg="logo"
        $hover="dark"
        $textcolor="textlight"
        className="px-4 py-3 cursor-pointer font-bold rounded-xl shadow-md"
      >
        {otherText.searchForm.button}
      </Theme_Button>
    </form>
  );
};

export default SearchForm;
