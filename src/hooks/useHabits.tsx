import { useState, useEffect } from "react";
import { type Habit, type HabitCategory, type HabitType } from "../types/habit";
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
		category: HabitCategory,
		reminderTime: string,
		type: HabitType,
	) => {
		const realDate = await getRealTime();
		const newHabit: Habit = {
			id: crypto.randomUUID(),
			name,
			color,
			category,
			type,
			reminderTime,
			createdAt: realDate.toISOString(),
			logs: [],
		};
		setHabits([...habits, newHabit]);
	};

	// NOVA FUNÇÃO pra editar nome, cor, categoria ou hora
	const updateHabit = (
		id: string,
		updatedData: Partial<Omit<Habit, "id" | "logs">>,
	) => {
		setHabits((prev) =>
			prev.map((h) => (h.id === id ? { ...h, ...updatedData } : h)),
		);
	};

	// NOVA FUNÇÃO pra deletar o hábito
	const deleteHabit = (id: string) => {
		setHabits((prev) => prev.filter((h) => h.id !== id));
	};

	const updateHabitLogs = (habit: Habit, dateToLog: string) => {
		const logExists = habit.logs.find((l) => l.date === dateToLog);
		const newLogs = logExists
			? habit.logs.filter((l) => l.date !== dateToLog)
			: [...habit.logs, { date: dateToLog, completed: true }];
		return { ...habit, logs: newLogs };
	};

	const toggleHabitDate = async (id: string, customDate?: string) => {
		const dateToLog = customDate || getTodayString(new Date());
		setHabits((prev) =>
			prev.map((habit) =>
				habit.id === id ? updateHabitLogs(habit, dateToLog) : habit,
			),
		);
	};

	const getHabitsByDate = (date: string) => {
		return habits.filter((h) =>
			h.logs.some((l) => l.date === date && l.completed),
		);
	};

	const handleImport = async (file: File) => {
		try {
			const data = await importHabitsFromJson(file);
			setHabits(data);
		} catch (e) {
			console.error(e);
		}
	};

	return {
		habits,
		addHabit,
		updateHabit, // Exposto para o front
		deleteHabit, // Exposto para o front
		toggleHabitDate,
		getHabitsByDate,
		calculateStreak,
		handleImport,
		handleExport: () => exportHabitsToJson(habits),
	};
};
