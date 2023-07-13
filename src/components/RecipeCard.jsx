import { motion } from 'framer-motion';
import { slideIn } from '../utils/motion';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon,
	EmailShareButton,
	EmailIcon,
} from 'react-share';

const RecipeCard = ({ recipe }) => {
	const motionPropsR = slideIn('right');
	const [liked, setLiked] = useState(false);

	const ingredients = recipe.ingredients.split('|');
	const quoteText = `\u{1F63B} ${recipe.title}\n${ingredients.map(
		(ingredient) => '\n' + ingredient
	)}\n\n${recipe.instructions}\n\n`;

	return (
		<motion.div
			initial={motionPropsR.initial}
			whileInView={motionPropsR.whileInView}
			viewport={motionPropsR.viewport}
			key={recipe.title}
			className="w-[70%] h-auto mb-20 text-justify bg-white p-12 rounded-[15px] shadow-xl"
		>
			<Icon
				icon={liked ? 'mdi:heart' : 'mdi:heart-outline'}
				className="text-[3rem] absolute right-8 top-10 cursor-pointer text-logopink"
				onClick={() => setLiked(!liked)}
			/>
			<h1 className="font-bold mb-4 text-[1.8rem] font-[500] text-text">
				{recipe.title}
			</h1>
			<h2 className="font-bold text-[1.3rem] text-text font-[300]">
				Ingredients:
			</h2>
			<ul className="mb-8 text-[1.1rem] font-[300] text-text">
				{ingredients.map((ingredient, index) => (
					<li key={`${ingredient}-${index}`}>{ingredient}</li>
				))}
			</ul>
			<p className="text-[1.1rem] font-[400] text-text">
				{recipe.instructions}
			</p>
			<div className="mt-8 flex gap-4">
				<FacebookShareButton
					url={'https://ciel-sucre.vercel.app'}
					quote={quoteText}
					hashtag={'#frenchcake'}
				>
					<FacebookIcon size={36} />
				</FacebookShareButton>
				<TwitterShareButton
					title={quoteText}
					url={'https://ciel-sucre.vercel.app'}
					hashtag={'#frenchcake'}
				>
					<TwitterIcon size={36} />
				</TwitterShareButton>
				<EmailShareButton
					title="Le Ciel Sucré"
					body={quoteText}
					url={
						'Find more on our website:\n\u{1F517} https://ciel-sucre.vercel.app'
					}
				>
					<EmailIcon size={36} />
				</EmailShareButton>
			</div>
		</motion.div>
	);
};

export default RecipeCard;
