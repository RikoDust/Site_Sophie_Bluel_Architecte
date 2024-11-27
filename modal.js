// Fenetre modale

import { projectsData } from "./gallery.js";


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

    iconContainer.appendChild(deleteIcon);

    projectElement.appendChild(img);
    projectElement.appendChild(iconContainer);

    modalGallery.appendChild(projectElement);

  });
}






// Bouton "modifier" pour l'ouverture de la modale
const openModalButton = document.querySelector('.edit-link');

if (!openModalButton) {
  console.error("Le bouton 'Modifier' n'a pas été trouvé dans le DOM.");
} 


// Fonction pour créer et afficher la modale
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
  
    // Titre et contenu de la modale "vue 1"
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Galerie photo';
  
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-gallery';
  
    const actionButton = document.createElement('button');
    actionButton.className = 'add-photo';
    actionButton.textContent = 'Ajouter une photo';
  
    // Ajout des éléments dans la modale
    modal.appendChild(closeModalButton);
    modal.appendChild(modalTitle);
    modal.appendChild(modalContent);
    modal.appendChild(actionButton);
  
    // Ajout de la modale à l'overlay
    overlay.appendChild(modal);
  
    // Ajout de l'overlay au document
    document.body.appendChild(overlay);
  
    // Gestion de la fermeture
    closeModalButton.addEventListener('click', () => document.body.removeChild(overlay));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) document.body.removeChild(overlay);
    });


    // Appeler la fonction "displayProjectsInModal"
    displayProjectsInModal(projectsData);


  }
  




  // Ajouter un événement au bouton pour afficher la modale
  openModalButton.addEventListener('click', createModal);





