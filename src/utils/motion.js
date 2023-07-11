export const slideIn = (direction) => {
	return {
		initial: {
			transform: `translateX(${direction === 'right' ? '-' : ''}100%)`,
		},
		whileInView: { transform: 'translateX(0)' },
		viewport: { once: false },
	};
};
