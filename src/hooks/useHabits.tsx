import { useState, useEffect } from "react";
import { type Habit } from "../types/habit";
import { getRealTime } from "../services/timeService";
import { getTodayString } from "../utils/dateUtils";
import { calculateStreak } from "../services/streakLogic";
import { importHabitsFromJson, exportHabitsToJson } from "../utils/fileHandler";

const STORAGE_KEY = "@habit-tracker:v1";

export const useHabits = () => {
	const [habits, setHabits] = useState<Habit[]>([]);

	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) setHabits(JSON.parse(saved));
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
	}, [habits]);

	const addHabit = async (
		name: string,
		color: string,
		reminderTime: string,
	) => {
		const realDate = await getRealTime();
		const newHabit: Habit = {
			id: crypto.randomUUID(),
			name,
			color,
			reminderTime,
			createdAt: realDate.toISOString(),
			logs: [],
		};
		setHabits((prev) => [...prev, newHabit]);
	};

	const updateHabitLogs = (habit: Habit, dateToLog: string) => {
		const logExists = habit.logs.find((l) => l.date === dateToLog);
		const newLogs = logExists
			? habit.logs.filter((l) => l.date !== dateToLog)
			: [...habit.logs, { date: dateToLog, completed: true }];

		return { ...habit, logs: newLogs };
	};

	const toggleHabitDate = async (id: string, customDate?: string) => {
		const dateToLog = customDate || getTodayString(await getRealTime());

		setHabits((prev) =>
			prev.map((habit) => {
				if (habit.id !== id) return habit;
				return updateHabitLogs(habit, dateToLog);
			}),
		);
	};

	// Função para o calendário do front-end
	const getHabitsByDate = (date: string) => {
		return habits.filter((h) =>
			h.logs.some((l) => l.date === date && l.completed),
		);
	};

	const handleImport = async (file: File) => {
		const data = await importHabitsFromJson(file);
		setHabits(data);
	};

	return {
		habits,
		addHabit,
		toggleHabitToday: (id: string) => toggleHabitDate(id),
		toggleHabitDate, // Útil para o calendário marcar dias passados
		getHabitsByDate,
		calculateStreak, // Exporta a lógica pura
		handleImport,
		handleExport: () => exportHabitsToJson(habits),
	};
};
