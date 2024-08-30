import { PRODUCT_TYPES } from ".";

import { IoRestaurantSharp } from "react-icons/io5";
import { AiFillShop } from "react-icons/ai";

export const getProductTypeIcon = (value) => {
  switch (value) {
    case PRODUCT_TYPES[0].value:
      return <AiFillShop />;
    case PRODUCT_TYPES[1].value:
      return <IoRestaurantSharp />;
    default:
      return null;
  }
};
