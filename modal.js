// Fenetre modale

// Bouton "modifier" pour l'ouverture de la modale
const openModalButton = document.querySelector('.edit-link');

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
  
    // Gestion des événements de fermeture
    closeModalButton.addEventListener('click', () => document.body.removeChild(overlay));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) document.body.removeChild(overlay);
    });
  }
  
  // Ajouter un événement au bouton pour afficher la modale
  openModalButton.addEventListener('click', createModal);





