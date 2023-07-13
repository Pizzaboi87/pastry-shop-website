export const slideIn = (direction, delay) => {
	return {
		initial: {
			opacity: 0,
			transform: `translateX(${direction === 'right' ? '-' : ''}100%)`,
			delay: delay,
		},
		whileInView: {
			transform: 'translateX(0)',
			opacity: 1,
			transition: {
				type: 'spring',
				delay: delay,
				duration: 0.5,
			},
		},
		viewport: { once: false, opacity: 1 },
	};
};
