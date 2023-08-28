import { UserContext } from "../context";
import { useState, useContext } from "react";
import { Theme_Button, searchFormStyle } from "../styles";

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
    <form onSubmit={handleSubmit} className={searchFormStyle.form}>
      <input
        type="text"
        placeholder={text.searchForm.placeholder}
        onChange={handleChange}
        value={searchText}
        className={searchFormStyle.input}
      />
      <Theme_Button
        type="submit"
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        className={searchFormStyle.button}
      >
        {text.searchForm.button}
      </Theme_Button>
    </form>
  );
};

export default SearchForm;
