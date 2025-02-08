import db from './db.js';
const requeteListe = "SELECT code_langue, langue, message FROM salutations";

const salutations = [
    { code_langue : "fr", langue : "Français", message : "Bonjour le monde"},
    { code_langue : "fr", langue : "Français", message : "Bon matin"},
    { code_langue : "fr", langue : "Français", message : "Salut"},
    { code_langue : "fr", langue : "Français", message : "Bonne nuit je vais travailler"},
    { code_langue : "en", langue : "Anglais", message : "Hello world"},
    { code_langue : "en", langue : "Anglais", message : "Good morning"},
    { code_langue : "en", langue : "Anglais", message : "Hi"},
    { code_langue : "en", langue : "Anglais", message : "Good night, i''m going to work"},
    { code_langue : "es", langue : "Espagnol", message : "Hola Mundo"},
    { code_langue : "es", langue : "Espagnol", message : "Buenos dias"},
    { code_langue : "es", langue : "Espagnol", message : "Hola"},
    { code_langue : "es", langue : "Espagnol", message : "Buenas noches me voy a trabajar"},
    { code_langue : "de", langue : "Allemand", message : "Hallo Welt"},
    { code_langue : "de", langue : "Allemand", message : "guten Morgen"},
    { code_langue : "de", langue : "Allemand", message : "Hallo"},
    { code_langue : "de", langue : "Allemand", message : "Gute Nacht, ich gehe zur Arbei"}
];
function AjouterSalutation(Vcode_langue, Vlangue, Vmessage) {
salutations.push({code_langue:Vcode_langue, langue:Vlangue, message:Vmessage});
const message = [
    {
        "message": "Salutation ajoutée!",
        "salutation": [Vmessage]
    }
]
return JSON.stringify(message);
};

const ListeDeSalutations = () => {
return new Promise((resolve, reject) => {
    db.query(requeteListe, (erreur, resultat) => {
        if (erreur) {
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            // S'il y a une erreur, la retourner avec la fonction reject
            reject(erreur);
        }
        // Ou retourner le résultat sans validation
        resolve(resultat);
    });
});
};

const trouverSalutation = (_code_langue) => {
    return new Promise((resolve, reject) => {
    const requeteLangue = "SELECT message FROM salutations WHERE code_langue = ? LIMIT 1";
    const params = [_code_langue];
    db.query(requeteLangue, params, (erreur, resultat) => {
        if (erreur) {
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            // S'il y a une erreur, la retourner avec la fonction reject
            reject(erreur);
        }
        // Ou retourner le résultat sans validation
        resolve(resultat);
    });
});
};
const DBAjoutSalutation = (_langue, _code_langue, _salutation) => {
    return new Promise((resolve, reject) => {
        const requeteInsert = "INSERT INTO salutations (code_langue, langue, message) VALUES ?, ?, ?";
        const params = [_code_langue, _langue, _salutation];
        db.query(requeteInsert, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat);
        });
    });
};
export { 
    salutations,
    AjouterSalutation,
    trouverSalutation,
    ListeDeSalutations
};