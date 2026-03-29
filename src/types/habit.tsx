export interface HabitLog {
	date: string; // Data no formato YYYY-MM-DD
	completed: boolean;
}

export interface Habit {
	id: string;
	name: string;
	color: string;
	reminderTime: string; // Formato HH:mm
	createdAt: string;
	logs: HabitLog[];
}

export interface HabitStats {
	currentStreak: number;
	isCompletedToday: boolean;
	lastCompletedDate: string | null;
}
