/**
 * CONSTANTES / VARIABLES
 */
let works = []
const filterAll = document.querySelector(".btn-all")
const filters = document.getElementById('filters')


/**
 * FUNCTIONS FOR WORKS 
 */

// Fetch Works
function getWorksForHomepage() {
    fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(arrayWorks => {
        return works = arrayWorks
      })
      .then(() => {
        displayWorksOnHomepage(works)
        buttonFilterAllWorks()
      })
      .catch(error => console.log(error));
}

// Display Works
function displayWorksOnHomepage(works) {
    for (let i = 0; i < works.length; i++) {

        const figure = works[i];

        const displayWork = document.querySelector(".gallery");

        const workElementHomePage = document.createElement("figure");
        workElementHomePage.setAttribute('data-id', figure.id);

        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const nameElement = document.createElement("figcaption");
        nameElement.innerText = figure.title;

        displayWork.appendChild(workElementHomePage);

        workElementHomePage.appendChild(imageElement);
        workElementHomePage.appendChild(nameElement);
    }
}


/**
 * FUNCTIONS FOR CATEGORIES
 */

// Fetch Categories
function getCategoriesForHomepage() {
    fetch('http://localhost:5678/api/categories')
     .then(response => response.json())
     .then(categories => {
        displayCategoriesOnHomepage(categories)
     })
     .catch(error => console.log(error))
}

// Display Categories
function displayCategoriesOnHomepage(categories) {
    for ( let i = 0; i < categories.length ; i++ ) {
        const category = categories[i];

        const button = document.createElement('button')
        button.classList.add('filter')
        button.innerHTML = category.name

        button.addEventListener("click", function () {
            const workCategory = works.filter(function (works) {
                return works.categoryId === categories[i].id
            })
            document.querySelector('.gallery').innerHTML = ""
            displayWorksOnHomepage(workCategory)
        });

        filters.append(button)
    }
}


/**
 * ADDEVENTLISTENERS 
 */

// For display all works
function buttonFilterAllWorks() {    
    filterAll.addEventListener("click", function () {
        const worksAll = works.filter(function (work) {
            return work.id;
        });
        document.querySelector(".gallery").innerHTML = "";
        displayWorksOnHomepage(worksAll);
    });
}


/**
 * SCRIPT INITIALIZATION
 */

function init() {
    getWorksForHomepage()
    getCategoriesForHomepage()
}

init()