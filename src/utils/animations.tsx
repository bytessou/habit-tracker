import { type Variants } from "framer-motion";

// Animação de entrada suave (Fade In)
export const fadeIn: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: "easeOut" },
	},
	exit: {
		opacity: 0,
		y: -10,
		transition: { duration: 0.2, ease: "easeIn" },
	},
};

// Animação para a lista (Stagger)
// Faz com que os itens da lista apareçam um depois do outro
export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1, // Atraso de 0.1s entre cada filho
			delayChildren: 0.2, // Atraso inicial antes de começar a lista
		},
	},
};

// Animação para os itens da lista
export const listItem: Variants = {
	hidden: { opacity: 0, y: 15 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3, ease: "easeOut" },
	},
};

// Animação de hover para elementos clicáveis (botões, cards)
export const tapAnimation = {
	whileHover: { scale: 1.02, y: -2 },
	whileTap: { scale: 0.97 },
};
