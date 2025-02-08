import express from "express";
import url from "url"
import {afficherListeSalutation, afficherSalutationLangue, VerifierAjout} from './salutations.controller.js';
const router = express.Router();
app.use(express.json());
router.get('/liste', afficherListeSalutation);
router.get('/', afficherSalutationLangue);
router.post('/', VerifierAjout);
export default router;