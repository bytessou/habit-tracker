import { type HabitLog } from "../types/habit";
import { getTodayString, getYesterdayString } from "../utils/dateUtils";

export const calculateStreak = (logs: HabitLog[]): number => {
	// criamos um Set apenas com as datas que foram marcadas como completadas
	const completedDates = new Set(
		logs?.filter((l) => l.completed).map((l) => l.date) || [],
	);

	if (completedDates.size === 0) return 0;

	const today = getTodayString();
	const yesterday = getYesterdayString();

	// se o usuário não completou nada hoje nem ontem, a sequência quebrou
	if (!completedDates.has(today) && !completedDates.has(yesterday)) {
		return 0;
	}

	let count = 0;

	// começamos a contar a partir de "hoje" (se completou) ou "ontem"
	let currentCheckDate = completedDates.has(today) ? today : yesterday;

	// loop regressivo manual para evitar problemas com fuso horário do Objeto Date
	while (completedDates.has(currentCheckDate)) {
		count++;

		// decrementar um dia na string da data (YYYY-MM-DD)
		const dateObj = new Date(currentCheckDate + "T12:00:00"); // T12:00 evita bugs de fuso
		dateObj.setDate(dateObj.getDate() - 1);
		currentCheckDate = dateObj.toISOString().split("T")[0];
	}

	return count;
};
