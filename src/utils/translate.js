export const translate = async (query, from, to) => {
  const url = "https://text-translator2.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": import.meta.env.VITE_TRANSLATE_KEY,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: new URLSearchParams({
      source_language: from,
      target_language: to,
      text: query,
    }),
  };

  try {
    const response = await fetch(url, options);
    console.log("response: ", response);
    const result = await response.text();
    const parsedResult = JSON.parse(result);
    const translatedText = parsedResult.data.translatedText;
    return translatedText;
  } catch (error) {
    console.error(error);
  }
};
