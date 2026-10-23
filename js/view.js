import { state } from "./state.js";
import {
  getCustomerById,
  getProductById,
  getOrderTotal,
  getFilteredOrders
} from "./selectors.js";

function formatMoney(amount) {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD"
  }).format(amount);
}

export function showLoading() {
  const ordersContainer = document.getElementById("orders-container");
  if (ordersContainer) {
    ordersContainer.innerHTML = `
      <p class="text-white my-4">Chargement des commandes en cours...</p>
    `;
  }
}

export function render() {
  document.getElementById("customers-count").textContent =
    state.customers.length;

  document.getElementById("products-count").textContent =
    state.products.length;

  document.getElementById("orders-count").textContent =
    state.orders.length;

  const totalAmount = state.orders.reduce(
    (sum, order) => sum + getOrderTotal(order),
    0
  );

  document.getElementById("total-amount").textContent =
    formatMoney(totalAmount);

  const orders = getFilteredOrders();
  const ordersContainer = document.getElementById("orders-container");

  ordersContainer.innerHTML = "";

  orders.forEach(order => {
    const customer = getCustomerById(order.customerId);
    const total = getOrderTotal(order);

    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4 mb-4";

    card.innerHTML = `
      <div class="card h-100 shadow">
        <div class="card-body">
          <h5 class="card-title">
            Commande #${order.id}
          </h5>

          <p>
            <strong>Client :</strong>
            ${customer ? customer.name : "Inconnu"}
          </p>

          <p><strong>Date :</strong> ${order.date}</p>
          <p><strong>Statut :</strong> ${order.status}</p>

          <h5>${formatMoney(total)}</h5>

          <button
            type="button"
            class="btn btn-primary"
            data-order-id="${order.id}">
            Voir les détails
          </button>
        </div>
      </div>
    `;

    ordersContainer.appendChild(card);
  });

  if (orders.length === 0) {
    ordersContainer.innerHTML = `
      <div class="col-12">
        <p class="alert alert-warning">
          Aucune commande trouvée.
        </p>
      </div>
    `;
  }

  ordersContainer.querySelectorAll("[data-order-id]")
    .forEach(button => {
      button.addEventListener("click", () => {
        const orderId = Number(button.dataset.orderId);

        const order = state.orders.find(
          item => item.id === orderId
        );

        if (order) {
          showOrderDetailsModal(order);
        }
      });
    });
}

function showOrderDetailsModal(order) {
const customer = getCustomerById(order.customerId);

  const existingModal = document.getElementById("detailsModalWrapper");
  if (existingModal) {
    existingModal.remove();
  }

  const productsHTML = (order.items || [])
    .map(item => {
      const product = getProductById(item.productId);

      if (!product) {
        return `<p class="col-12 text-danger">Produit introuvable : ${item.productId}</p>`;
      }

      return `
        <div class="col-md-6 mb-3">
          <div class="card h-100 shadow-sm">
            <img
              src="${product.image}"
              class="card-img-top p-2"
              alt="${product.name}"
              style="height: 150px; object-fit: contain;"
              onerror="this.style.display='none'">

            <div class="card-body">
              <h6 class="card-title fw-bold">${product.name}</h6>
              <p class="mb-1"><strong>Catégorie :</strong> ${product.category}</p>
              <p class="mb-1"><strong>Prix unitaire :</strong> ${formatMoney(product.price)}</p>
              <p class="mb-1"><strong>Quantité :</strong> ${item.quantity}</p>
              <p class="mb-0 text-primary fw-bold"><strong>Sous-total :</strong> ${formatMoney(product.price * item.quantity)}</p>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  const modalWrapper = document.createElement("div");
  modalWrapper.id = "detailsModalWrapper";
  modalWrapper.innerHTML = `
    <div class="modal fade show d-block" id="detailsModal" tabindex="-1" style="background-color: rgba(0,0,0,0.5);" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" style="color:burlywood; font-style:italic;">Détails de la commande #${order.id}</h5>
            <button type="button" class="btn-close" id="close-modal-x" aria-label="Fermer"></button>
          </div>

          <div class="modal-body text-dark">
            <div class="row mb-3">
              <div class="col-md-6">
                <p><strong>Client :</strong> ${customer ? customer.name : "Inconnu"}</p>
                <p><strong>Ville :</strong> ${customer ? customer.city : "Non spécifiée"}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Date :</strong> ${order.date}</p>
                <p><strong>Statut :</strong> <span class="badge bg-secondary">${order.status}</span></p>
              </div>
            </div>

            <h5 class="border-bottom pb-2 mb-3" style="color:burlywood;">Produits commandés</h5>
            <div class="row">
              ${productsHTML || "<p>Aucun produit dans cette commande.</p>"}
            </div>

            <div class="text-end mt-3 border-top pt-2">
              <h4>Total : <span class="text-success">${formatMoney(getOrderTotal(order))}</span></h4>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="close-modal-btn">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalWrapper);

  const closeModal = () => {
    modalWrapper.remove();
  };

  document.getElementById("close-modal-x").addEventListener("click", closeModal);
  document.getElementById("close-modal-btn").addEventListener("click", closeModal);
}