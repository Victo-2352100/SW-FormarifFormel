import  { AjouterSalutation } from './salutations.model.js';
function verifierAjout(_code_langue, _langue, _message) {
if ((_code_langue.length !=2 && _langue.length !=0 && _message.length != 0)) {
    const message = [
        {
            "message": "Erreur, une des variables est nulle ou vide!"
        }
    ]
    return JSON.stringify(message);
}
AjouterSalutation(_code_langue, _langue, _message);
}