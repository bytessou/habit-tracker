import { useEffect } from "react";
import { useHabits } from "../hooks/useHabits";
import { useNotifications } from "../hooks/useNotifications";
import { formatTime } from "../utils/dateUtils";

export const NotificationWatcher = () => {
	const { habits } = useHabits();
	const { notify } = useNotifications();

	useEffect(() => {
		const checkReminders = setInterval(() => {
			const now = new Date();
			const currentTime = formatTime(now); // Exemplo de uso do formatTime

			habits.forEach((habit) => {
				if (habit.reminderTime === currentTime) {
					notify("Lembrete de Hábito", `Ei, está na hora de: ${habit.name}`);
				}
			});
		}, 60000); // Faz uma checagem a cada 1 minuto

		return () => clearInterval(checkReminders);
	}, [habits, notify]);

	return null; // Não renderiza nada no navegador
};
