const express = require('express')
const router = express.Router();

const { cadastrar, listar, atualizar, deletar} = require( "../controllers/aluno.controller.js");

router.post('/cadastrar', cadastrar);
router.get('/listar', listar);
router.put('/atualizar/:id', atualizar);
router.delete('/deletar/:id', deletar);

module.exports = router;