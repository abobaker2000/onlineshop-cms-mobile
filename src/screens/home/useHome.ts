import { useCallback, useMemo } from 'react';

interface IDashboardStats {
	analytics: any;
	filter: string;
    type: number;
}

export const analytics = {
	salesByCountries: {
		total: 1680,
		analytics: [
			{
				country: 'us',
				amount: 60,
			},
			{
				country: 'es',
				amount: 20,
			},
			{
				country: 'uk',
				amount: 10,
			},
			{
				country: 'de',
				amount: 5,
			},
			{
				country: 'ca',
				amount: 5,
			},
		],
	},
	orderCount: {
		thisYear: {
			jan: 70,
			feb: 61,
			mar: 142,
			apr: 5,
			may: 143,
			jun: 145,
			jul: 96,
			aug: 118,
			sep: 114,
			oct: 82,
			nov: 19,
			dec: 144,
		},
		lastYear: {
			jan: 101,
			feb: 62,
			mar: 143,
			apr: 23,
			may: 55,
			jun: 44,
			jul: 94,
			aug: 99,
			sep: 39,
			oct: 1,
			nov: 107,
			dec: 119,
		},
		thisMonth: {
			firstWeek: 54,
			secondWeek: 27,
			thirdWeek: 67,
			fourthWeek: 2,
		},
		lastMonth: {
			firstWeek: 132,
			secondWeek: 127,
			thirdWeek: 44,
			fourthWeek: 120,
		},
		thisWeek: {
			monday: 91,
			tuesday: 79,
			wednesday: 90,
			thursday: 149,
			friday: 58,
			saturday: 43,
			sunday: 107,
		},
		lastWeek: {
			monday: 25,
			tuesday: 75,
			wednesday: 147,
			thursday: 16,
			friday: 16,
			saturday: 111,
			sunday: 25,
		},
		today: {
			twelveToTwo: 128,
			twoToFour: 58,
			fourToSix: 124,
			sixToEight: 89,
			eightToTen: 121,
			tenToTwelve: 93,
			twelveToFourteen: 92,
			FourteenToSixteen: 109,
			sixteenToEighteen: 44,
			eighteenToTwenty: 30,
			twentyToTwentyTwo: 2,
			twentyTwoToTwentyFour: 53,
		},
		yesterday: {
			twelveToTwo: 121,
			twoToFour: 72,
			fourToSix: 68,
			sixToEight: 148,
			eightToTen: 103,
			tenToTwelve: 57,
			twelveToFourteen: 6,
			FourteenToSixteen: 112,
			sixteenToEighteen: 15,
			eighteenToTwenty: 91,
			twentyToTwentyTwo: 27,
			twentyTwoToTwentyFour: 53,
		},
		dayBeforeYesterday: {
			twelveToTwo: 106,
			twoToFour: 33,
			fourToSix: 74,
			sixToEight: 139,
			eightToTen: 84,
			tenToTwelve: 130,
			twelveToFourteen: 38,
			FourteenToSixteen: 84,
			sixteenToEighteen: 56,
			eighteenToTwenty: 21,
			twentyToTwentyTwo: 150,
			twentyTwoToTwentyFour: 19,
		},
	},
	orderPrice: {
		thisYear: {
			jan: 58,
			feb: 129,
			mar: 2,
			apr: 19,
			may: 80,
			jun: 140,
			jul: 117,
			aug: 115,
			sep: 84,
			oct: 129,
			nov: 78,
			dec: 55,
		},
		lastYear: {
			jan: 42,
			feb: 100,
			mar: 150,
			apr: 29,
			may: 77,
			jun: 129,
			jul: 110,
			aug: 41,
			sep: 22,
			oct: 28,
			nov: 145,
			dec: 87,
		},
		thisMonth: {
			firstWeek: 26,
			secondWeek: 48,
			thirdWeek: 42,
			fourthWeek: 134,
		},
		lastMonth: {
			firstWeek: 55,
			secondWeek: 148,
			thirdWeek: 112,
			fourthWeek: 70,
		},
		thisWeek: {
			monday: 109,
			tuesday: 4,
			wednesday: 88,
			thursday: 21,
			friday: 116,
			saturday: 38,
			sunday: 51,
		},
		lastWeek: {
			monday: 37,
			tuesday: 62,
			wednesday: 50,
			thursday: 9,
			friday: 24,
			saturday: 133,
			sunday: 130,
		},
		today: {
			twelveToTwo: 146,
			twoToFour: 98,
			fourToSix: 80,
			sixToEight: 89,
			eightToTen: 113,
			tenToTwelve: 123,
			twelveToFourteen: 88,
			FourteenToSixteen: 121,
			sixteenToEighteen: 21,
			eighteenToTwenty: 109,
			twentyToTwentyTwo: 104,
			twentyTwoToTwentyFour: 50,
		},
		yesterday: {
			twelveToTwo: 68,
			twoToFour: 65,
			fourToSix: 117,
			sixToEight: 125,
			eightToTen: 86,
			tenToTwelve: 95,
			twelveToFourteen: 84,
			FourteenToSixteen: 56,
			sixteenToEighteen: 11,
			eighteenToTwenty: 150,
			twentyToTwentyTwo: 22,
			twentyTwoToTwentyFour: 126,
		},
		dayBeforeYesterday: {
			twelveToTwo: 53,
			twoToFour: 21,
			fourToSix: 111,
			sixToEight: 10,
			eightToTen: 102,
			tenToTwelve: 80,
			twelveToFourteen: 124,
			FourteenToSixteen: 27,
			sixteenToEighteen: 1,
			eighteenToTwenty: 139,
			twentyToTwentyTwo: 105,
			twentyTwoToTwentyFour: 133,
		},
	},
	visitor: {
		thisYear: {
			jan: 72,
			feb: 3,
			mar: 143,
			apr: 25,
			may: 90,
			jun: 53,
			jul: 105,
			aug: 72,
			sep: 56,
			oct: 101,
			nov: 49,
			dec: 100,
		},
		lastYear: {
			jan: 6,
			feb: 91,
			mar: 119,
			apr: 40,
			may: 43,
			jun: 66,
			jul: 58,
			aug: 55,
			sep: 59,
			oct: 67,
			nov: 103,
			dec: 74,
		},
		thisMonth: {
			firstWeek: 9,
			secondWeek: 107,
			thirdWeek: 2,
			fourthWeek: 86,
		},
		lastMonth: {
			firstWeek: 133,
			secondWeek: 103,
			thirdWeek: 119,
			fourthWeek: 34,
		},
		thisWeek: {
			monday: 49,
			tuesday: 55,
			wednesday: 15,
			thursday: 22,
			friday: 112,
			saturday: 11,
			sunday: 85,
		},
		lastWeek: {
			monday: 31,
			tuesday: 102,
			wednesday: 104,
			thursday: 17,
			friday: 147,
			saturday: 94,
			sunday: 93,
		},
		today: {
			twelveToTwo: 12,
			twoToFour: 113,
			fourToSix: 98,
			sixToEight: 34,
			eightToTen: 132,
			tenToTwelve: 122,
			twelveToFourteen: 10,
			FourteenToSixteen: 70,
			sixteenToEighteen: 9,
			eighteenToTwenty: 54,
			twentyToTwentyTwo: 71,
			twentyTwoToTwentyFour: 24,
		},
		yesterday: {
			twelveToTwo: 125,
			twoToFour: 2,
			fourToSix: 74,
			sixToEight: 75,
			eightToTen: 122,
			tenToTwelve: 102,
			twelveToFourteen: 3,
			FourteenToSixteen: 110,
			sixteenToEighteen: 102,
			eighteenToTwenty: 100,
			twentyToTwentyTwo: 25,
			twentyTwoToTwentyFour: 81,
		},
		dayBeforeYesterday: {
			twelveToTwo: 61,
			twoToFour: 110,
			fourToSix: 85,
			sixToEight: 115,
			eightToTen: 106,
			tenToTwelve: 114,
			twelveToFourteen: 13,
			FourteenToSixteen: 48,
			sixteenToEighteen: 31,
			eighteenToTwenty: 12,
			twentyToTwentyTwo: 134,
			twentyTwoToTwentyFour: 136,
		},
	},
	topProducts: [
		{
			id: 1,
			name: 'string',
			heroImage:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReyNj21BsjucUVU1cHF-rasiFD5nxb0vCeXw&usqp=CAU',
			total: 21,
		},
		{
			id: 3,
			name: 'nn',
			heroImage: '/abubekir//38b60727-61b7-48a4-9310-a455f5838df0',
			total: 51,
		},
		{
			id: 4,
			name: 'prod1',
			heroImage:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWVpbg-fcQnCJmPYtyO3_VRudFWHPiQVxuXA&usqp=CAU',
			total: 55,
		},
		{
			id: 6,
			name: 'safaskfopa',
			heroImage: '',
			total: 116,
		},
		{
			id: 17,
			name: 'lknklnlk',
			heroImage: '/abubekir//ab23b918-bc76-4f1b-9ee9-63b1331abad9',
			total: 22,
		},
	],
};

