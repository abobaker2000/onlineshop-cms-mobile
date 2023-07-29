import {
	CheckoutCartsApi,
	Configuration,
	CustomersApi,
	DraftOrdersApi,
	ProductsApi,
	ShopConfigApi,
} from 'abobaker2000-typescript-axios';
import axios from 'axios';

let ShopConfig = new ShopConfigApi(new Configuration());
let Products = new ProductsApi(new Configuration());
let Customers = new CustomersApi(new Configuration());
let DraftOrders = new DraftOrdersApi(new Configuration());
let Orders = new CheckoutCartsApi(new Configuration());
let Analytics: any;
// let Analytics = new AnalyticsApi(new Configuration());

export function configureAll(
	configuration: Configuration = new Configuration(),
	basePath: string | undefined = 'https://api.abofy.online',
): void {
	// Add your headers to the configuration
	configuration.basePath = basePath;
	axios.defaults.withCredentials = true;

	ShopConfig = new ShopConfigApi(configuration, basePath);
	Products = new ProductsApi(configuration, basePath);
	Customers = new CustomersApi(configuration, basePath);
	// Images = new ImagesApi(configuration, basePath);
	Analytics = new ProductsApi(configuration, basePath);
	DraftOrders = new DraftOrdersApi(configuration, basePath);
	Orders = new CheckoutCartsApi(configuration, basePath);
}

configureAll();

export { ShopConfig, Products, Customers, Analytics, DraftOrders, Orders };
