import { useEffect, useState } from 'react';
import { fetchRecipe } from '../utils/fetchRecipe';

const Recipes = () => {
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		const getRecipes = async () => {
			const result = await fetchRecipe('cake');
			setRecipes(result);
		};

		getRecipes();
	}, []);

	return (
		<div className="mt-48 w-[85%] flex flex-col items-center">
			{recipes.length > 0 ? (
				recipes.map((recipe, index) => {
					return (
						<div key={index} className="w-[50%] h-auto mb-8 text-justify">
							<h3 className="font-bold">{recipe.title}</h3>
							<p>{recipe.instructions}</p>
						</div>
					);
				})
			) : (
				<h1>loading...</h1>
			)}
		</div>
	);
};

export default Recipes;
