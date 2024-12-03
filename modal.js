// Fenetre modale

// Imports
import { fetchProjects, projectsData } from "./gallery.js";

// Fonction pour récupérer les catégories via l'api
async function fetchCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des categories : ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories : ", error);
    return []; // Retourner un tableua vide en cas d'erreur
  }
}



// Fonction pour afficher les projets dans la modale
function displayProjectsInModal(Projects) {
  const modalGallery = document.querySelector('.modal-gallery');
  modalGallery.innerHTML="";

  Projects.forEach(project => {
    const projectElement = document.createElement('figure');
    projectElement.className = 'modal-project';

    const img = document.createElement('img');
    img.src = project.imageUrl;
    img.alt = project.title;

    // Ajout 'bouton' icon "delete"
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';
    // Ajout icon "trash"
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa-solid fa-trash-can delete-icon';

    // Associer l'id au bouton "delete"
    deleteIcon.setAttribute('data-id', project.id);

    // Creation des élements
    iconContainer.appendChild(deleteIcon);

    projectElement.appendChild(img);
    projectElement.appendChild(iconContainer);

    modalGallery.appendChild(projectElement);

  });
}


// Récupere le token de sessionStorage
const token = sessionStorage.getItem('token');



// Bouton "modifier" pour l'ouverture de la modale
const openModalButton = document.querySelector('.edit-link');

if (!openModalButton) {
  console.error("Le bouton 'Modifier' n'a pas été trouvé dans le DOM.");
} 



