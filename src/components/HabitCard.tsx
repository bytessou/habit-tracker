import React from "react";
import { motion } from "framer-motion";
import { type Habit } from "../types/habit";
import { calculateStreak } from "../services/streakLogic";
import { listItem } from "../utils/animations";

interface HabitCardProps {
	habit: Habit;
	selectedDate: string;
	onToggle: (id: string) => void;
	onEdit: (habit: Habit) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
	habit,
	selectedDate,
	onToggle,
	onEdit,
}) => {
	const streak = calculateStreak(habit.logs);

	const isCompletedOnSelectedDate = habit.logs.some(
		(l) => l.date === selectedDate && l.completed,
	);

	return (
		<motion.div
			layout
			variants={listItem}
			initial="hidden"
			animate="visible"
			exit={{
				opacity: 0,
				x: -20,
				scale: 0.95,
				transition: { duration: 0.2 },
			}}
			whileHover={{ scale: 1.01, backgroundColor: "#2a2a2a" }}
			onClick={() => onEdit(habit)}
			className="bg-[#222222] p-4 rounded-2xl mb-3 flex items-center justify-between cursor-pointer border border-transparent hover:border-[#333]"
		>
			<div className="flex items-center gap-4">
				<div
					className="w-1.5 h-10 rounded-full"
					style={{ backgroundColor: habit.color }}
				/>
				<div>
					{streak > 0 && (
						<div className="flex items-center gap-1 text-[#fb7c64] text-[10px] font-bold uppercase tracking-wider mb-1">
							<span>🔥</span> {streak} dias de sequência
						</div>
					)}
					<h3 className="text-[#efefef] font-medium text-sm md:text-base">
						{habit.name}
					</h3>
					<p className="text-[#666] text-xs">{habit.reminderTime}</p>
				</div>
			</div>

			<motion.button
				whileTap={{ scale: 0.8 }}
				onClick={(e) => {
					e.stopPropagation(); // Impede que o clique no check abra o modal de editar
					onToggle(habit.id);
				}}
				className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer
                    ${
											isCompletedOnSelectedDate
												? "bg-[#fb7c64] border-[#fb7c64] shadow-[0_4px_15px_rgba(251,124,100,0.4)]"
												: "border-[#333] hover:border-[#fb7c64]"
										}`}
			>
				{isCompletedOnSelectedDate && (
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						strokeWidth="4"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<polyline points="20 6 9 17 4 12"></polyline>
					</svg>
				)}
			</motion.button>
		</motion.div>
	);
};
