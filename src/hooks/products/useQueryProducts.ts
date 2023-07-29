import { InfiniteData, useInfiniteQuery, useQuery } from 'react-query';
import { GetAllProductResponse, GetAllProductsBody } from 'abobaker2000-typescript-axios';
import { AxiosResponse } from 'axios';
import { QueryKeys } from '../../utils/react-query/query-keys';
import { Products } from '../../utils/typescript-axios-config';

interface UseGetAllProductsState {
	getAllProducts: InfiniteData<AxiosResponse<GetAllProductResponse, any>> | undefined;
	getAllProductsLoading: boolean;
	getAllProductsError: unknown;
	refetch: () => void;
	isFetched: boolean;
	fetchNextPage: () => void;
	hasNextPage: boolean | undefined;
}

export const useGetAllProducts = (requestData: GetAllProductsBody): UseGetAllProductsState => {
	const {
		data: getAllProducts,
		error: getAllProductsError,
		isLoading: getAllProductsLoading,
		refetch,
		isFetched,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		[QueryKeys.PRODUCTS, requestData],
		({ pageParam = 1 }) => {
			return Products.getProducts(
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
		getAllProducts,
		getAllProductsLoading,
		getAllProductsError,
		refetch,
		isFetched,
		fetchNextPage,
		hasNextPage,
	};
};