// ****** Fonction pour créer et afficher la modale ******
function createModal() {
  // Création de l'overlay
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  // Création de la modale
  const modal = document.createElement('div');
  modal.className = 'modal';

  // Bouton de fermeture
  const closeModalButton = document.createElement('button');
  closeModalButton.className = 'close-modal';
  closeModalButton.innerHTML = '&times;';




  // ---- Premiere vue ----
  const firstView = document.createElement('div');
  firstView.className = 'modal-view first-view';

  // Titre 1ere vue
  const modalTitle = document.createElement('h2');
  modalTitle.textContent = 'Galerie photo';
  // Gallerie modale
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-gallery';
  // Bouton "ajouter photo"
  const actionButton = document.createElement('button');
  actionButton.className = 'add-photo';
  actionButton.textContent = 'Ajouter une photo';

  // -- Gestion affichage / 1ere vue modal --
  firstView.appendChild(modalTitle);
  firstView.appendChild(modalContent);
  firstView.appendChild(actionButton);
  




  // ---- Deuxieme vue ----
  const secondView = document.createElement('div');
  secondView.className = 'modal-view second-view';
  secondView.style.display = 'none';

  // En tete avec bouton retour
  const secondViewHeader = document.createElement('div');
  secondViewHeader.className = 'second-view-header';
  // Bouton retour
  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>'; // inclu icon fontAwesome
  backButton.addEventListener('click', () => {
    secondView.style.display = 'none';
    firstView.style.display = 'block';
  });

  // Titre 2eme vue
  const secondViewTitle = document.createElement('h2');
  secondViewTitle.textContent = 'Ajout photo';

  // --- Espace ajout de photo ---
  const addPhotoContainer = document.createElement('div');
  addPhotoContainer.className = 'add-photo-container';

  // Icone image
  const iconPhoto = document.createElement('i');
  iconPhoto.className = 'icon-image';
  iconPhoto.innerHTML = '<i class="fa-regular fa-image"></i>';

  // Input pour charger photo
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.className = 'file-input';
  fileInput.id = 'photo-file';
  fileInput.style.display = 'none'; // Cache l'input

  // Bouton + ajouter photo
  const addPhotoButton = document.createElement('button');
  addPhotoButton.className = 'add-photo-btn';
  addPhotoButton.textContent = '+ Ajouter photo';

  // Gestion click 
  addPhotoButton.addEventListener('click', () => {
    fileInput.click();// Simule le click sur input caché
  });


  // Zone d'aperçu de la photo
  const photoPreview = document.createElement('div');
  photoPreview.className = 'photo-preview';

  // Mise a jour apercu fichier selectionné
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Masque element pour visuel photo
        iconPhoto.style.display = 'none';
        addPhotoButton.style.display = 'none';
        imageFormat.style.display = 'none';

        photoPreview.innerHTML = ''; // Vide l'apercu precedent
        // Création visualisation
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'Previsualisation';
        img.style.width = 'auto';
        img.style.height = '100%';
        
        addPhotoContainer.appendChild(img);

      };
      reader.readAsDataURL(file); // Lit le fichier en tant qu'URL
    }
  });

  
  // <p> format et taille image
  const imageFormat = document.createElement('p');
  imageFormat.className = 'image-format';
  imageFormat.textContent = 'jpg, png : 4mo max';

  // Zone ajout photo
  addPhotoContainer.appendChild(iconPhoto);
  addPhotoContainer.appendChild(fileInput);
  addPhotoContainer.appendChild(addPhotoButton);
  addPhotoContainer.appendChild(photoPreview);
  addPhotoContainer.appendChild(imageFormat);




  // -- Espace formulaire --
  const formContainer = document.createElement('div');
  formContainer.className = 'form-container';
  // Ajout formulaire
  const form = document.createElement('form');
  form.className = 'add-form'

  // Titre label 
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Titre';
  titleLabel.setAttribute('for', 'photo-title');
  // Input Titre
  const inputTitle = document.createElement('input');
  inputTitle.type = 'text';
  inputTitle.name = 'title';
  inputTitle.id = 'photo-title';

  // Category label
  const categoryLabel = document.createElement('label');
  categoryLabel.textContent = 'Catégorie';
  categoryLabel.setAttribute('for', 'photo-category');
  // Select category (menu deroulant)
  const categorySelect = document.createElement('select');
  categorySelect.name = 'category';
  categorySelect.id = 'photo-category';

 
  // Option vide comme placeholder
  const placeholderOption = document.createElement('option');
  placeholderOption.value = '';
  placeholderOption.textContent = '';
  placeholderOption.selected = true // Définit option par defaut
  placeholderOption.disabled = true // Empeche la séléction de l'option vide
  categorySelect.appendChild(placeholderOption);



  // Création dynamique des options du menu "select" 
  fetchCategories().then(categories => {
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  });



  // Bouton Submit "Valider"
  const submitButton = document.createElement('button');
  submitButton.className = 'submit-button';
  submitButton.textContent = 'Valider';

  // Ajoute gestion submit pour soumettre le formulaire
  submitButton.addEventListener('click', ()=> {
    form.requestSubmit();
  });


  // Ecoute sur le formulaire
  form.addEventListener('submit', async (event)=> {
    event.preventDefault();

const formData = new FormData(form);
formData.append('file', fileInput.files[0]);

try {
  const response = await fetch('http://localhost:5678/api/works', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la création du projet');
  }

  console.log('Projet créé avec succès');

} catch (error) {
  console.error("Une erreur s'est produite :", error);
  }
});




  // -- Gestion affichage / 2eme vue modal --

  // En-tete 2eme vue
  secondViewHeader.appendChild(backButton);
  secondViewHeader.appendChild(secondViewTitle);

  // Regroupement formulaire
  form.appendChild(titleLabel);
  form.appendChild(inputTitle);
  form.appendChild(categoryLabel);
  form.appendChild(categorySelect);

  formContainer.appendChild(form);

  // Ajout element sur 2eme vue
  secondView.appendChild(secondViewHeader);
  secondView.appendChild(addPhotoContainer);
  secondView.appendChild(formContainer);
  secondView.appendChild(submitButton);



  // Ajout des deux vues dans la modal
  modal.appendChild(closeModalButton);
  modal.appendChild(firstView);
  modal.appendChild(secondView);




    // Ajout de la modale à l'overlay
    overlay.appendChild(modal);
    // Ajout de l'overlay au document
    document.body.appendChild(overlay);
  

    // Gestion de la fermeture
    closeModalButton.addEventListener('click', () => document.body.removeChild(overlay));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) document.body.removeChild(overlay);
    });


    // Gestion transition vue 1 - vue 2
    actionButton.addEventListener('click', ()=> {
      firstView.style.display = 'none';
      secondView.style.display = 'block';
    });


    // Appeler la fonction "displayProjectsInModal"
    displayProjectsInModal(projectsData);
  



    // EventListenner pour boutons "Delete"
    const modalGallery = document.querySelector('.modal-gallery');
    modalGallery.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-icon')) { // Ecoute tout les élements avec la class "delete-icon"
        const projectId = event.target.dataset.id; // Récupére l'ID 
        console.log(`Supprimer le projet avec l'id: ${projectId}`); // identification du projet a supprimer dans la console
        
        // Ajouter la fonction pour envoyer la requete DELETE vers l'api
        fetch(`http://localhost:5678/api/works/${projectId}`, {
          method: 'DELETE',
          headers: {
            'content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },
        })
          .then((response) =>{
            if (response.ok) {
              console.log(`Projet avec Id ${projectId} supprimé.`); // Confirmation projet supprimé dans la console

              return fetchProjects(); // Misa a jour affichage projets

            } else {
              throw new error(`Erreur lors de la supression du projet ${projectId}`);
            }
          })
          .then((updateProjects)=> {
            displayProjectsInModal(updateProjects);
          })
          .catch((error)=> {
            console.error("Une erreur s'est produite :", error);
          });
      }
    });
  }
  




  // Ajouter un événement au bouton pour afficher la modale
  openModalButton.addEventListener('click', createModal);





