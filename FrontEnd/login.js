/**
 * CONSTANTES / VARIABLES
 */

const loginForm = document.getElementById("login-form");

/**
 * Récupère les informations du formulaire puis communique avec l'API afin de vérifier si l'utilisateur existe et si les données sont correctes pour la connexion
 * Si la connexion est autorisée par l'API, l'utilisateur récupère un token afin de l'authentifier pour les fonctions d'administration
 **/
function tryTologUser(email, password) {
  const user = { email, password };

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  fetch("http://localhost:5678/api/users/login", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status !== 200) {
          const loginErrorSelector = document.getElementById("login-form");
          const loginError = document.createElement("p");
          loginError.className = "login-error";
          loginError.innerText = "Erreur : identifiants inconnus";
          loginErrorSelector.append(loginError);
        }
      }
    })
    .then((user) => {
      sessionStorage.setItem("token", user.token);
      window.location.href = "index.html";
    });
}

/**
 * ADDEVENTLISTENERS
 */

/**
 * Récupère les informations du formulaire pour tryTologUser()
 */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  tryTologUser(email, password);
});

/**
 * SCRIPT INITIALIZATION
 */
