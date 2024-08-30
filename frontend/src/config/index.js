// import { getProductTypeIcon } from "./getIcons";

export const PRODUCT_TYPES = [
  {
    value: "shop_products",
    label: "Shop Products",
  },
  {
    value: "restaurant_products",
    label: "Restaurant Products",
  },
];

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  FEATURES: "/features",
  FAQ: "/faq",
  PRICING: "/pricing",
  CHECKOUT: "/checkout",
  CATEGORY: "/category",
  MENU: "/menu",
  ORDERS: "/orders",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PRODUCTHOME: "/p",
  PRODUCTDETAIL: "/p/details/:productId",
  BUSINESSHOME: "/b",
  MERCHANTHOME: "/m",
  MERCHANTDETAIL: "/m/details/:merchantId",
};

export const PRODUCT_SHORT_OPTIONS = [
  {
    value: "default",
    label: "Default",
  },
  {
    value: "a_z",
    label: "Name A to Z",
  },
  {
    value: "z_a",
    label: "Name Z to A",
  },
  {
    value: "price_asc",
    label: "Price Low to High",
  },
  {
    value: "price_desc",
    label: "Price High to Low",
  },
  {
    value: "rating_desc",
    label: "Rating High to Low",
  },
  {
    value: "date_desc",
    label: "Newest Arrivals",
  },
  {
    value: "date_asc",
    label: "Oldest Arrivals",
  },
];
