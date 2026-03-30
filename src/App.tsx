import { useState, useEffect } from "react";
import { useHabits } from "./hooks/useHabits";
import { HabitList } from "./components/HabitList";
import { StatsArea } from "./components/StatsArea";
import { AddHabitModal } from "./components/AddHabitModal";
import { getTodayString } from "./utils/dateUtils";
import { useNotifications } from "./hooks/useNotifications";
import { NotificationWatcher } from "./components/NotificationWatcher";
import { type Habit } from "./types/habit";

function App() {
	const {
		habits,
		addHabit,
		updateHabit,
		deleteHabit,
		toggleHabitDate,
		getHabitsByDate,
		handleExport,
		handleImport,
	} = useHabits();

	const [selectedDate, setSelectedDate] = useState<string>(getTodayString());
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null);
	const { requestPermission } = useNotifications();

	useEffect(() => {
		requestPermission();
	}, [requestPermission]);

	return (
		<div className="min-h-screen lg:h-screen bg-[#111111] text-white p-4 md:p-10 flex items-center justify-center lg:overflow-hidden">
			<NotificationWatcher />
			<main className="flex flex-col lg:flex-row gap-6 w-full max-w-[1200px] lg:h-[85vh] items-stretch">
				<HabitList
					habits={habits}
					selectedDate={selectedDate}
					onDateSelect={setSelectedDate}
					onToggleHabit={(id) => toggleHabitDate(id, selectedDate)}
					onOpenAddModal={() => {
						setHabitToEdit(null); // Garante que é novo
						setIsModalOpen(true);
					}}
					onEditHabit={(habit) => {
						setHabitToEdit(habit);
						setIsModalOpen(true);
					}}
				/>

				<StatsArea
					habits={habits}
					selectedDate={selectedDate}
					completedHabits={getHabitsByDate(selectedDate)}
					onExport={handleExport}
					onImport={(e) => {
						const file = e.target.files?.[0];
						if (file) handleImport(file);
					}}
				/>
			</main>

			<AddHabitModal
				isOpen={isModalOpen}
				initialData={habitToEdit}
				onClose={() => {
					setIsModalOpen(false);
					setHabitToEdit(null);
				}}
				onAdd={(n, c, cat, t, tp) => {
					// 'tp' é o tipo (hábito/rotina)
					if (habitToEdit) {
						updateHabit(habitToEdit.id, {
							name: n,
							color: c,
							category: cat,
							reminderTime: t,
							type: tp,
						});
					} else {
						addHabit(n, c, cat, t, tp);
					}
				}}
				onDelete={deleteHabit}
			/>
		</div>
	);
}

export default App;
