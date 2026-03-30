import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Habit } from "../types/habit";
import { getTodayString, getYesterdayString } from "../utils/dateUtils";
import { fadeIn, staggerContainer, listItem } from "../utils/animations";
import { calculateStreak } from "../services/streakLogic";
import { getDailyQuote } from "../services/quoteService";

interface StatsAreaProps {
	habits: Habit[];
	selectedDate: string;
	completedHabits: Habit[];
	onExport: () => void;
	onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StatsArea: React.FC<StatsAreaProps> = ({
	habits,
	selectedDate,
	completedHabits,
	onExport,
	onImport,
}) => {
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
			className="flex flex-col w-full lg:w-1/3 bg-[#111] lg:bg-[#1a1a1a] rounded-[32px] p-6 md:p-8 relative border border-[#222] mt-4 lg:mt-0 lg:h-[85vh] overflow-visible lg:overflow-hidden"
		>
			{/* no desktop é flex-none, no mobile não */}
			<div className="lg:flex-none">
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
						{getDateLabel()} {selectedDate.split("-")[0]}
					</p>
				</div>
			</div>

			{/* scroll apenas no desktop */}
			<div className="lg:flex-1 lg:overflow-y-auto lg:custom-scrollbar lg:pr-2 lg:min-h-0">
				<AnimatePresence mode="wait">
					<motion.div
						key={selectedDate}
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={staggerContainer}
						className="space-y-3 pb-6"
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
								className="flex flex-col items-center justify-center py-10 opacity-20"
							>
								<span className="text-4xl mb-2">∅</span>
								<p className="text-sm italic text-center">
									Nenhum registro para este dia.
								</p>
							</motion.div>
						)}
					</motion.div>
				</AnimatePresence>
			</div>

			{/* mt-10 no mobile para dar respiro, mt-auto no desktop para colar no fundo */}
			<div className="mt-10 lg:mt-auto lg:flex-none flex flex-col gap-6 pt-6 border-t border-white/5 lg:border-none">
				<div className="flex flex-col gap-3">
					<button
						onClick={onExport}
						className="w-full bg-[#fb7c64] hover:bg-[#fb7c64]/90 text-white font-bold py-4 rounded-2xl transition-all cursor-pointer text-sm uppercase tracking-wide"
					>
						Salvar Backup
					</button>
					<label className="w-full bg-[#2a2a2a] hover:bg-[#333] text-[#999] font-bold py-4 rounded-2xl transition-all cursor-pointer text-center text-sm uppercase tracking-wide">
						Importar Dados
						<input
							type="file"
							accept=".json"
							onChange={onImport}
							className="hidden"
						/>
					</label>
				</div>

				<div className="text-center select-none pb-2">
					<p className="text-[9px] uppercase tracking-[3px] text-[#fb7c64] mb-2 font-bold opacity-60">
						Frase do dia
					</p>
					<h4 className="text-sm font-light text-white/40 italic leading-tight px-4">
						"{dailyQuote}"
					</h4>
				</div>
			</div>
		</motion.div>
	);
};
