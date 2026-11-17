// Phare : affichage des cartes, déjà fait, comme en semaine 11.
// Les 30 fiches sont dans lieux.js, dans la variable tousLesLieux.

const conteneur = document.getElementById("liste-cartes");
const formulaire = document.getElementById("form-recherche");
const champRecherche = document.getElementById("recherche");
const boutonEffacer = document.getElementById("effacer-recherche");
const messageErreur = document.getElementById("erreurs");
const aucunResultat = document.getElementById("aucun-resultat");

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

function filtrerLieux(terme) {
  const texte = terme.trim().toLowerCase();

  if (texte === "") {
    messageErreur.textContent = "";
    aucunResultat.hidden = true;
    afficherLieux(tousLesLieux);
    return;
  }

  const resultats = tousLesLieux.filter((lieu) => {
    const texteLieu = [lieu.nom, lieu.quartier, lieu.resume, lieu.horaire]
      .join(" ")
      .toLowerCase();

    return texteLieu.includes(texte);
  });

  if (resultats.length === 0) {
    messageErreur.textContent = "";
    aucunResultat.hidden = false;
    conteneur.textContent = "";
    return;
  }

  aucunResultat.hidden = true;
  afficherLieux(resultats);
}

formulaire.addEventListener("submit", (event) => {
  event.preventDefault();

  const recherche = champRecherche.value;

  if (recherche.trim() === "") {
    messageErreur.textContent = "Veuillez saisir un mot-clé pour rechercher un lieu.";
    aucunResultat.hidden = true;
    afficherLieux(tousLesLieux);
    return;
  }

  messageErreur.textContent = "";
  filtrerLieux(recherche);
});

boutonEffacer.addEventListener("click", () => {
  champRecherche.value = "";
  messageErreur.textContent = "";
  aucunResultat.hidden = true;
  afficherLieux(tousLesLieux);
});

afficherLieux(tousLesLieux);
