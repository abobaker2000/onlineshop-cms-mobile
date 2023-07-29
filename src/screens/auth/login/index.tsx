import { Button, Image, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import { loginStyles } from './login.styles';
import { GlobalColors } from '../../../theme/colors';
import { useLogin } from '../../../hooks/auth/useQueryAuth';

export function LoginScreen() {
	const { login } = useLogin();

	return (
		<View style={loginStyles.container}>
			<Image
				resizeMode='contain'
				style={{
					width: '100%',
					height: 175,
				}}
				source={require('../../../../assets/ec-markt-complett-logo.png')}
			/>
			<Formik
				initialValues={{
					email: 'chawarneh@hotmail.de',
					password: '12345678',
				}}
				onSubmit={async (values) => {
					await login({ email: values.email, password: values.password });
				}}
			>
				{({ values, handleChange, handleSubmit }) => (
					<View style={[GlobalColors.card, loginStyles.card]}>
						<Text style={loginStyles.title}>Login Screen</Text>
						<TextInput
							onChangeText={handleChange('email')}
							value={values.email}
							style={loginStyles.input}
							placeholder="E-Mail"
						/>
						<TextInput
							onChangeText={handleChange('password')}
							value={values.password}
							style={loginStyles.input}
							placeholder="Password"
							secureTextEntry
						/>
						<View style={loginStyles.button}>
							<Button
								title="Login"
								onPress={() => handleSubmit()}
								color={'white'}
							/>
						</View>
					</View>
				)}
			</Formik>
		</View>
	);
}
