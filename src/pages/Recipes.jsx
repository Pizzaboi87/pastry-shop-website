import { useEffect, useState } from "react";
import { fetchRecipe } from "../utils/fetchRecipe";
import { RecipeCard, SearchForm } from "../components";

const Recipes = () => {
	const [offset, setOffset] = useState(0);
	const [recipes, setRecipes] = useState([]);
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("dessert");

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
		<div className="md:mt-56 mt-36 md:w-[75%] w-full flex flex-col items-center">
			<div className="xl:bg-pinktransparent rounded-xl xl:p-8 flex flex-col items-center">
				<h1 className="text-brown xl:text-[3rem] text-[2rem] text-center font-[400] mb-8">
					Our Favourite Recipes
				</h1>
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
							className="bg-logopink px-8 rounded-xl shadow-xl border-none hover:bg-pinkdark text-white py-3 text-[1.3rem] font-bold"
						>
							show more
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Recipes;
