import { t } from 'i18next';
import { QueryCache, QueryClient } from 'react-query';
import { COMMON_TRANSLATION_KEYS, TRANSLATION_KEYS } from '../../locales';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			onError: (error: any) => console.log(error),

			// --- Defaults ---
			// staleTime: 0,
			// cacheTime: 300000,
			// refetchOnMount: true,
			// refetchOnWindowFocus: true,
			// refetchOnReconnect: true,
		},
		mutations: {
			onError: (error: any) => console.log(error),
		},
	},
});

export const queryCache = new QueryCache({
	onError: (error: any) => console.log(error),
	onSuccess: () => console.log(t(COMMON_TRANSLATION_KEYS.DEFAULT_SUCCESS_MESSAGE)),
});
