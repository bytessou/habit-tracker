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