export const useHome = ({ analytics, filter, type }: IDashboardStats) => {
    const renderType = () => {
        switch (type) {
            case 0: return 'visitor';
            case 1: return 'orderPrice';
            case 2: return 'orderCount';
            default: return 'visitor';
        }
    }
	const sumTotal = useCallback(
		(): any => {
			if (!analytics) return 0;
			return Object.values(analytics[renderType()][filter]).reduce(
				(sum: any, value: any) => sum + value,
				0,
			);
		},
		[analytics, filter],
	);

	const renderTodayKeys = () =>
	Object.keys(analytics[renderType()].today).map((key: string) => {
	  switch (key) {
		case 'twelveToTwo':
		  return '12AM';
		case 'twoToFour':
		  return '2PM';
		case 'fourToSix':
		  return '4PM';
		case 'sixToEight':
		  return '6PM';
		case 'eightToTen':
		  return '8PM';
		case 'tenToTwelve':
		  return '10PM';
		case 'twelveToFourteen':
		  return '12AM';
		case 'FourteenToSixteen':
		  return '2AM';
		case 'sixteenToEighteen':
		  return '4AM';
		case 'eighteenToTwenty':
		  return '6AM';
		case 'twentyToTwentyTwo':
		  return '8AM';
		case 'twentyTwoToTwentyFour':
		  return '10AM';
		default:
		  return '';
	  }
	});
  
	const chartCategoryKeys = () => {
		if (!analytics) return [];
		switch (filter) {
			case 'today':
				return renderTodayKeys();
			case 'yesterday':
				return renderTodayKeys();
			case 'thisWeek':
				return Object.keys(analytics[renderType()].thisWeek);
			case 'thisMonth':
				return Object.keys(analytics[renderType()].thisMonth);
			case 'thisYear':
				return Object.keys(analytics[renderType()].thisYear);
			default:
				return [];
		}
	};

	const chartCategoryValues = () => {
		if (!analytics) return [];
		switch (filter) {
			case 'today':
				return [Object.values(analytics[renderType()].today), Object.values(analytics[renderType()].yesterday)];
			case 'yesterday':
				return [
					Object.values(analytics[renderType()].yesterday),
					Object.values(analytics[renderType()].dayBeforeYesterday),
				];
			case 'thisWeek':
				return [Object.values(analytics[renderType()].thisWeek), Object.values(analytics[renderType()].lastWeek)];
			case 'thisMonth':
				return [Object.values(analytics[renderType()].thisMonth), Object.values(analytics[renderType()].lastMonth)];
			case 'thisYear':
				return [Object.values(analytics[renderType()].thisYear), Object.values(analytics[renderType()].lastYear)];
			default:
				return [];
		}
	};

	return { sumTotal, chartCategoryKeys, chartCategoryValues };
};
