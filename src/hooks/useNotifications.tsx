export const useNotifications = () => {
	const requestPermission = async () => {
		if ("Notification" in globalThis && Notification.permission !== "granted") {
			await Notification.requestPermission();
		}
	};

	const notify = (title: string, body: string) => {
		if (Notification.permission === "granted") {
			new Notification(title, { body });
		}
	};

	return { requestPermission, notify };
};
