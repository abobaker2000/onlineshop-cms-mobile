import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setLogin, setLogout } from '../../redux';
import { localStorage } from '../../utils/storage';
import { useQuery } from 'react-query';

export const useLogin = () => {
	const dispatch = useDispatch();
	const login = async ({ email, password }: { email: string; password: string }) => {
		if (!email && !password) return;
		await axios
			.post('https://api.abofy.online/api/auth/login', {
				email,
				password,
			})
			.then((data) => {
				localStorage.setItem('JWT', data.data.token);
				return dispatch(setLogin(data.data.user));
			})
			.catch(() => {
				return dispatch(setLogout());
			});
	};

	return { login };
};

interface IUseGetAllShopsState {
	getAllShops: IShop[];
	getAllShopsLoading: boolean;
	getAllShopsError: unknown;
	getAllShopsRefetch: () => void;
}

export const useGetAllShops = (): IUseGetAllShopsState => {
	const {data: getAllShops, isLoading: getAllShopsLoading, error: getAllShopsError, refetch: getAllShopsRefetch} = useQuery(
		['shops', localStorage.JWT], () => axios.get('https://api.abofy.online/api/admin/shops', {
			withCredentials: true,
				headers: {
					Authorization: `Bearer ${localStorage.JWT}`,
					'Content-Type': 'application/json',
				},
		}),{
			select: (data) => data?.data?.shops,
			onError: (error) => {
				console.log(error, 'error');
			},
		})

	return {
		getAllShops,
		getAllShopsLoading,
		getAllShopsError,
		getAllShopsRefetch
	}
}
