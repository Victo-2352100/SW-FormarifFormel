// Importer le module express
import express from 'express';
import { salutations, AjouterSalutation } from './salutations.model.js';

// Créer une application express
const app = express();
const PORT = 3000;
app.use(express.json());


app.get('/api', (req, res) => {
    res.send("<h1>Mon premier serveur web sur express !</h1>");
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});