import cartService from "./cartService";
import customerService from "./customerService";
import menuService from "./menuService";

import { httpRequest } from "./provider/httpRequest";

export const $cartService = cartService(httpRequest);
export const $customerService = customerService(httpRequest);
export const $menuService = menuService(httpRequest);
