import { type HabitLog } from "../types/habit";
import { getTodayString, getYesterdayString } from "../utils/dateUtils";

export const calculateStreak = (logs: HabitLog[]): number => {
	const completedDates = new Set(
		logs.filter((l) => l.completed).map((l) => l.date),
	);

	if (completedDates.size === 0) return 0;

	const today = getTodayString();
	const yesterday = getYesterdayString();

	// Se não completou nem hoje nem ontem, a streak zerou.
	if (!completedDates.has(today) && !completedDates.has(yesterday)) {
		return 0;
	}

	let count = 0;
	let checkDate = completedDates.has(today) ? new Date() : new Date(yesterday);

	// Loop regressivo para contar quantos dias seguidos existem no Set
	while (true) {
		const dateStr = checkDate.toISOString().split("T")[0];
		if (completedDates.has(dateStr)) {
			count++;
			checkDate.setDate(checkDate.getDate() - 1);
		} else {
			break;
		}
	}

	return count;
};
