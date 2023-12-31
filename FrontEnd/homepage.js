/**
 * CONSTANTES / VARIABLES
 */
const filterAll = document.querySelector(".btn-all");
const filters = document.getElementById("filters");
const displayWork = document.querySelector(".gallery");

/**
 * FUNCTIONS FOR WORKS
 **/

/**
 * Communique avec l'API afin de récupérer les travaux stockés en base de données
 **/
function getWorksForHomepage(categoryId = null) {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
      if (categoryId === null) {
        displayWorksOnHomepage(works);
      } else {
        const newWorks = works.filter((work) => work.categoryId === categoryId);
        displayWorksOnHomepage(newWorks);
      }
      buttonFilterAllWorks();
    })
    .catch(() => {
      const emptyWorkModal = document.createElement("p");
      emptyWorkModal.className = "error-color";
      emptyWorkModal.classList.add("error-works-homepage");
      emptyWorkModal.innerText =
        "Une erreur est survenue lors de la récupération des travaux.";
      displayWork.append(emptyWorkModal);

      const buttonsFilters = document.querySelector(".filters");
      buttonsFilters.style.display = "none";
    });
}

/**
 * Affiche de manière dynamique les travaux récupérés via getWorksForHomepage() en manipulant le DOM
 **/
function displayWorksOnHomepage(works) {
  displayWork.innerHTML = "";

  if (works.length === 0) {
    const emptyWork = document.createElement("p");
    emptyWork.className = "empty-work";
    emptyWork.innerText = "Il n'y a aucun travail à présenter actuellement.";
    displayWork.append(emptyWork);
  } else {
    for (let i = 0; i < works.length; i++) {
      const figure = works[i];

      const workElementHomePage = document.createElement("figure");
      workElementHomePage.setAttribute("data-id", figure.id);

      const imageElement = document.createElement("img");
      imageElement.src = figure.imageUrl;
      const nameElement = document.createElement("figcaption");
      nameElement.innerText = figure.title;

      displayWork.appendChild(workElementHomePage);

      workElementHomePage.appendChild(imageElement);
      workElementHomePage.appendChild(nameElement);
    }
  }
}

/**
 * FUNCTIONS FOR CATEGORIES
 */

/**
 * Communique avec l'API afin de récupérer les catégories créées en base de données
 **/
function getCategoriesForHomepage() {
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      displayCategoriesOnHomepage(categories);
    })
    .catch((error) => {
      document.getElementsByClassName("filters")[0].style.display = "none";
      console.error(error);
    });
}

/**
 * Affiche de manière dynamique les catégories récupérées en base de données grâce à getCategoriesForHomepage()
 * Les catégories sont affichées sous forme de boutons de filtres, toutefois le bouton 'Tous' est créé en dur dans le HTML
 **/
function displayCategoriesOnHomepage(categories) {
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];

    const button = document.createElement("button");
    button.classList.add("filter");
    button.innerHTML = category.name;

    button.addEventListener("click", function () {
      getWorksForHomepage(categories[i].id);
    });

    filters.append(button);
  }
}

/**
 * ADDEVENTLISTENERS
 */

/**
 * Gère le bouton de filtre 'Tous'
 **/
function buttonFilterAllWorks() {
  filterAll.addEventListener("click", function () {
    getWorksForHomepage();
  });
}

/**
 * SCRIPT INITIALIZATION
 */

function init() {
  getWorksForHomepage();
  getCategoriesForHomepage();
}

init();
