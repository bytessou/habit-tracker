import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../utils/animations";
import { type HabitType, type Habit, type HabitCategory } from "../types/habit";

interface AddHabitModalProps {
	isOpen: boolean;
	initialData: Habit | null; // Adicionado para suportar edição
	onClose: () => void;
	onAdd: (
		name: string,
		color: string,
		category: HabitCategory,
		time: string,
		type: HabitType,
	) => void;
}

const CATEGORIES: HabitCategory[] = [
	"Saúde",
	"Exercícios",
	"Estudos",
	"Finanças",
	"Lazer",
	"Outros",
];

export const AddHabitModal: React.FC<AddHabitModalProps> = ({
	isOpen,
	initialData, // Agora declarado corretamente
	onClose,
	onAdd,
}) => {
	const [name, setName] = useState("");
	const [color, setColor] = useState("#fb7c64");
	const [category, setCategory] = useState<HabitCategory>("Saúde");
	const [type, setType] = useState<HabitType>("hábito");
	const [time, setTime] = useState("08:00");

	// Sincroniza os campos do formulário quando o modal abre para edição ou criação
	useEffect(() => {
		if (isOpen) {
			if (initialData) {
				setName(initialData.name);
				setColor(initialData.color);
				setCategory(initialData.category);
				setTime(initialData.reminderTime);
				setType(initialData.type || "hábito");
			} else {
				setName("");
				setColor("#fb7c64");
				setCategory("Saúde");
				setTime("08:00");
				setType("hábito");
			}
		}
	}, [initialData, isOpen]);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (!name.trim()) return;

		onAdd(name, color, category, time, type);
		onClose();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 bg-black/80 backdrop-blur-sm"
					/>

					<motion.div
						variants={fadeIn}
						initial="hidden"
						animate="visible"
						exit="exit"
						className="bg-[#1a1a1a] w-full max-w-md p-8 rounded-[32px] border border-[#333] relative z-10"
					>
						<h2 className="text-2xl font-bold mb-6 text-white">
							{initialData ? "Editar Hábito" : "Novo Hábito"}
						</h2>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="habit-name"
									className="text-xs uppercase text-[#666] font-bold mb-2 block tracking-widest"
								>
									Nome
								</label>
								<input
									id="habit-name"
									autoFocus
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full bg-[#222] border border-[#333] rounded-xl p-4 text-white focus:outline-none focus:border-[#fb7c64] transition-colors"
									placeholder="Ex: Beber 4L de água"
								/>
							</div>

							<div>
								<label
									htmlFor="habit-category"
									className="text-xs uppercase text-[#666] font-bold mb-2 block tracking-widest"
								>
									Categoria
								</label>
								<select
									id="habit-category"
									value={category}
									onChange={(e) => setCategory(e.target.value as HabitCategory)}
									className="w-full bg-[#222] border border-[#333] rounded-xl p-4 text-white focus:outline-none focus:border-[#fb7c64] appearance-none"
								>
									{CATEGORIES.map((cat) => (
										<option key={cat} value={cat}>
											{cat}
										</option>
									))}
								</select>
							</div>

							<div className="flex gap-4">
								<div className="flex-1">
									<label
										htmlFor="habit-time"
										className="text-xs uppercase text-[#666] font-bold mb-2 block tracking-widest"
									>
										Horário
									</label>
									<input
										id="habit-time"
										type="time"
										value={time}
										onChange={(e) => setTime(e.target.value)}
										className="w-full bg-[#222] border border-[#333] rounded-xl p-4 text-white focus:outline-none"
									/>
								</div>
								<div>
									<label
										htmlFor="habit-color"
										className="text-xs uppercase text-[#666] font-bold mb-2 block tracking-widest"
									>
										Cor
									</label>
									<input
										id="habit-color"
										type="color"
										value={color}
										onChange={(e) => setColor(e.target.value)}
										className="h-[58px] w-[58px] bg-[#222] border border-[#333] rounded-xl p-1 cursor-pointer block"
									/>
								</div>
							</div>

							<div className="flex gap-2 p-1 bg-[#222] rounded-xl border border-[#333]">
								{(["hábito", "rotina"] as HabitType[]).map((t) => (
									<button
										key={t}
										type="button"
										onClick={() => setType(t)}
										className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
											type === t ? "bg-[#fb7c64] text-white" : "text-[#666]"
										}`}
									>
										{t}
									</button>
								))}
							</div>
							<div className="flex gap-3 pt-4">
								<button
									type="button"
									onClick={onClose}
									className="flex-1 px-6 py-4 rounded-2xl bg-[#222] text-[#666] font-bold hover:bg-[#2a2a2a] transition-colors"
								>
									Cancelar
								</button>

								<button
									type="submit"
									className="flex-[2] px-6 py-4 rounded-2xl bg-[#fb7c64] text-white font-bold hover:bg-[#fa6a4f] shadow-lg shadow-[#fb7c64]/20 transition-all active:scale-95"
								>
									{initialData ? "Salvar Alterações" : "Criar Hábito"}
								</button>
							</div>
						</form>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};
