export const getRealTime = async (): Promise<Date> => {
	try {
		const response = await fetch("https://worldtimeapi.org/api/ip");
		const data = await response.json();
		return new Date(data.datetime);
	} catch {
		console.warn("Falha na API de hora, usando hora local.");
		return new Date();
	}
};
