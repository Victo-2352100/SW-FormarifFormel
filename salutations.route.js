import express from "express";
import { salutations, AjouterSalutation } from './salutations.model.js';
import url from "url"
import fs from 'fs'
import morgan from 'morgan'
const router = express.Router();
const app = express();
app.use(express.json());
function chercherTableau(code) {
    const filtre = salutations.filter(salutations=> salutations.code_langue === code);
    
    if (filtre.length === 0) {
        return "Erreur, le code de langue [" +  code + "] n'existe pas";
    }
    const enregAleatoire = filtre[Math.floor(Math.random() * filtre.length)];
    return enregAleatoire.message;
    }

const params = url.parse(req.url, true).query;
router.get('/api/salutations/liste', (req, res) => {
res.send(JSON.stringify(salutations));

});
router.get('/api/salutations', (req, res) => {
if(params["langue"]) {
let message = salutations.filter(chercherTableau);
res.send(JSON.stringify(message));
}

});
router.post('/api/salutations/', (req, res)=> {
    const message = req.body.message;
    const code_langue = req.body.code_langue;
    const langue = req.body.langue;

    if (!req.body.message) {
        console.log("le paramètre message est absent");
    }
    if (!req.body.code_langue) {
        console.log("le paramètre code_langue est absent");
    }
    if (!req.body.langue) {
        console.log("le paramètre langue est absent");
    }
    
});