/**
 * Helper function that returns URLSearchParams from the location.search
 * @param {object} location
 * @returns URLSearchParams object from location.search
 */
export const getQueryParamsFromLocation = (location) =>
  new URLSearchParams(location.search) || {};

/**
 * Helper function to find index of the given product id in cart items
 * @param {object} cartItems
 * @param {number} productId
 * @returns
 */
export const isProductOnCart = (cartItems, productId) =>
  cartItems.findIndex((item) => item.productId === productId) >= 0;
