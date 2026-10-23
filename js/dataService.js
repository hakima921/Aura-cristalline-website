import { state } from "./state.js";

export async function loadData() {
  const errorContainer = document.getElementById("error-container");

  if (errorContainer) {
    errorContainer.classList.add("d-none");
    errorContainer.textContent = "";
  }

  try {
  const response = await fetch("./data/customers.json");
  if (!response.ok) {
  throw new Error("Impossible de charger les clients (code: " + response.status + ")");
  }
  state.customers = await response.json();

const productsResponse = await fetch("./data/products.json");
if (!productsResponse.ok) {
throw new Error("Impossible de charger les produits (code: " + productsResponse.status + ")");
}
state.products = await productsResponse.json();

const ordersResponse = await fetch("./data/orders.json");
if (!ordersResponse.ok) {
throw new Error("Impossible de charger les commandes (code: " + ordersResponse.status + ")");
}
state.orders = await ordersResponse.json();

} catch (error) {
console.error("Erreur de chargement :", error);

if (errorContainer) {
errorContainer.textContent =
"Erreur lors du chargement des données. Veuillez vérifier que vous utilisez un serveur local (Live Server) : " + error.message;
errorContainer.classList.remove("d-none");
}
}
}