import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Habit } from "../types/habit";
import { getTodayString, getYesterdayString } from "../utils/dateUtils";
import { fadeIn, staggerContainer, listItem } from "../utils/animations";
import { calculateStreak } from "../services/streakLogic";
import { getDailyQuote } from "../services/quoteService"; // Criaremos este arquivo abaixo

interface StatsAreaProps {
	habits: Habit[]; // Adicionado
	selectedDate: string;
	completedHabits: Habit[];
	onExport: () => void; // Adicionado
	onImport: (e: React.ChangeEvent<HTMLInputElement>) => void; // Adicionado
}

export const StatsArea: React.FC<StatsAreaProps> = ({
	habits,
	selectedDate,
	completedHabits,
	onExport,
	onImport,
}) => {
	// Calculamos a maior sequência global entre todos os hábitos
	const globalMaxStreak = useMemo(() => {
		const streaks = habits.map((h) => calculateStreak(h.logs));
		return streaks.length > 0 ? Math.max(...streaks) : 0;
	}, [habits]);

	const dailyQuote = useMemo(() => getDailyQuote(), []);

	const getDateLabel = () => {
		if (selectedDate === getTodayString()) return "Hoje";
		if (selectedDate === getYesterdayString()) return "Ontem";
		return selectedDate.split("-").reverse().join("/");
	};

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={staggerContainer}
			className="hidden lg:flex flex-col w-1/3 bg-[#1a1a1a] rounded-[32px] p-8 min-h-[600px] relative border border-[#222]"
		>
			{/* Botões de Backup */}
			<div className="flex gap-2 mb-8">
				<button
					onClick={onExport}
					className="flex-1 bg-[#222] hover:bg-[#2a2a2a] text-[10px] text-[#666] font-bold py-2 rounded-xl border border-[#333] transition-all cursor-pointer uppercase tracking-tighter"
				>
					Salvar Backup
				</button>
				<label className="flex-1 bg-[#222] hover:bg-[#2a2a2a] text-[10px] text-[#666] font-bold py-2 rounded-xl border border-[#333] transition-all cursor-pointer text-center uppercase tracking-tighter">
					Importar
					<input
						type="file"
						accept=".json"
						onChange={onImport}
						className="hidden"
					/>
				</label>
			</div>

			{/* Card de Streak Global */}
			<div className="bg-[#fb7c64]/10 p-6 rounded-3xl mb-8 border border-[#fb7c64]/20 flex items-center justify-between">
				<div>
					<p className="text-[#fb7c64] text-[10px] uppercase font-bold tracking-[2px] mb-1">
						Melhor Sequência
					</p>
					<h3 className="text-3xl font-black text-white">
						{globalMaxStreak}{" "}
						<span className="text-lg font-medium opacity-50">dias</span>
					</h3>
				</div>
				<span className="text-4xl">🔥</span>
			</div>

			<div className="mb-6">
				<h2 className="text-xl font-bold text-white">Tarefas completadas</h2>
				<p className="text-[#fb7c64] text-[10px] font-bold uppercase tracking-widest mt-1">
					{getDateLabel()}
				</p>
			</div>

			<AnimatePresence mode="wait">
				<motion.div
					key={selectedDate}
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={staggerContainer}
					className="space-y-3 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar"
				>
					{completedHabits.length > 0 ? (
						completedHabits.map((h) => (
							<motion.div
								key={h.id}
								variants={listItem}
								className="flex items-center gap-3 p-4 bg-[#222]/50 rounded-2xl border border-[#333]"
							>
								<div
									className="w-2 h-2 rounded-full"
									style={{
										backgroundColor: h.color,
										boxShadow: `0 0 10px ${h.color}`,
									}}
								/>
								<span className="text-[#eee] text-sm font-medium">
									{h.name}
								</span>
							</motion.div>
						))
					) : (
						<motion.div
							variants={fadeIn}
							className="flex flex-col items-center justify-center mt-10 opacity-20"
						>
							<span className="text-4xl mb-2">∅</span>
							<p className="text-sm italic text-center">
								Nenhum registro para este dia.
							</p>
						</motion.div>
					)}
				</motion.div>
			</AnimatePresence>

			{/* Frase Dinâmica */}
			<div className="absolute bottom-10 left-8 right-8 text-center opacity-40 select-none">
				<p className="text-[9px] uppercase tracking-[3px] text-[#fb7c64] mb-2 font-bold">
					Frase do dia
				</p>
				<h4 className="text-md font-light text-white italic leading-relaxed">
					"{dailyQuote}"
				</h4>
			</div>
		</motion.div>
	);
};
