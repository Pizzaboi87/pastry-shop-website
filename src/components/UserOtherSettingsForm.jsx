import { useState, useContext } from "react";
import {
  Theme_Button,
  Theme_Input,
  Theme_Select,
  userPageStyle,
} from "../styles";
import { ThemeContext } from "../context";

const UserOtherSettingsForm = () => {
  const { setTheme } = useContext(ThemeContext);

  const defaultForm = {
    language: "en",
    currency: "eur",
    colorTheme: "pink",
    newsletter: false,
  };

  const [form, setForm] = useState(defaultForm);
  const { language, currency, colorTheme, newsletter } = form;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTheme(colorTheme);
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-x-8">
      <label className={`${userPageStyle.label} col-span-2 `}>
        Language
        <Theme_Select
          value={language}
          name="language"
          onChange={handleChange}
          $outlinecolor="logo"
          className={userPageStyle.input}
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="de">Spanish</option>
          <option value="es">Hungarian</option>
        </Theme_Select>
      </label>

      <label className={`${userPageStyle.label} col-span-2 `}>
        Currency
        <Theme_Select
          value={currency}
          name="currency"
          onChange={handleChange}
          $outlinecolor="logo"
          className={userPageStyle.input}
        >
          <option value="usd">EUR</option>
          <option value="eur">USD</option>
          <option value="gbp">GBP</option>
          <option value="cad">HUF</option>
        </Theme_Select>
      </label>

      <label className={`${userPageStyle.label} col-span-2 `}>
        Color Theme
        <Theme_Select
          value={colorTheme}
          name="colorTheme"
          onChange={handleChange}
          $outlinecolor="logo"
          className={userPageStyle.input}
        >
          <option value="pink">Pink Delights Emporium</option>
          <option value="blue">Sky Blue Sweets</option>
          <option value="green">Minty Green Enchantment</option>
          <option value="brown">Chocolate Kingdom</option>
        </Theme_Select>
      </label>

      <span className="flex flex-row items-center gap-x-4 mb-2 col-span-5">
        <Theme_Input
          value={newsletter}
          name="newsletter"
          onChange={handleChange}
          $outlinecolor="logo"
          type="checkbox"
          className="w-[1rem] h-[1rem]"
        />
        <p>Subscribe to our newsletter</p>
      </span>

      <Theme_Button
        $bgcolor="logo"
        $hoverbgcolor="dark"
        $textcolor="textlight"
        className={userPageStyle.passwordButton}
      >
        Update
      </Theme_Button>
    </form>
  );
};

export default UserOtherSettingsForm;
