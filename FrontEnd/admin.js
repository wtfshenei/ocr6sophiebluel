if (sessionStorage.getItem("token") !== null) {
  /**
   * CONSTANTES / VARIABLES
   */
  const divProjects = document.querySelector(".modif-display-projects");
  const logout = document.querySelector(".loginOut");

  /**
   * FUNCTION FOR USER ADMIN INTERFACE
   */

  /**
   * Modifie la homepage afin d'y créer la barre d'administration au top
   **/
  function displayEditBar() {
    const adminBar = document.querySelector(".admin-bar");
    adminBar.classList.add("editing");
    adminBar.classList.add("placing");

    const button = document.createElement("button");
    button.className = "black edit-typo btn-modal";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-pen-to-square black";
    button.appendChild(icon);

    const text = document.createTextNode("Mode édition");
    text.className = "edit-typo";
    button.appendChild(text);

    const buttonPublish = document.createElement("button");
    buttonPublish.className = "publish";

    const textPublish = document.createTextNode("Publier les changements");
    buttonPublish.appendChild(textPublish);

    const header = document.querySelector("header");
    header.style.marginTop = "80px";

    adminBar.appendChild(button);
    adminBar.appendChild(buttonPublish);
  }

  /**
   * Fait apparaître les liens de modifications permettant d'ouvrir la modale
   **/
  function displayEditLinks() {
    const button = document.createElement("button");
    button.className = "modif white modif-typo btn-modal";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-pen-to-square";
    button.appendChild(icon);

    const text = document.createTextNode("Modifier");
    button.appendChild(text);

    const adminDivs = document.querySelectorAll(".admin");

    adminDivs.forEach((div) => {
      div.appendChild(button.cloneNode(true));
    });
  }

  /**
   * Fait disparaître les boutons de filtres et modifie le padding top de la section projets pour un meilleur rendu visuel
   **/
  function betterAdminInterface() {
    // document.getElementsByClassName("filters")[0].style.display = "none";
    divProjects.style.paddingTop = "0px";
  }

  /**
   * FUNCTION FOR LOGOUT
   */

  /**
   * Transforme le lien Login en Logout
   **/
  function logoutLink() {
    logout.innerText = "logout";
    logout.innerHTML = `<a href="#">logout</a>`;
    logout.className = "logout-active";
  }

  /**
   * Supprime le stockage de session afin de supprimer le token de l'utilisateur et ainsi le déconnecter
   **/
  function logoutSession() {
    sessionStorage.clear();
    window.location.href = "index.html";
  }

  /**
   * Permet à l'utilisateur de se déconnecter via logoutSession() en cliquant sur le lien 'logout' créé par logoutLink()
   */
  logout.addEventListener("click", logoutSession);

  /**
   * SCRIPT INITIALIZATION
   */

  function init() {
    displayEditBar();
    displayEditLinks();
    betterAdminInterface();
    logoutLink();
  }

  init();
}
