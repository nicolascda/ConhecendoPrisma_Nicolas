const express = require('express')
const router = express.Router();

const { cadastrar, listar, listarPorId, atualizar, deletar} = require( "../controllers/aluno.controller.js");

router.post('/cadastrar', cadastrar);
router.get('/listar', listar);
router.get('/listar/:id', listarPorId);
router.put('/atualizar/:id', atualizar);
router.delete('/deletar/:id', deletar);

module.exports = router;