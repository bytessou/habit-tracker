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
		<div className="bg-[#1a1a1a]/50 p-4 md:p-6 rounded-3xl mb-6 md:mb-10 border border-[#222] shrink-0">
			<div className="flex justify-between items-center mb-4 md:mb-6">
				<h2 className="text-lg md:text-xl font-bold text-white/90">
					Calendário Semanal
				</h2>
				<button className="text-[#fb7c64] hover:bg-[#fb7c64]/10 p-2 rounded-lg transition-colors cursor-pointer">
					<span className="text-lg">▶</span>
				</button>
			</div>

			{/* CONTAINER AJUSTADO: 
                - overflow-x-auto permite scroll no mobile se faltar espaço
                - custom-scrollbar para esconder a barra ou deixá-ar bonita
                - justify-start no mobile e justify-between no desktop
            */}
			<div className="flex justify-between gap-2 md:gap-4 px-1 py-2 overflow-x-auto md:overflow-x-visible custom-scrollbar">
				{weekDays.map((day) => {
					const isSelected = day.dateStr === selectedDate;

					return (
						<button
							key={day.dateStr}
							onClick={() => onDateSelect(day.dateStr)}
							// MUDANÇA: min-w menor no mobile (50px) e fixo no desktop (65px)
							className={`flex-1 flex flex-col items-center justify-center py-3 md:py-4 rounded-2xl min-w-[45px] max-w-[120px]
                transition-all duration-300 cursor-pointer select-none
                ${
									isSelected
										? "bg-[#fb7c64] text-white shadow-[0_10px_25px_rgba(251,124,100,0.3)] scale-105"
										: "bg-[#222] text-[#666] hover:bg-[#282828]"
								}`}
						>
							<span className="text-[9px] md:text-[10px] uppercase font-bold tracking-tighter mb-1">
								{day.weekDayName}
							</span>
							<span className="text-base md:text-lg font-black">
								{day.dayNum}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};
