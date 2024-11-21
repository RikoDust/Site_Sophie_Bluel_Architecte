// Processus de connexion


// Ecoute les données saisi par utilisateur lors du click sur "se connecter"
document.querySelector('#submit-button').addEventListener('click', function(event){
    event.preventDefault(); // Empeche de recharger la page

    // Efface le message d'erreur 
    const errorMessage = document.querySelector('#error-message');
    if (errorMessage){
        errorMessage.remove(); // Suprime le message d'erreur du DOM
    }

    const email = document.querySelector('#email').value; // Prend les données du champs
    const password = document.querySelector('#password').value; // Prend les données du champs

    console.log('Email: ', email); // Affiche données dans la console
    console.log('Password: ',password); // Affiche données dans la console

    // Vider les champs apres click "se connecter"
    //document.querySelector('#email').value = '';
    //document.querySelector('#password').value = '';


    // Envoi des données vers l'api avec fetch
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST', // Method POST pour envoi des données
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ 
            email: email,
            password: password
        })
    })
    .then(response => {
        if (response.ok) {
            // Si couple correct, traitement réponse
            return response.json();
        } else {
            // Si couple incorrect, message erreur
            throw new Error("Erreur dans l'identification ou le mot de passe");
        }
    })
    .then(data => {
        console.log("Connexion réussie: ", data); // Affiche réponse console si OK

        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('token', data.token);

        // Redirige vers page accueil
        window.location.href = "index.html";
    })
    .catch(error => {
    // Affiche le message d'erreur en créant un element <p>
    const errorMessage = document.querySelector('error-message');
    if (!errorMessage){
        const errorElement=document.createElement('p');
        errorElement.id = 'error-message';
        errorElement.style.color = 'red'; // Style du message
        errorElement.style.marginTop = '2rem';
        errorElement.style.fontSize = '1.2rem';
        errorElement.textContent = error.message;
        document.querySelector('#logIn').appendChild(errorElement); 
    } else {
        errorMessage.textContent = errorMessage;
    }

        console.log('Erreur: ',error); // Affiche erreur dans console
    });
});








