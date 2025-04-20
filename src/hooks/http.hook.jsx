import { useState, useCallback } from 'react';

const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const request = useCallback(async (url) => {

		setLoading(true);
		try {
			const req = await fetch(url);

			if (!req.ok) {
				throw new Error(`Couldn't fetch ${url}, response status: ${req.status}`)
			}

			const data = await req.json();

			setLoading(false);
			return data;
		} catch(e) {
			setLoading(false);
			setError(true);
			throw e;
		}
	}, []);

	const clearError = useCallback(() => {
		setError(false);
	}, []);

	return { loading, error, request, clearError };
}

export default useHttp;