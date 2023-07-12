import { motion } from 'framer-motion';
import { slideIn } from '../utils/motion';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const RecipeCard = ({ recipe }) => {
	const motionPropsR = slideIn('right');
	const [liked, setLiked] = useState(false);

	return (
		<motion.div
			initial={motionPropsR.initial}
			whileInView={motionPropsR.whileInView}
			viewport={motionPropsR.viewport}
			key={recipe.title}
			className="w-[50%] h-auto mb-20 text-justify bg-white p-12 rounded-[15px] shadow-xl"
		>
			<Icon
				icon={liked ? 'mdi:heart' : 'mdi:heart-outline'}
				className="text-[3rem] absolute right-8 top-10 cursor-pointer text-button"
				onClick={() => setLiked(!liked)}
			/>
			<h1 className="font-bold mb-4 text-[1.8rem] font-[500]">
				{recipe.title}
			</h1>
			<h2 className="font-bold text-[1.3rem] font-[300]">Ingredients:</h2>
			<ul className="mb-8 text-[1.1rem] font-[300]">
				{recipe.ingredients.split('|').map((ingredient, index) => (
					<li key={`${ingredient}-${index}`}>{ingredient}</li>
				))}
			</ul>
			<p className="text-[1.1rem] font-[400]">{recipe.instructions}</p>
		</motion.div>
	);
};

export default RecipeCard;
