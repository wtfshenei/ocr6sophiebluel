if (sessionStorage.getItem('token') !== null) {
    /**
     * CONSTANTES / VARIABLES
     */
    let worksModal = []
    let categoriesModal = []

    /** 
     * FUNCTIONS FOR CREATE MODALS
    */
    
    function createModal() {
        let modalDiv = document.querySelector('.modal');
        
        if (!modalDiv) {
            const modalLocation = document.querySelector('main');
        
            modalDiv = document.createElement('div');
            modalDiv.className = 'modal modal-bg-color';
            modalLocation.appendChild(modalDiv);
        }
    
        const modalWrapper = document.createElement('div');
        modalWrapper.className = 'modal-wrapper modal-bg-color modal-test';
        modalDiv.appendChild(modalWrapper);

        getWorksForModal()
    
        const modalIcon = document.createElement('i');
        modalIcon.className = 'fa-solid fa-xmark close-modale';
        modalWrapper.appendChild(modalIcon);
    
        const modalTitle = document.createElement('h2');
        modalTitle.className = 'modal-title white';
        modalTitle.textContent = 'Galerie photo';
        modalWrapper.appendChild(modalTitle);
    
        const modalGallery = document.createElement('div');
        modalGallery.className = 'gallery2 white';
        modalWrapper.appendChild(modalGallery);
    
        const modalBorder = document.createElement('span');
        modalBorder.className = 'border';
        modalWrapper.appendChild(modalBorder);
    
        const modalButton = document.createElement('input');
        modalButton.className = 'btn-photos';
        modalButton.type = 'submit';
        modalButton.value = 'Ajouter une photo';
        modalWrapper.appendChild(modalButton);
    
        const modalDeleteGallery = document.createElement('button');
        modalDeleteGallery.className = 'link-supp-gallery';
        modalDeleteGallery.textContent = 'Supprimer la galerie';
        modalWrapper.appendChild(modalDeleteGallery);

        modalDeleteGallery.addEventListener('click', deleteAllWorks);

        const modalUploadPictures = document.querySelector('.btn-photos');
        modalUploadPictures.addEventListener('click', () => {
            const currentModal = document.querySelector('.modal-wrapper')
            currentModal.remove()
            createModalUpload()
        });

        const closeButton = document.querySelector('.close-modale');
        closeButton.addEventListener('click', closeModal);

        // const modalZone = document.querySelector('.modal');
        // modalZone.addEventListener('click', (e) => {
        //     if (!e.target.closest('.modal-wrapper')) { closeModal(); }
        // });
    }
    
    function createModalUpload() {
        outsideModal()  

        const modalDivUpload = document.querySelector('.modal');
      
        const modalUploadWrapper = document.createElement('div');
        modalUploadWrapper.className = 'modal-wrapper-upload modal-bg-color modal-test'
        modalDivUpload.appendChild(modalUploadWrapper);

        const modalUploadReturn = document.createElement('i');
        modalUploadReturn.className = 'fa-solid fa-arrow-left btn-return';
        modalUploadWrapper.appendChild(modalUploadReturn);

        const modalUploadIcon = document.createElement('i');
        modalUploadIcon.className = 'fa-solid fa-xmark close-modale-upload';
        modalUploadWrapper.appendChild(modalUploadIcon);

        const modalUploadTitle = document.createElement('h2');
        modalUploadTitle.className = 'modal-title white';
        modalUploadTitle.textContent = 'Ajout photo';
        modalUploadWrapper.appendChild(modalUploadTitle);

        const modalUploadObject = document.createElement('div');
        modalUploadObject.id = 'picture-box';
        modalUploadWrapper.appendChild(modalUploadObject);

        const modalUploadImg = document.createElement('img');
        modalUploadImg.id = 'file-img';
        modalUploadImg.src = '';
        modalUploadObject.appendChild(modalUploadImg);

        const modalUploadIconImg = document.createElement('img');
        modalUploadIconImg.className = 'icon-image';
        modalUploadIconImg.src = './assets/icons/image.png';
        modalUploadObject.appendChild(modalUploadIconImg);

        const modalUploadObjectButton = document.createElement('label');
        modalUploadObjectButton.className = 'upload-file';
        modalUploadObject.appendChild(modalUploadObjectButton);

        const modalUploadObjectText = document.createTextNode('+ Ajouter photo');
        modalUploadObjectButton.appendChild(modalUploadObjectText);

        const modalUploadFileInput = document.createElement('input');
        modalUploadFileInput.type = 'file';
        modalUploadFileInput.id = 'file-upload';
        modalUploadFileInput.style.display = 'none';
        modalUploadObjectButton.appendChild(modalUploadFileInput);

        const modalUploadInfo = document.createElement('span');
        modalUploadInfo.className = 'upload-file-info';
        modalUploadInfo.innerText = 'jpg, png : 4mo max';
        modalUploadObject.appendChild(modalUploadInfo); 

        const modalUploadTitleObject = document.createElement('h3');
        modalUploadTitleObject.className = 'white h3-modal'
        modalUploadTitleObject.textContent = 'Titre';
        modalUploadWrapper.appendChild(modalUploadTitleObject);

        const modalUploadInputTitleObject = document.createElement('input');
        modalUploadInputTitleObject.className = 'input-modal object-title';
        modalUploadInputTitleObject.type = 'text';
        modalUploadWrapper.appendChild(modalUploadInputTitleObject);

        const modalUploadTitleCat = document.createElement('h3');
        modalUploadTitleCat.className = 'white h3-modal'
        modalUploadTitleCat.textContent = 'Catégorie';
        modalUploadWrapper.appendChild(modalUploadTitleCat);

        const modalUploadCatObject = document.createElement('select');
        modalUploadCatObject.className = 'white input-modal object-category';
        modalUploadWrapper.appendChild(modalUploadCatObject);
        optionsForModalUpload(categoriesModal);

        const modalUploadBorder = document.createElement('span');
        modalUploadBorder.className = 'border';
        modalUploadWrapper.appendChild(modalUploadBorder);
    
        const modalUploadButton = document.createElement('input');
        modalUploadButton.className = 'btn-photos btn-upload';
        modalUploadButton.type = 'submit';
        modalUploadButton.value = 'Valider';
        modalUploadWrapper.appendChild(modalUploadButton);

        checkInputFields();
        modalUploadFileInput.addEventListener('input', checkInputFields);
        modalUploadInputTitleObject.addEventListener('input', checkInputFields);

        const imagePreview = document.getElementById('file-upload');
        imagePreview.addEventListener('change', previewFile);
        
        const uploadItem = document.querySelector('.btn-upload');
        uploadItem.addEventListener('click', uploadWork);
        
        const buttonReturn = document.querySelector('.btn-return');
        buttonReturn.addEventListener('click', () => {
            const currentModal = document.querySelector('.modal-wrapper-upload')
            currentModal.remove()
            createModal()
        })

        const closeButtonModal = document.querySelector('.close-modale-upload');
        closeButtonModal.addEventListener('click', closeModal);

        // const modalZone = document.querySelector('.modal');
        // modalZone.addEventListener('click', (e) => {
        //     if (!e.target.closest('.modal-wrapper-upload')) { closeModal(); }
        // });
    }
    
    /**
     * FUNCTIONS FOR MODALS MANAGEMENT
     */

    function displayWorksOnModal(worksModal) {
        outsideModal()
      
        const displayWork = document.querySelector('.gallery2');
        
        for (let i = 0; i < worksModal.length; i++) {
          const figure = worksModal[i];
    
          const workElement = document.createElement('div');
          workElement.className = 'work-container';
          workElement.setAttribute('data-id', figure.id);
    
          const imageElement = document.createElement('img');
          imageElement.src = figure.imageUrl;
          imageElement.className = 'work-image';
    
          const deleteIcon = document.createElement('i');
          deleteIcon.className = 'fa-regular fa-trash-can trash-placing';
          deleteIcon.setAttribute('data-id', figure.id);
    
          const modifElement = document.createElement('p');
          modifElement.innerHTML = '<a href="#">éditer</a>';
    
          workElement.appendChild(imageElement);
          workElement.appendChild(deleteIcon);
          workElement.appendChild(modifElement);
    
          deleteIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            const workId = e.currentTarget.getAttribute('data-id');
            deleteWork(workId);
          });
    
          displayWork.appendChild(workElement);
        }
    }

    function deleteAllWorks() {
        const workElements = document.querySelectorAll('.work-container');
      
        workElements.forEach(workElement => {
          const workId = workElement.getAttribute('data-id');
          deleteWork(workId);
        });
    }
    
    function openModal() {
        if (document.querySelectorAll('.btn-modal')) {
            const buttonsModal = document.querySelectorAll('.btn-modal');
            buttonsModal.forEach(button => {
                button.addEventListener('click', () => {
                    createModal();
                });
            });
        } else if (document.querySelector('.btn-return')) {
            createModal()
        }
    }
    
    function closeModal() {
        const modal = document.querySelector('.modal');
        const modalWorks = document.querySelector('.modal-wrapper');
        const modalUploadWrapper = document.querySelector('.modal-wrapper-upload');
        if (modalWorks || modalUploadWrapper) {
          modal.remove();
        }
    }
        
      function outsideModal() {  
        if (document.querySelector('.modal')) {
          const modalZone = document.querySelector('.modal')

          modalZone.addEventListener('click', (e) => {
            if (!e.target.closest('.modal-test')) { closeModal(); }
          });
        }
      }

    
    /**
     * FUNCTIONS FETCH
     */

    function getWorksForModal() {
        fetch('http://localhost:5678/api/works')
          .then(response => response.json())
          .then(arrayWorks => {
            return worksModal = arrayWorks
          })
          .then(() => {
            displayWorksOnModal(worksModal)
          })
          .catch(error => console.log(error));
    }

    function getCategoriesForModal() {
        fetch('http://localhost:5678/api/categories')
            .then(response => response.json())
            .then(arrayCategories => {
                optionsForModalUpload(categoriesModal)
                return categoriesModal = arrayCategories
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de la récupération des catégories :', error);
            });
    }

    function deleteWork(workId) {
        const deleteUrl = `http://localhost:5678/api/works/${workId}`;
        const token = sessionStorage.getItem('token');
    
        fetch(deleteUrl, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            if (response.ok) {
              console.log('Le travail a été supprimé avec succès.');
              const element = document.querySelector(`.work-container[data-id="${workId}"]`);
              element.remove();
              const elementHomePage = document.querySelector(`figure[data-id="${workId}"]`);
              elementHomePage.remove();
            } else {
              console.log('Une erreur s\'est produite lors de la suppression du travail.');
            }
          })
          .catch(error => {
            console.log('Une erreur s\'est produite lors de la suppression du travail :', error);
          });
    }

    function uploadWork() {
        const uploadUrl = 'http://localhost:5678/api/works/';
        const token = sessionStorage.getItem('token');
      
        const fileInput = document.getElementById('file-upload');
        const image = fileInput.files[0];
      
        const titleInput = document.querySelector('.object-title');
        const title = titleInput.value;
      
        const categorySelect = document.querySelector('.object-category');
        const category = categorySelect.value;
      
        if (image && title && category) {
          const formData = new FormData();
          formData.append('image', image);
          formData.append('title', title);
          formData.append('category', category);
      
          const uploadOptions = {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: formData
          };
      
          fetch(uploadUrl, uploadOptions)
            .then(response => {
              if (response.ok) {
                console.log('Le fichier a été téléchargé avec succès !');
                const modalUploadWrapper = document.querySelector('.modal-wrapper-upload')
                modalUploadWrapper.remove()
              } else {
                console.error('Une erreur s\'est produite lors du téléchargement du fichier.');
              }
                return response.json()
            })
            .then (dataUpload => {
              const itemId = [dataUpload.id]
              const homePage = document.querySelector('.gallery');
              const imageLocation = document.createElement('figure');
              imageLocation.setAttribute('data-id', itemId);
              const uploadedImage = document.createElement('img');
              uploadedImage.src = URL.createObjectURL(image);
              const uploadedImageTitle = document.createElement('figcaption');
              uploadedImageTitle.innerText = title;
              homePage.appendChild(imageLocation);
              imageLocation.appendChild(uploadedImage);
              imageLocation.appendChild(uploadedImageTitle);
            })
            .then(() => {
                createModal()
            })
            .catch(error => {
              console.error('Une erreur s\'est produite lors de l\'envoi de la requête :', error);
            });
        } else {
          if (!image) {
            console.error('Aucun fichier sélectionné.')
            const modalUploadInputTitleObject = document.querySelector('.input-modal')
            modalUploadInputTitleObject.classList.add('error')
          }
          if (!title) {
            console.error('Veuillez saisir un titre.');
          }
        }
      }


    /**
     * FUNCTIONS FOR UPLOAD
     */

    // Options for category choice upload form
    function optionsForModalUpload(categoriesModal) {    
        categoriesModal.forEach(category => {
            const modalUploadCatObjectTarget = document.querySelector('select')
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            modalUploadCatObjectTarget.appendChild(option);
        });
    }

    function previewFile() {
        const preview = document.querySelector('#file-img');
        let file = document.querySelector('#file-upload').files[0];

        console.log(file)
        const reader = new FileReader();

        reader.addEventListener("load", function() {
            const previewLocation = document.querySelector('#picture-box')
            const previewImgIcon = document.querySelector('.icon-image')
            const previewFile = document.querySelector('.upload-file')
            const previewInfo = document.querySelector('.upload-file-info')

            previewImgIcon.classList.add('hidden')
            previewFile.classList.add('hidden')
            previewInfo.classList.add('hidden')

            preview.id = '.active'
            previewLocation.append(preview)
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function checkInputFields() {
        const modalUploadFileInput = document.getElementById('file-upload');
        let modalUploadInputTitleObject = document.querySelector('.input-modal');
        
        const fileInputValue = modalUploadFileInput.value;
        const titleInputValue = modalUploadInputTitleObject.value;
        const button = document.querySelector('.btn-photos')
        
        if (fileInputValue === '' || titleInputValue === '') {
            button.disabled = true;
            button.classList.add('disabled')
        } else {
            button.disabled = false;
            button.classList.remove('disabled')
        }
    }


    /**
     * SCRIPT INITIALIZATION
     */

    function init() {
        getCategoriesForModal()
        openModal()
    }
    
    init()

}