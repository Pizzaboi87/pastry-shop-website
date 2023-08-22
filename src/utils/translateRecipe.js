export const translateRecipe = async (recipe, target) => {
  const url = "https://google-translate105.p.rapidapi.com/v1/rapid/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": import.meta.env.VITE_RECIPE_TRANSLATE_KEY,
      "X-RapidAPI-Host": "google-translate105.p.rapidapi.com",
    },
    body: new URLSearchParams({
      text: recipe,
      to_lang: target,
      from_lang: "en",
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const parsedResult = await JSON.parse(result);
    const translatedText = parsedResult.translated_text;
    return translatedText;
  } catch (error) {
    console.error(error);
  }
};
