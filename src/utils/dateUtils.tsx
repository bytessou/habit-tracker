export const getTodayString = (date: Date = new Date()): string => {
	return date.toISOString().split("T")[0];
};

export const getYesterdayString = (date: Date = new Date()): string => {
	const yesterday = new Date(date);
	yesterday.setDate(yesterday.getDate() - 1);
	return yesterday.toISOString().split("T")[0];
};

export const formatTime = (date: Date): string => {
	return date.toLocaleTimeString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
	});
};

// Gera uma array com os 7 dias da semana atual
export const getWeekDays = (
	referenceDate: Date = new Date(),
): { dateStr: string; dayNum: number; weekDayName: string }[] => {
	const currentDay = referenceDate.getDay(); // 0 = Dom, 1 = Seg...
	const weekStart = new Date(referenceDate);
	weekStart.setDate(referenceDate.getDate() - currentDay); // Ajusta para Domingo

	const week = [];
	for (let i = 0; i < 7; i++) {
		const day = new Date(weekStart);
		day.setDate(weekStart.getDate() + i);
		week.push({
			dateStr: day.toISOString().split("T")[0], // YYYY-MM-DD para lógica
			dayNum: day.getDate(), // O número do dia (ex: 29)
			weekDayName: day.toLocaleDateString("pt-BR", { weekday: "short" }), // Ex: Dom
		});
	}
	return week;
};
