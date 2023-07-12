import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { slideIn } from '../utils/motion';
import { fetchRecipe } from '../utils/fetchRecipe';

const Recipes = () => {
	const motionPropsR = slideIn('right');
	const [recipes, setRecipes] = useState([]);
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(true);
	const [searchText, setSearchText] = useState('');
	const [searchQuery, setSearchQuery] = useState('dessert');

	const handleChange = (e) => {
		setSearchText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setNotFound(false);
		const allowedCharacters = /^[a-zA-Z- :]+$/;
		if (allowedCharacters.test(searchText)) setSearchQuery(searchText);
		else {
			setLoading(false);
			setNotFound(true);
		}
	};

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
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search a recipe"
					onChange={handleChange}
					value={searchText}
					className="py-2 px-4 outline-none rounded-[15px] mr-4 mb-16 shadow-md"
				/>
				<input
					type="submit"
					value="Search"
					className="bg-button hover:bg-pinkdark cursor-pointer py-2 px-3 text-white font-bold rounded-[15px] shadow-md mb-24"
				/>
			</form>
			{loading ? (
				<h1>loading...</h1>
			) : notFound ? (
				<h1>not found</h1>
			) : (
				recipes.map((recipe, index) => {
					return (
						<motion.div
							initial={motionPropsR.initial}
							whileInView={motionPropsR.whileInView}
							viewport={motionPropsR.viewport}
							key={index}
							className="w-[50%] h-auto mb-20 text-justify bg-white p-12 rounded-[15px] shadow-xl"
						>
							<h1 className="font-bold mb-4 text-[1.8rem] font-[500]">
								{recipe.title}
							</h1>
							<h2 className="font-bold text-[1.3rem] font-[300]">
								Ingredients:
							</h2>
							<ul className="mb-8 text-[1.1rem] font-[300]">
								{recipe.ingredients.split('|').map((ingredient) => (
									<li key={ingredient}>{ingredient}</li>
								))}
							</ul>
							<p className="text-[1.1rem] font-[400]">{recipe.instructions}</p>
						</motion.div>
					);
				})
			)}
		</div>
	);
};

export default Recipes;
