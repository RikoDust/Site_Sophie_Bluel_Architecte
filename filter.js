// Filtres

// Emplacement dans le DOM
const container=document.getElementById('btn-container');

// Liste des boutons à générer 
const categories = [
    { id: 1, name:'Tous'},
    { id: 2, name:'Objets'},
    { id: 3, name:'Appartements'},
    { id: 4, name:'Hotels & Restaurants'}
];

// Génération des boutons en fonctions des categories déclarées
categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category.name;
    button.classList.add('btn'); // Ajouter class .btn
    button.setAttribute('data-id', category.id); // Attribue un id-data

    button.addEventListener('click', ()=> {
        // Supprime la class "btn-selected" pour tous les boutons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('btn-selected');
        });

        // Ajoute .btn-selected au bouton cliqué
        button.classList.add('btn-selected'); 

        console.log(`Bouton ${category.name} cliqué`);  // Identifier le bouton cliqué dans la console
    });

    container.appendChild(button); // Ajoute les boutons au conteneur
});




