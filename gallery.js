// Gallery

// Déclaration d'une variable globale pour stoker les données des projets - Avec export
export let projectsData = [];



// Fonction pour récupérer les projets depuis l'api works
export function fetchProjects() {
    return fetch("http://localhost:5678/api/works") // Appel à l'api works
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur récupération works"); // Si erreur de récupération
            }
            return response.json(); // Si OK, convertit la réponse en JSON
        })
        .then(data=>{
            console.log("Projet récupérés api works", data); // Vérifie que les données sont récupérées et les affiches dans la console
            projectsData = data; // Stocke les données dans la variables globale
            displayProjects(data); // Appel fonction pour afficher projets
        })
        .catch(error => { 
            console.error("Erreur :",error);
            projectsData = []; // Si erreur, on réinitialise à un tableau vide
        });
}




// Fonction pour afficher les elements récupérés, dans le DOM - Avec export
export function displayProjects(projets) {
    console.log("Projets à afficher :", projets); 

    const gallery = document.querySelector(".gallery"); // Séléctionne la div .gallery
    gallery.innerHTML=""; // Vide la galerie avant l'ajout dynamique

    projets.forEach(projet => {

        const projetElement=document.createElement("figure");

        // Création image projet
        const img=document.createElement("img");
        img.src = projet.imageUrl; // Prend l'image en fonction de l'url dans les works
        img.alt = projet.title;
        
        // Création titre du projet
        const caption=document.createElement("figcaption");
        caption.textContent=projet.title; // Texte du projet

        // Ajout image et titre dans elements figure
        projetElement.appendChild(img);
        projetElement.appendChild(caption);

        // Ajout element figure dans galerie
        gallery.appendChild(projetElement);
    });
}



// Appel de la fonction des que le DOM est pret
document.addEventListener("DOMContentLoaded", fetchProjects);





