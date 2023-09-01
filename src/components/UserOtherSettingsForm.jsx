import { useState, useContext } from "react";
import { updateUserData } from "../utils/firebase";
import { UserContext } from "../context";
import { useSwalMessage } from "../utils/useSwalMessage";
import {
  Theme_Button,
  Theme_Input,
  Theme_Select,
  userOtherStyle,
  userPageStyle,
} from "../styles";

const UserOtherSettingsForm = () => {
  const {
    userData,
    setUserData,
    currentUser,
    userTheme,
    setUserTheme,
    userCurrency,
    setUserCurrency,
    userLanguage,
    setUserLanguage,
    text,
    userNewsLetter,
    setUserNewsLetter,
  } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();
  const [isLoading, setIsLoading] = useState(false);

  const defaultForm = {
    selectedLang: userLanguage,
    selectedCurr: userCurrency,
    selectedTheme: userTheme,
    newsletter: userNewsLetter,
  };

  const [form, setForm] = useState(defaultForm);
  const { selectedLang, selectedCurr, selectedTheme, newsletter } = form;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      setUserTheme(selectedTheme);
      setUserLanguage(selectedLang);
      setUserCurrency(selectedCurr);
      setUserNewsLetter(newsletter);
      updateUserData(currentUser.uid, form)
        .then(() => {
          showSuccessSwal(text.userAccountForm.swal.successMessage);
        })
        .then(() => {
          setIsLoading(false);
          setUserData({ ...userData, ...form });
        });
    } catch (error) {
      setIsLoading(false);
      console.error("Error during the update of user's data: ", error);
      showErrorSwal(text.userAccountForm.swal.errorNotUpdated);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={userOtherStyle.form}>
      <label className={`${userPageStyle.label} ${userOtherStyle.labelOne}`}>
        {text.userOtherSettings.language.title}
        <Theme_Select
          value={selectedLang}
          name="selectedLang"
          onChange={handleChange}
          $outlinecolor="logo"
          className={userPageStyle.input}
        >
          {["eng", "fra", "esp", "hun"].map((lang, index) => (
            <option key={index} value={lang}>
              {text.userOtherSettings.language[`option${index + 1}`]}
            </option>
          ))}
        </Theme_Select>
      </label>

      <label className={`${userPageStyle.label} ${userOtherStyle.labelTwo}`}>
        {text.userOtherSettings.currency.title}
        <Theme_Select
          value={selectedCurr}
          name="selectedCurr"
          onChange={handleChange}
          $outlinecolor="logo"
          className={userPageStyle.input}
        >
          {["eur", "usd", "gbp", "huf"].map((curr, index) => (
            <option key={index} value={curr}>
              {text.userOtherSettings.currency[`option${index + 1}`]}
            </option>
          ))}
        </Theme_Select>
      </label>

      <label className={`${userPageStyle.label} ${userOtherStyle.labelThree}`}>
        {text.userOtherSettings.theme.title}
        <Theme_Select
          value={selectedTheme}
          name="selectedTheme"
          onChange={handleChange}
          $outlinecolor="logo"
          className={userPageStyle.input}
        >
          {["pink", "blue", "green", "brown"].map((theme, index) => (
            <option key={index} value={theme}>
              {text.userOtherSettings.theme[`option${index + 1}`]}
            </option>
          ))}
        </Theme_Select>
      </label>

      <span className={userOtherStyle.span}>
        <Theme_Input
          checked={newsletter}
          name="newsletter"
          onChange={handleChange}
          $outlinecolor="logo"
          type="checkbox"
          className={userPageStyle.checkbox}
        />
        <p>{text.userOtherSettings.newsletter}</p>
      </span>

      <Theme_Button
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        type="submit"
        disabled={isLoading ? true : false}
        className={`${userPageStyle.passwordButton} ${
          isLoading ? userPageStyle.loading : userPageStyle.notLoading
        } `}
      >
        {isLoading
          ? text.userOtherSettings.loading
          : text.userOtherSettings.button}
      </Theme_Button>
    </form>
  );
};

export default UserOtherSettingsForm;
