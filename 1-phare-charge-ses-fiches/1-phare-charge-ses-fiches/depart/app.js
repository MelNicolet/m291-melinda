// Phare : la page qui affiche les lieux.
// Les 30 fiches sont dans data.json. Cette semaine, vous les faites venir avec fetch.

const conteneur = document.getElementById("liste-cartes");
const zoneEtat = document.getElementById("etat");

// La pile de toutes les fiches. Elle est vide tant que data.json n'est pas arrivé.
let tousLesLieux = [];

// Montre une carte par fiche de la liste qu'on lui donne.
// Elle efface d'abord les cartes déjà affichées.
function afficherLieux(liste) {
  conteneur.textContent = "";

  for (const lieu of liste) {
    const carte = document.createElement("article");
    carte.className = "carte";

    const titre = document.createElement("h2");
    titre.textContent = lieu.nom;

    const quartier = document.createElement("p");
    quartier.className = "quartier";
    quartier.textContent = lieu.quartier;

    const etat = document.createElement("p");
    if (lieu.ouvert) {
      etat.className = "etat ouvert";
      etat.textContent = "Ouvert";
    } else {
      etat.className = "etat ferme";
      etat.textContent = "Fermé";
    }

    const bruit = document.createElement("p");
    bruit.textContent = "Bruit : " + lieu.bruit + " sur 5";

    carte.append(titre, quartier, etat, bruit);
    conteneur.append(carte);
  }
}

// ----- Votre code de la semaine 11 commence ici -----

async function chargerLieux() {
  zoneEtat.textContent = "Chargement des lieux…";

  try {
    const reponse = await fetch("data.json");

    if (!reponse.ok) {
      throw new Error("Impossible de charger data.json (" + reponse.status + ")");
    }

    const donnees = await reponse.json();
    tousLesLieux = Array.isArray(donnees) ? donnees : [];

    if (tousLesLieux.length === 0) {
      zoneEtat.textContent = "Aucun lieu trouvé.";
      conteneur.textContent = "";
      return;
    }

    afficherLieux(tousLesLieux);
    zoneEtat.textContent = tousLesLieux.length + " lieux chargés.";
  } catch (erreur) {
    zoneEtat.textContent = "Erreur lors du chargement des lieux.";
    conteneur.textContent = "";
    console.error(erreur);
  }
}

chargerLieux();
