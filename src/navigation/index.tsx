import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from '../redux';
import { AuthGuardNavigation } from './auth-guard-navigation';
import { GuestGuardNavigation } from './guest-guard-navigation';
import { GlobalColors, isDarkMode } from '../theme/colors';

export function Navigation() {
	const { isLoggedIn } = useSelector((state) => state.login);

	return (
		<NavigationContainer
			theme={{
				dark: isDarkMode,
				colors: {
					background: GlobalColors.background,
					primary: GlobalColors.primary,
					card: GlobalColors.card.backgroundColor,
					text: GlobalColors.text.primary,
					border: 'none',
					notification: GlobalColors.primary,
				},
			}}
		>
			{
				isLoggedIn ? <AuthGuardNavigation /> : <GuestGuardNavigation />}
		</NavigationContainer>
	);
}
