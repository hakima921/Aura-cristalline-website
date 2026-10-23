import { state } from "./state.js";

export function getCustomerById(customerId) {
return state.customers.find(customer => customer.id === customerId);
}

export function getProductById(productId) {
return state.products.find(product => product.id === productId);
}

export function getOrderById(orderId) {
return state.orders.find(order => order.id === orderId);
}

export function getOrderTotal(order) {
if (!order || !order.items) return 0;
return order.items.reduce((total, item) => {
const product = getProductById(item.productId);
const price = product ? product.price : 0;
return total + price * item.quantity;
}, 0);
}

export function getTotalAmount() {
return state.orders.reduce((total, order) => {
return total + getOrderTotal(order);
}, 0);
}

export function getOrdersByStatus(status) {
return state.orders.filter(order => order.status === status);
}

export function getOrdersByCustomerName(name) {
return state.orders.filter(order => {
const customer = getCustomerById(order.customerId);
const customerName = customer ? customer.name : "";
return customerName.toLowerCase().includes(name.toLowerCase());
});
}

export function getOrdersByCategory(category) {
return state.orders.filter(order => {
return order.items.some(item => {
const product = getProductById(item.productId);
return product && product.category === category;
});
});
}

export function getFilteredOrders() {
return state.orders.filter(order => {
const customer = getCustomerById(order.customerId);
const customerName = customer ? customer.name : "";

    const matchesName = customerName
      .toLowerCase()
      .includes(state.filters.searchText.toLowerCase());

    const matchesStatus =
      state.filters.status === "" || order.status === state.filters.status;

    const matchesCategory =
      state.filters.category === "" ||
      order.items.some(item => {
        const product = getProductById(item.productId);
        return product && product.category === state.filters.category;
      });

    return matchesName && matchesStatus && matchesCategory;
  });
}