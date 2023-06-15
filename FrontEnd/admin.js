if (sessionStorage.getItem('token') !== null) {
    /**
     * CONSTANTES / VARIABLES
     */
    const divProjects = document.querySelector('.modif-display-projects');

    const logoutActive = document.getElementsByClassName('.logout-active')
    const logout = document.querySelector('.loginOut')


    /**
     * FUNCTION FOR USER ADMIN INTERFACE
     */

    // Display Admin Bar on top screen
    function displayEditBar() {
        const adminBar = document.querySelector(".admin-bar");
        adminBar.classList.add('editing');
        adminBar.classList.add('placing');
        
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

        const header = document.querySelector('header');
        header.style.marginTop = "80px";

        adminBar.appendChild(button);
        adminBar.appendChild(buttonPublish);
    }

    // Display links for open modal
    function displayEditLinks() {
        const button = document.createElement("button");
        button.className = "modif white modif-typo btn-modal";

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-pen-to-square";
        button.appendChild(icon);

        const text = document.createTextNode("Modifier");
        button.appendChild(text);

        const adminDivs = document.querySelectorAll(".admin");

        adminDivs.forEach(div => {
        div.appendChild(button.cloneNode(true));
        });
    }

    function betterAdminInterface() {
        document.getElementsByClassName('filters')[0].style.display = "none";
        divProjects.style.paddingTop = "0px";
    }


    /**
     * FUNCTION FOR LOGOUT
     */

    // Display logout link
    function logoutLink() {
        logout.innerText = "logout"
        logout.innerHTML = `<a href="#">logout</a>`
        logout.className = "logout-active"
    }

    // Logout by session clear
    function logoutSession() {
        sessionStorage.clear();
        window.location.href = 'index.html';
    }

    // Event for logout
    logout.addEventListener('click', logoutSession)


    /**
     * SCRIPT INITIALIZATION
     */

    function init() {
        displayEditBar()
        displayEditLinks()
        betterAdminInterface()
        logoutLink()
    }
    
    init()

}
