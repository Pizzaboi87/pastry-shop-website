import { useEffect, useState } from 'react';
import { fetchRecipe } from '../utils/fetchRecipe';
import { RecipeCard, SearchForm } from '../components';

const Recipes = () => {
	const [recipes, setRecipes] = useState([]);
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('dessert');

	useEffect(() => {
		const getRecipes = async () => {
			const result = await fetchRecipe(searchQuery);
			setLoading(false);
			result.length > 0 ? setRecipes(result) : setNotFound(true);
		};

		getRecipes();
	}, [searchQuery]);

	return (
		<div className="mt-56 w-[85%] flex flex-col items-center">
			<SearchForm
				setLoading={setLoading}
				setNotFound={setNotFound}
				setSearchQuery={setSearchQuery}
			/>
			{loading ? (
				<h1>loading...</h1>
			) : notFound ? (
				<h1>not found</h1>
			) : (
				recipes.map((recipe) => <RecipeCard recipe={recipe} />)
			)}
		</div>
	);
};

export default Recipes;
