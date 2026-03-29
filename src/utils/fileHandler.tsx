import { type Habit } from "../types/habit";

const isValidHabitArray = (data: any): data is Habit[] => {
	if (!Array.isArray(data)) return false;

	return data.every(
		(habit) =>
			typeof habit.id === "string" &&
			typeof habit.name === "string" &&
			typeof habit.color === "string" &&
			typeof habit.reminderTime === "string" &&
			Array.isArray(habit.logs),
	);
};

export const importHabitsFromJson = async (file: File): Promise<Habit[]> => {
	return file
		.text()
		.then((text) => {
			try {
				const json = JSON.parse(text);

				if (isValidHabitArray(json)) {
					return json;
				} else {
					throw new Error(
						"Estrutura do arquivo inválida. O arquivo de backup pode estar corrompido ou não é válido.",
					);
				}
			} catch (error) {
				throw error instanceof Error
					? error
					: new Error("O arquivo selecionado não é um JSON válido.");
			}
		})
		.catch((error) => {
			throw error instanceof Error
				? error
				: new Error("Erro ao ler o arquivo.");
		});
};

export const exportHabitsToJson = (data: Habit[]) => {
	if (!isValidHabitArray(data)) {
		throw new Error(
			"Estrutura de dados inválida. Não é possível exportar hábitos.",
		);
	}

	const blob = new Blob([JSON.stringify(data, null, 2)], {
		type: "application/json",
	});
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `habits-backup_${new Date().toISOString().split("T")[0]}.json`;
	link.click();
	URL.revokeObjectURL(url);
};
