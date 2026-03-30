import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Habit } from "../types/habit";
import { HabitCard } from "./HabitCard";
import { WeeklyCalendar } from "./WeeklyCalendar";
import { staggerContainer, fadeIn } from "../utils/animations";

interface HabitListProps {
	habits: Habit[];
	selectedDate: string;
	onToggleHabit: (id: string) => void;
	onDateSelect: (date: string) => void;
	onOpenAddModal: () => void;
	onEditHabit: (habit: Habit) => void;
}

export const HabitList: React.FC<HabitListProps> = ({
	habits,
	selectedDate,
	onToggleHabit,
	onDateSelect,
	onOpenAddModal,
	onEditHabit,
}) => {
	const routineHabits = habits.filter((h) => h.type === "rotina");
	const generalHabits = habits.filter((h) => h.type === "hábito");

	return (
		<motion.div
			variants={fadeIn}
			initial="hidden"
			animate="visible"
			className="w-full lg:w-2/3 bg-[#161616] p-6 md:p-8 rounded-[32px] shadow-2xl flex flex-col h-full overflow-hidden border border-[#222]"
		>
			{/* elemento fixo no topo */}
			<div className="shrink-0">
				<WeeklyCalendar
					selectedDate={selectedDate}
					onDateSelect={onDateSelect}
				/>
			</div>

			{/* header fixo e ajustado pra 'lg' para sincronizar com o grid de baixo */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 mb-4 shrink-0 px-2">
				<h2 className="text-xl font-bold text-white opacity-80 uppercase tracking-tighter hidden lg:block">
					Rotina
				</h2>
				<h2 className="text-xl font-bold text-white opacity-80 uppercase tracking-tighter hidden lg:block">
					Hábitos
				</h2>
			</div>

			{/* container com scroll */}
			<div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* coluna rotina */}
					<div className="flex flex-col gap-3">
						<h2 className="text-xl font-bold mb-4 text-white opacity-80 lg:hidden uppercase tracking-tighter">
							Rotina
						</h2>
						<motion.div
							layout
							variants={staggerContainer}
							className="flex flex-col gap-3"
						>
							<AnimatePresence mode="popLayout">
								{routineHabits.map((habit) => (
									<HabitCard
										key={habit.id}
										habit={habit}
										onToggle={onToggleHabit}
										onEdit={onEditHabit}
										selectedDate={selectedDate}
									/>
								))}
							</AnimatePresence>
						</motion.div>
					</div>

					{/* coluna hábitos */}
					<div className="flex flex-col gap-3">
						<h2 className="text-xl font-bold mb-4 text-white opacity-80 lg:hidden uppercase tracking-tighter">
							Hábitos
						</h2>
						<motion.div
							layout
							variants={staggerContainer}
							className="flex flex-col gap-3"
						>
							<AnimatePresence mode="popLayout">
								{generalHabits.map((habit) => (
									<HabitCard
										key={habit.id}
										habit={habit}
										onToggle={onToggleHabit}
										onEdit={onEditHabit}
										selectedDate={selectedDate}
									/>
								))}
							</AnimatePresence>
						</motion.div>
					</div>
				</div>
			</div>

			{/* botão adicionar */}
			<div className="pt-6 shrink-0">
				<motion.button
					onClick={onOpenAddModal}
					whileHover={{ scale: 1.1, rotate: 90 }}
					whileTap={{ scale: 0.9 }}
					className="w-14 h-14 rounded-full bg-[#fb7c64] py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20 uppercase tracking-widest text-sm"
				>
					<svg
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
					>
						<line x1="12" y1="5" x2="12" y2="19"></line>
						<line x1="5" y1="12" x2="19" y2="12"></line>
					</svg>
				</motion.button>
			</div>
		</motion.div>
	);
};
