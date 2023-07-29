import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux';

export const useMutateLogin = () => {
	const dispatch = useDispatch();
	// const {mutateAsync: login, isLoading, isSuccess, isError, status, data} = useMutation(async ({email, password}: {email: string, password: string}) => {
	//     await axios.post(
	//         'https://api.abofy.online/api/auth/login',
	//         {
	//             email: email,
	//             password: password,
	//         }
	//     );
	// }, {
	//     onSuccess: () => {
	//         console.log(status, isSuccess, data, 'test-2022');
	//       },
	//       onSettled(data1, error, variables, context) {
	//         console.log(status, isSuccess, data1, 'test-2022-1');
	//       },
	// })

	// const {data: getAll} = useQuery(['login'], async () => await axios.post(
	//     'https://api.abofy.online/api/customers/get-all',
	//     {
	//         withCredentials: true,
	//         headers: {
	//             // Authorization: `Bearer ${localStorage.getItem('JWT')}`,
	//             'Content-Type': 'application/json',
	//             'x-tenant-id': 'shop_staging',
	//         },
	//     },
	// ), {
	//     onSuccess: (data) => {
	//         console.log(data, 'test');

	//     },
	//     onError: (error) => {
	//         console.log(error, 'test-1 1');
	//     }
	// })

	// axios.post(
	//     'https://api.abofy.online/api/auth/login',
	//     {
	//         email: 'chawarneh@hotmail.de',
	//         password: '12345678',
	//     },
	//     // {
	//     //     withCredentials: true,
	//     // },
	// ).then((data) => {
	//     console.log(data.data, 'test');
	// }).catch((error) => {
	//     console.log(error, 'test-1');
	// })

	const {
		data: login,
		isLoading,
		isSuccess,
		isError,
	} = useQuery(
		['login'],
		() =>
			axios.post('https://api.abofy.online/api/auth/login', {
				email: 'chawarneh@hotmail.de',
				password: '12345678',
			}),
		{
			onSuccess: (data) => {
				console.log(data.data, 'test');
			},
		},
	);

	return {
		login,
		isLoading,
		isSuccess,
		isError,
	};
};
