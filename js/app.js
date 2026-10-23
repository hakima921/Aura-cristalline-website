import { state } from "./state.js";
import { loadData } from "./dataService.js";
import { render, showLoading } from "./view.js";

async function init() {
  try {
    showLoading();
    await loadData();
    render();

    const searchInput = document.getElementById("search-name");
    if (searchInput) {
      searchInput.addEventListener("input", event => {
        state.filters.searchText = event.target.value;
        render();
      });
    }

    const statusFilter = document.getElementById("status-filter");
    if (statusFilter) {
      statusFilter.addEventListener("change", event => {
        state.filters.status = event.target.value;
        render();
      });
    }

    const categoryFilter = document.getElementById("category-filter");
    if (categoryFilter) {
      categoryFilter.addEventListener("change", event => {
        state.filters.category = event.target.value;
        render();
      });
    }

  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error);
  }
}

init();