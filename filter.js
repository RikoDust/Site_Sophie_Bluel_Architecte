// Filtres

// Import de fonctions
import { projectsData,displayProjects } from "./gallery.js";


// Déclaration de l'emplacement dans le DOM
const container=document.getElementById('btn-container');

// Déclaration de la liste des boutons à générer
const categories = [
    { id: 'all', name:'Tous'},
    { id: 1, name:'Objets'},
    { id: 2, name:'Appartements'},
    { id: 3, name:'Hotels & Restaurants'}
];

// Génération des boutons en fonctions des categories déclarées
categories.forEach((category, index) => {
    const button = document.createElement('button');
    button.textContent = category.name;
    button.classList.add('btn'); // Ajouter class .btn
    button.setAttribute('data-id', category.id); // Attribue un id-data

    // Selectionne par defaut le boutons "Tous" (index 0)
    if (index === 0){
        button.classList.add('btn-selected'); // Ajoute la class "btn-selected" au bouton par defaut
    }

    button.addEventListener('click', ()=> {
        // Supprime la class "btn-selected" pour tous les boutons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('btn-selected');
        });

        // Ajoute .btn-selected au bouton cliqué
        button.classList.add('btn-selected'); 

        console.log(`Bouton ${category.name} cliqué`);  // Identifier le bouton cliqué dans la console

        // Filtrer les projets selon la catégorie
        const filteredProjects = 
            category.id === 'all' // Vérifie l'id actuellement selectionné
                ? projectsData // Opérateur ternaire pour verifier si "all" afficher, sinon afficher selon catégorie
                : projectsData.filter(project => project.categoryId === category.id); // Filtre les projets en fonction de l'id du boutons cliqué

        displayProjects(filteredProjects); // Affiche les projets filtrés selon catégorie

    });

    container.appendChild(button); // Ajoute les boutons au conteneur
});




