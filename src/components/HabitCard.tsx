import React from "react";
import { motion } from "framer-motion";
import { type Habit } from "../types/habit";
import { calculateStreak } from "../services/streakLogic";
import { listItem } from "../utils/animations";
import { getTodayString } from "../utils/dateUtils"; // Importando sua utilidade de data

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
	const today = getTodayString();

	// Verifica se a data selecionada é posterior a hoje
	const isFutureDate = selectedDate > today;

	const isCompletedOnSelectedDate = habit.logs.some(
		(l) => l.date === selectedDate && l.completed,
	);

	const completedClassName = isCompletedOnSelectedDate
		? "bg-[#fb7c64] border-[#fb7c64] shadow-[0_4px_15px_rgba(251,124,100,0.4)] cursor-pointer"
		: "border-[#333] hover:border-[#fb7c64] cursor-pointer";

	const buttonClassName = isFutureDate
		? "border-[#222] bg-[#1a1a1a] cursor-not-allowed opacity-50"
		: completedClassName;

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
			className="bg-[#222] p-4 rounded-2xl mb-2 flex items-center justify-between transition-all cursor-pointer group"
		>
			<div className="flex items-center gap-4">
				<div
					className={`w-1.5 h-10 rounded-full transition-opacity ${isFutureDate ? "opacity-30" : "opacity-100"}`}
					style={{ backgroundColor: habit.color }}
				/>
				<div className={isFutureDate ? "opacity-50" : "opacity-100"}>
					{streak > 0 && (
						<div className="flex items-center gap-1 text-[#fb7c64] text-[10px] font-bold uppercase tracking-wider mb-1">
							<span>🔥</span> {streak} dias de sequência
						</div>
					)}
					<h3 className="text-[#efefef] font-medium text-sm md:text-base">
						{habit.name}
					</h3>
					<p className="text-[#666] text-xs">
						{isFutureDate ? "Disponível em breve" : habit.reminderTime}
					</p>
				</div>
			</div>

			<motion.button
				whileTap={isFutureDate ? {} : { scale: 0.8 }}
				disabled={isFutureDate}
				onClick={(e) => {
					e.stopPropagation();
					if (!isFutureDate) onToggle(habit.id);
				}}
				className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${buttonClassName}`}
			>
				{isCompletedOnSelectedDate && !isFutureDate && (
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

				{/* Ícone de cadeado opcional para feedback visual no futuro */}
				{isFutureDate && (
					<span className="text-[10px] grayscale opacity-50">🔒</span>
				)}
			</motion.button>
		</motion.div>
	);
};
