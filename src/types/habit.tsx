export type HabitCategory =
	| "Saúde"
	| "Exercícios"
	| "Estudos"
	| "Finanças"
	| "Lazer"
	| "Outros";
export type HabitType = "hábito" | "rotina"; // Adicionado

export interface HabitLog {
	date: string;
	completed: boolean;
}

export interface Habit {
	id: string;
	name: string;
	color: string;
	category: HabitCategory;
	type: HabitType; // Adicionado
	reminderTime: string;
	createdAt: string;
	logs: HabitLog[];
}
