/**
 * CONSTANTES / VARIABLES
 */

const loginForm = document.getElementById('login-form')


/**
 * Essaye de te log l'user
 */
function tryTologUser (email, password) {

  const user = {email, password}

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  fetch('http://localhost:5678/api/users/login', options)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw alert('Email ou mot de passe incorrect')
      }
    })
    .then(user => {
      sessionStorage.setItem('token', user.token)
      window.location.href = 'index.html'
    })
}


/**
 * ADDEVENTLISTENERS 
 */

// Event for login form
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  tryTologUser(email, password)
});


/**
 * SCRIPT INITIALIZATION
 */