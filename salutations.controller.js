import  { salutations, AjouterSalutation, ListeDeSalutations, DBAjoutSalutation } from './salutations.model.js';


function VerifierAjout(req, res) {
    const message = req.body.message;
    const code_langue = req.body.code_langue;
    const langue = req.body.langue;

    if (!req.body.message) {
        res.send("le paramètre message est absent");
        return;
    }
    if (!req.body.code_langue) {
        res.send("le paramètre code_langue est absent");
        return;
    }
    if (!req.body.langue) {
        res.send("le paramètre langue est absent");
        return;
    }
    AjouterSalutation(code_langue, langue, message);
    res.send("La salutation a été ajoutée avec succès!")
    return;
}
function afficherListeSalutation(req, res) {
    res.send(JSON.stringify(salutations));
    return;
}
const afficherSalutationListe = async (req,res) => {
    // Invoquer la fonction trouverSalutation dans le fichier modèle
    await ListeDeSalutations()
    // Si c'est un succès
    .then((salutation) => {
        // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
        if (!salutation[0]) {
            res.status(404);
            res.send({
                message: `Salutation introuvables!`
            });
            return;
        }
        // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
        res.send(salutation);
    })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération des salutations"
        });
    });
}
function chercherTableau(code) {
    const filtre = salutations.filter(salutations=> salutations.code_langue === code);
    
    if (filtre.length === 0) {
        return "Erreur, le code de langue [" +  code + "] n'existe pas";
    }
    const enregAleatoire = filtre[Math.floor(Math.random() * filtre.length)];
    return enregAleatoire.message;
};
function afficherSalutationLangue(req, res) {
    if(params["code_langue"]) {
        let message = salutations.filter(chercherTableau);
        res.send(JSON.stringify(message));
    }
    return;
};
const afficherDBSalutationLangue = async (req, res) => {
// Teste si le paramètre id est présent et valide
if(!req.params.code_langue){
    res.status(400);
    res.send({
        message: "Le code langue du dois être présent"
    });
    return;
}

// Appel à la fonction getProfesseur dans le modèle
await professeursModel.getProfesseur(req.params.id)
// Si c'est un succès
.then((professeur) => {
    // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
    if (!professeur[0]) {
        res.status(404);
        res.send({
            message: `Professeur introuvable avec l'id ${req.params.id}`
        });
        return;
    }
    // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
    res.send(professeur[0]);
})
// S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
.catch((erreur) => {
    console.log('Erreur : ', erreur);
    res.status(500)
    res.send({
        message: "Erreur lors de la récupération du professeur avec l'id " + req.params.id
    });
});
};

const AjouterSalutationDB = async (req, res) => {
    // Teste si le paramètre id est présent et valide
if(!req.params.code_langue){
    res.status(400);
    res.send({
        message: "Le code langue du dois être présent"
    });
    return;
}

// Appel à la fonction getProfesseur dans le modèle
await DBAjoutSalutation(params.langue, params.code_langue, params.salutation)
// Si c'est un succès
.then((professeur) => {
    // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
    if (!professeur[0]) {
        res.status(404);
        res.send({
            message: `Professeur introuvable avec l'id ${req.params.id}`
        });
        return;
    }
    // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
    res.send(professeur[0]);
})
// S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
.catch((erreur) => {
    console.log('Erreur : ', erreur);
    res.status(500)
    res.send({
        message: "Erreur lors de la récupération du professeur avec l'id " + req.params.id
    });
});
}

