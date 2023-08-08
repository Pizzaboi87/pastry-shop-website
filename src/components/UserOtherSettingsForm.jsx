import Swal from "sweetalert2";
import { useState, useContext } from "react";
import { updateUserData } from "../utils/firebase";
import {
  ThemeContext,
  LanguageContext,
  CurrencyContext,
  UserContext,
} from "../context";
import {
  Theme_Button,
  Theme_Input,
  Theme_Select,
  userPageStyle,
} from "../styles";

const UserOtherSettingsForm = () => {
  const { userTheme, setUserTheme } = useContext(ThemeContext);
  const { userCurrency, setUserCurrency } = useContext(CurrencyContext);
  const { userData, setUserData, currentUser } = useContext(UserContext);
  const { userLanguage, setUserLanguage, text } = useContext(LanguageContext);
  const [isLoading, setIsLoading] = useState(false);

  const defaultForm = {
    selectedLang: userLanguage,
    selectedCurr: userCurrency,
    selectedTheme: userTheme,
    newsletter: false,
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
      updateUserData(currentUser.uid, form)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: text.userAccountForm.swal.successMessage,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .then(() => {
          setIsLoading(false);
          setUserData({ ...userData, ...form });
        });
    } catch (error) {
      setIsLoading(false);
      console.error("Error during the update of user's data: ", error);
      errorSwal(text.userAccountForm.swal.errorNotUpdated);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-x-8">
      <label className={`${userPageStyle.label} col-span-2 `}>
        {text.userOtherSettings.language.title}
        <Theme_Select
          value={selectedLang}
          name="selectedLang"
          onChange={handleChange}
          $outlinecolor="logo"
          className={userPageStyle.input}
        >
          <option value="eng">{text.userOtherSettings.language.option1}</option>
          <option value="fra">{text.userOtherSettings.language.option2}</option>
          <option value="esp">{text.userOtherSettings.language.option3}</option>
          <option value="hun">{text.userOtherSettings.language.option4}</option>
        </Theme_Select>
      </label>

      <label className={`${userPageStyle.label} col-span-1 `}>
        {text.userOtherSettings.currency.title}
        <Theme_Select
          value={selectedCurr}
          name="selectedCurr"
          onChange={handleChange}
          $outlinecolor="logo"
          className={userPageStyle.input}
        >
          <option value="eur">{text.userOtherSettings.currency.option1}</option>
          <option value="usd">{text.userOtherSettings.currency.option2}</option>
          <option value="gbp">{text.userOtherSettings.currency.option3}</option>
          <option value="huf">{text.userOtherSettings.currency.option4}</option>
        </Theme_Select>
      </label>

      <label className={`${userPageStyle.label} col-span-3 `}>
        {text.userOtherSettings.theme.title}
        <Theme_Select
          value={selectedTheme}
          name="selectedTheme"
          onChange={handleChange}
          $outlinecolor="logo"
          className={userPageStyle.input}
        >
          <option value="pink">{text.userOtherSettings.theme.option1}</option>
          <option value="blue">{text.userOtherSettings.theme.option2}</option>
          <option value="green">{text.userOtherSettings.theme.option3}</option>
          <option value="brown">{text.userOtherSettings.theme.option4}</option>
        </Theme_Select>
      </label>

      <span className="flex flex-row items-center gap-x-4 mb-2 col-span-4">
        <Theme_Input
          value={newsletter}
          name="newsletter"
          onChange={handleChange}
          $outlinecolor="logo"
          type="checkbox"
          className="w-[1rem] h-[1rem]"
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
          isLoading ? "cursor-progress" : "cursor-pointer"
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
