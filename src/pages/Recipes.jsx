import { useEffect, useState } from 'react';
import { fetchRecipe } from '../utils/fetchRecipe';
import { RecipeCard, SearchForm } from '../components';

const Recipes = () => {
	const [offset, setOffset] = useState(0);
	const [recipes, setRecipes] = useState([]);
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('dessert');

	const getRecipes = async () => {
		const result = await fetchRecipe(searchQuery, offset);
		setLoading(false);
		if (result.length > 0) {
			if (recipes.length > 0 && offset > 0) {
				setRecipes((prevRecipes) => [...prevRecipes, ...result]);
			} else setRecipes(result);
		} else setNotFound(true);
	};

	const showMore = () => {
		setOffset(offset + 10);
	};

	useEffect(() => {
		getRecipes();
	}, [searchQuery, offset]);

	return (
		<div className="mt-56 w-[85%] flex flex-col items-center">
			<SearchForm
				setLoading={setLoading}
				setNotFound={setNotFound}
				setSearchQuery={setSearchQuery}
				setOffset={setOffset}
			/>
			{loading ? (
				<h1>loading...</h1>
			) : notFound ? (
				<h1>not found</h1>
			) : (
				<>
					{recipes.map((recipe, index) => (
						<RecipeCard recipe={recipe} key={`${recipe.title}-${index}`} />
					))}
					<button
						onClick={showMore}
						className="px-8 py-3 bg-logopink hover:bg-pinkdark text-[1.3rem] text-white font-bold rounded-[15px] shadow-xl"
					>
						show more
					</button>
				</>
			)}
		</div>
	);
};

export default Recipes;
