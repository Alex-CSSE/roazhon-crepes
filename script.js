// 1. GESTION DE LA CARTE (Une seule fois !)
var map = L.map('map').setView([48.1113, -1.6800], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var marker = L.marker([48.1113, -1.6800]).addTo(map);
marker.bindPopup("<b>Roazhon Crêpes</b><br>Les meilleures galettes de Rennes !").openPopup();

// 2. GESTION DU PANIER (Vente à emporter)
let total = 0;

function ajouterAuPanier(nom, prix) {
    total += prix;
    
    // 1. Mise à jour du prix avec 2 décimales
    document.getElementById('total-prix').innerText = total.toFixed(2);
    
    // 2. Ajout du nom du plat dans la liste visuelle
    const liste = document.getElementById('liste-commande');
    const nouvelElement = document.createElement('li');
    nouvelElement.innerText = `1x ${nom} (${prix.toFixed(2)}€)`;
    liste.appendChild(nouvelElement);
    
    document.getElementById('statut-panier').innerText = "Dernier ajout : " + nom;
}

function viderPanier() {
    total = 0;
    document.getElementById('total-prix').innerText = "0.00";
    document.getElementById('liste-commande').innerHTML = ""; // Vide la liste
    document.getElementById('statut-panier').innerText = "Le panier a été vidé.";
}
function validerCommande() {
    if (total === 0) {
        alert("Votre panier est vide ! Choisissez une bonne galette avant de commander.");
        return;
    }

    // On récupère le montant final
    const montantFinal = total.toFixed(2);

    // Message de confirmation (Simule l'envoi en cuisine)
    alert(`Commande validée ! 
    Montant : ${montantFinal}€ 
    Vos crêpes seront prêtes dans 15 minutes au Roazhon Crêpes.`);

    // On vide le panier après la commande
    viderPanier();
    document.getElementById('statut-panier').innerText = "Commande envoyée en cuisine ! ✅";
    document.getElementById('statut-panier').style.color = "#27ae60"; // Vert succès
}

// 3. GESTION DU FORMULAIRE DE RÉSERVATION
document.getElementById('form-reservation').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche la page de se recharger
    alert("Mersi bras ! Votre réservation est bien prise en compte.");
});
function viderPanier() {
    // 1. On remet la variable à zéro
    total = 0;

    // 2. On met à jour le HTML
    document.getElementById('total-prix').innerText = total;
    document.getElementById('statut-panier').innerText = "Le panier a été vidé.";
    document.getElementById('statut-panier').style.color = "#bdc3c7"; // Gris clair

    console.log("Panier vidé !");
}
document.getElementById('form-avis').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche le rechargement

    // 1. Récupérer les valeurs
    const nom = document.getElementById('avis-nom').value;
    const message = document.getElementById('avis-message').value;

    // 2. Créer l'élément HTML de l'avis
    const zoneAvis = document.getElementById('liste-avis');
    const nouvelAvis = document.createElement('div');
    nouvelAvis.className = 'avis-item';
    
    nouvelAvis.innerHTML = `
        <p><strong>${nom} :</strong> "${message}"</p>
        <span>⭐⭐⭐⭐⭐</span>
    `;

    // 3. Ajouter l'avis au début de la liste
    zoneAvis.prepend(nouvelAvis);

    // 4. Vider le formulaire
    this.reset();
    alert("Trugarez ! Votre message a été publié.");
});
// --- GESTION DU CLIC SUR LES ÉTOILES ---
const stars = document.querySelectorAll('.star');
const noteInput = document.getElementById('note-selectionnee');

stars.forEach(star => {
    star.addEventListener('click', () => {
        // On retire la classe active de toutes les étoiles
        stars.forEach(s => s.classList.remove('active'));
        // On ajoute la classe active à l'étoile cliquée
        star.classList.add('active');
        // On enregistre la valeur
        noteInput.value = star.getAttribute('data-value');
    });
});

// --- MISE À JOUR DE LA PUBLICATION ---
document.getElementById('form-avis').addEventListener('submit', function(e) {
    e.preventDefault();
    const nom = document.getElementById('avis-nom').value;
    const message = document.getElementById('avis-message').value;
    const note = noteInput.value;
    
    // Génération des étoiles en texte
    const etoilesAffichees = "⭐".repeat(note);

    const zoneAvis = document.getElementById('liste-avis');
    const nouvelAvis = document.createElement('div');
    nouvelAvis.className = 'avis-item';
    
    nouvelAvis.innerHTML = `
        <p><strong>${nom} :</strong> "${message}"</p>
        <span>${etoilesAffichees}</span>
    `;

    zoneAvis.prepend(nouvelAvis);
    this.reset();
    stars.forEach(s => s.classList.remove('active')); // Reset visuel des étoiles
});