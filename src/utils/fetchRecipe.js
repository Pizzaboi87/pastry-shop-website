export const fetchRecipe = async (query) => {
	const url = `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${query}`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': import.meta.env.VITE_RECIPE_KEY,
			'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com',
		},
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};
