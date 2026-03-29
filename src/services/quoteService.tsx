// Algumas frases prontas pra mostrar no front

const quotes = [
	"A disciplina é a liberdade encontrada na rotina.",
	"O sucesso é a soma de pequenos esforços repetidos dia após dia.",
	"Não pare até se orgulhar de você.",
	"A constância é a mãe do êxito.",
	"Vencer a si próprio é a maior das vitórias.",
	"Sua rotina define quem você se tornará.",
	"Pequenos hábitos, grandes mudanças.",
	"O que você faz todos os dias importa mais.",
	"Motivação faz você começar. Hábito faz você continuar.",
	"Seja mais forte que sua melhor desculpa.",
	"A repetição é o pai da perfeição.",
	"Foco é dizer não a outras boas ideias.",
	"Onde há foco, a energia flui.",
	"Grandes coisas nunca vêm de zonas de conforto.",
	"Faça hoje o que seu 'eu' do futuro irá agradecer.",
];

export const getDailyQuote = (): string => {
	// Gera um índice baseado no dia do ano (0-365)
	const now = new Date();
	const start = new Date(now.getFullYear(), 0, 0);
	const diff = now.getTime() - start.getTime();
	const oneDay = 1000 * 60 * 60 * 24;
	const day = Math.floor(diff / oneDay);

	return quotes[day % quotes.length];
};
