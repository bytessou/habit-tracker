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
	// AGORA FILTRA PELO TIPO DEFINIDO PELO USUÁRIO
	const routineHabits = habits.filter((h) => h.type === "rotina");
	const generalHabits = habits.filter((h) => h.type === "hábito");

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={fadeIn}
			className="w-full lg:w-2/3 bg-[#161616] p-8 rounded-[32px] min-h-[600px] shadow-2xl relative"
		>
			<WeeklyCalendar selectedDate={selectedDate} onDateSelect={onDateSelect} />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Coluna Rotina */}
				<div>
					<h2 className="text-xl font-bold mb-6 text-white opacity-80">
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
									onEdit={onEditHabit} // Passando a função de editar
									selectedDate={selectedDate}
								/>
							))}
						</AnimatePresence>
					</motion.div>
				</div>

				{/* Coluna Hábitos */}
				<div>
					<h2 className="text-xl font-bold mb-6 text-white opacity-80">
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
									onEdit={onEditHabit} // Passando a função de editar
									selectedDate={selectedDate}
								/>
							))}
						</AnimatePresence>
					</motion.div>
				</div>
			</div>

			{/* Botão Adicionar */}
			<motion.button
				onClick={onOpenAddModal}
				whileHover={{ scale: 1.1, rotate: 90 }}
				whileTap={{ scale: 0.9 }}
				className="absolute bottom-8 right-8 bg-[#fb7c64] w-14 h-14 rounded-full text-white shadow-lg cursor-pointer flex items-center justify-center z-20"
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
		</motion.div>
	);
};
