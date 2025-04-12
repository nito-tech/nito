import { useEffect, useState } from "react";

export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, (value: T) => void] {
	// 状態の初期化
	const [storedValue, setStoredValue] = useState<T>(initialValue);

	// localStorage からの値の取得
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				setStoredValue(JSON.parse(item));
			}
		} catch (error) {
			console.log(error);
		}
	}, [key]);

	// localStorage への値の設定
	const setValue = (value: T) => {
		try {
			setStoredValue(value);
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(value));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return [storedValue, setValue];
}
