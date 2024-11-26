// Filtres

// Import de fonctions
import { projectsData, displayProjects, fetchProjects } from "./gallery.js";

// attendre les données avant filtrage
async function initializeFilters() {
    // Attend la recupération des données
    await fetchProjects();


    // Fonction pour extraire Id et Category des Data
    function getUniqueCategoryList(data) {
        // Utilisation de MAP pour éviter doublons et associer "id" et "name"
        const categoryMap = new Map();

        data.forEach(project => {
            if (project.category && project.category.id && project.category.name){
                const {id, name} = project.category;
                if (!categoryMap.has(id)) {
                categoryMap.set(id, name);
                console.log(`Catégorie ajoutée : id=${id}, name=${name}`);
                }
            }
        });
        return Array.from(categoryMap, ([id, name]) => ({id, name}));
    }


    // Déclaration des catégories extraites de "projectsData"
    const categoryList = [
        { id: 'all', name:'Tous'}, // Catégorie "Tous"
        ...getUniqueCategoryList(projectsData) // Ajoute les catégories unique extraite de "Data"
    ];
    console.log("Catégories extraites :", categoryList);


    // Déclaration de l'emplacement dans le DOM
    const container=document.getElementById('btn-container');


    // Génération des boutons en fonctions des categories déclarées
    categoryList.forEach((category, index) => {
        console.log(`Création bouton par categorie :`, category); // Vérification création categories
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

            console.log(`Bouton créé :`, button);
            container.appendChild(button); // Ajoute les boutons au conteneur
        });
}


initializeFilters();


