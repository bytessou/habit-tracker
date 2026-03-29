import React, { useMemo } from "react";
import { getWeekDays } from "../utils/dateUtils";

interface WeeklyCalendarProps {
	selectedDate: string;
	onDateSelect: (date: string) => void;
}

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
	selectedDate,
	onDateSelect,
}) => {
	const weekDays = useMemo(() => getWeekDays(), []);

	return (
		<div className="bg-[#1a1a1a]/50 p-6 rounded-3xl mb-10 border border-[#222]">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-bold text-white/90">Calendário Semanal</h2>
				<button className="text-[#fb7c64] hover:bg-[#fb7c64]/10 p-2 rounded-lg transition-colors cursor-pointer">
					<span className="text-lg">▶</span>
				</button>
			</div>

			{/* Adicionado px-2 para dar margem ao scale-105 e não cortar nas bordas */}
			<div className="flex justify-between gap-3 px-2 py-1">
				{weekDays.map((day) => {
					const isSelected = day.dateStr === selectedDate;

					return (
						<button
							key={day.dateStr}
							onClick={() => onDateSelect(day.dateStr)}
							className={`flex flex-col items-center justify-center py-4 rounded-2xl min-w-[65px] 
                        transition-all duration-300 cursor-pointer select-none
                        ${
													isSelected
														? "bg-[#fb7c64] text-white shadow-[0_10px_25px_rgba(251,124,100,0.3)] scale-110 z-10"
														: "bg-[#222] text-[#666] hover:bg-[#282828] hover:text-[#999] hover:scale-105"
												}`}
						>
							<span className="text-[10px] uppercase font-bold tracking-tighter mb-1">
								{day.weekDayName}
							</span>
							<span className="text-lg font-black">{day.dayNum}</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};
