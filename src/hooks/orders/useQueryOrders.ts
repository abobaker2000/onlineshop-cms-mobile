import { InfiniteData, useInfiniteQuery } from 'react-query';
import { GetAllDraftOrdersBodyDto, GetAllDraftOrdersResponseDto } from 'abobaker2000-typescript-axios';
import { AxiosResponse } from 'axios';
import { QueryKeys } from '../../utils/react-query/query-keys';
import { DraftOrders, Orders } from '../../utils/typescript-axios-config';

interface UseGetAllOrdersState {
	getAllOrders: InfiniteData<AxiosResponse<GetAllDraftOrdersResponseDto, any>> | undefined;
	getAllOrdersLoading: boolean;
	getAllOrdersError: unknown;
	refetch: () => void;
	isFetched: boolean;
	fetchNextPage: () => void;
	hasNextPage: boolean | undefined;
}

export const useGetAllOrders = (requestData: GetAllDraftOrdersBodyDto): UseGetAllOrdersState => {
	const {
		data: getAllOrders,
		error: getAllOrdersError,
		isLoading: getAllOrdersLoading,
		refetch,
		isFetched,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		[QueryKeys.ORDERS, requestData],
		({ pageParam = 1 }) => {
			return DraftOrders.getAll(
				{ ...requestData, page: pageParam },
				{ headers: { 'x-tenant-id': 'shop_abobaker1' } }, // localStorage.getItem('TENANT_ID')
			);
		},
		{
			getNextPageParam: (lastPageData) => {
				const currentPage = lastPageData?.data;

				const lastPage = Number(lastPageData?.data.pageCount) ?? 0;
				const hydraView = 'currentPage' in currentPage ? Number(currentPage.currentPage) : 1;

				if ((lastPage ?? 0) > Number(hydraView - 1 ?? 0)) {
					return hydraView + 1 || 1;
				}
				return false;
			},
			refetchOnWindowFocus: false,
			select: (data) => ({
				pages: [...data.pages].reverse(),
				pageParams: [...data.pageParams].reverse(),
			  }),
			retry: 1,
			onError: (error) => {
				console.log(error, 'error');
			},
		},
	);

	return {
		getAllOrders,
		getAllOrdersLoading,
		getAllOrdersError,
		refetch,
		isFetched,
		fetchNextPage,
		hasNextPage,
	};
};


interface UseGetAllDraftOrdersState {
	getAllDraftOrders: InfiniteData<AxiosResponse<GetAllDraftOrdersResponseDto, any>> | undefined;
	getAllDraftOrdersLoading: boolean;
	getAllDraftOrdersError: unknown;
	refetch: () => void;
	isFetched: boolean;
	fetchNextPage: () => void;
	hasNextPage: boolean | undefined;
}


export const useGetAllDraftOrders = (requestData: GetAllDraftOrdersBodyDto): UseGetAllDraftOrdersState => {
	const {
		data: getAllDraftOrders,
		error: getAllDraftOrdersError,
		isLoading: getAllDraftOrdersLoading,
		refetch,
		isFetched,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		[QueryKeys.ORDERS, requestData],
		({ pageParam = 1 }) => {
			return Orders.(
				{ ...requestData, page: pageParam },
				{ headers: { 'x-tenant-id': 'shop_abobaker1' } }, // localStorage.getItem('TENANT_ID')
			);
		},
		{
			getNextPageParam: (lastPageData) => {
				const currentPage = lastPageData?.data;

				const lastPage = Number(lastPageData?.data.pageCount) ?? 0;
				const hydraView = 'currentPage' in currentPage ? Number(currentPage.currentPage) : 1;

				if ((lastPage ?? 0) > Number(hydraView - 1 ?? 0)) {
					return hydraView + 1 || 1;
				}
				return false;
			},
			refetchOnWindowFocus: false,
			select: (data) => ({
				pages: [...data.pages].reverse(),
				pageParams: [...data.pageParams].reverse(),
			  }),
			retry: 1,
			onError: (error) => {
				console.log(error, 'error');
			},
		},
	);

	return {
		getAllDraftOrders,
		getAllDraftOrdersLoading,
		getAllDraftOrdersError,
		refetch,
		isFetched,
		fetchNextPage,
		hasNextPage,
	};
};