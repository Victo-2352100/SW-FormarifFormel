// Importer le module express
import morgan from 'morgan'
import express from 'express';
import {router as salutationsRouter} from './salutations.route.js';

// Créer une application express
const app = express();
const PORT = 3000;
app.use(express.json());
var accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), { flags: 'a' });

app.use(morgan(':date[clf] => :method / :status :response-time ms', { stream:accessLogStream}));

app.get('/api', (req, res) => {
    res.send("<h1>Mon premier serveur web sur express !</h1>");
});
app.use('/api/salutations', salutationsRouter);

app.use((req, res) => {
    res.status(404).send({
        "erreur": `La route ${res.url} n'existe pas`
    })
})

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});