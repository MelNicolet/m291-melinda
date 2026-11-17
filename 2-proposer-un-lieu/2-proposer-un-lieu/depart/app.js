// Phare : affichage des cartes, déjà fait, comme en semaine 11.
// Les 30 fiches sont dans lieux.js, dans la variable tousLesLieux.

const conteneur = document.getElementById("liste-cartes");
const formulaire = document.getElementById("form-lieu");
const nomLieu = document.getElementById("nom-lieu");
const quartierLieu = document.getElementById("quartier-lieu");
const bruitLieu = document.getElementById("bruit-lieu");
const ouvertLieu = document.getElementById("ouvert-lieu");
const messageErreur = document.getElementById("erreurs");

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

function validerLieu() {
  const nom = nomLieu.value.trim();
  const quartier = quartierLieu.value.trim();
  const bruit = Number(bruitLieu.value);

  if (nom === "") {
    messageErreur.textContent = "Le nom du lieu est obligatoire.";
    return null;
  }

  if (quartier === "") {
    messageErreur.textContent = "Le quartier est obligatoire.";
    return null;
  }

  if (Number.isNaN(bruit) || bruit < 1 || bruit > 5) {
    messageErreur.textContent = "Le niveau de bruit doit être un nombre entre 1 et 5.";
    return null;
  }

  messageErreur.textContent = "";

  return {
    id: Date.now(),
    nom,
    quartier,
    bruit,
    ouvert: ouvertLieu.checked,
    resume: "Lieu proposé par la communauté.",
    horaire: "À confirmer"
  };
}

formulaire.addEventListener("submit", (event) => {
  event.preventDefault();

  const nouveauLieu = validerLieu();
  if (!nouveauLieu) {
    return;
  }

  tousLesLieux.unshift(nouveauLieu);
  afficherLieux(tousLesLieux);
  formulaire.reset();
  ouvertLieu.checked = true;
  bruitLieu.value = 2;
});

afficherLieux(tousLesLieux);
