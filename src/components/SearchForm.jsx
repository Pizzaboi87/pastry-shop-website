import { useState, useContext } from "react";
import { UserContext } from "../context";
import { Theme_Button } from "../styles";

const SearchForm = ({ setLoading, setNotFound, setSearchQuery, setOffset }) => {
  const { text } = useContext(UserContext);
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
        placeholder={text.searchForm.placeholder}
        onChange={handleChange}
        value={searchText}
        className="px-4 py-2 rounded-xl shadow-md outline-dotted outline-2 outline-offset-2 outline-text"
      />
      <Theme_Button
        type="submit"
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        className="px-4 py-3 cursor-pointer font-bold rounded-xl shadow-md"
      >
        {text.searchForm.button}
      </Theme_Button>
    </form>
  );
};

export default SearchForm;
