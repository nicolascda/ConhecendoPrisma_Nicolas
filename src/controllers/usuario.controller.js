const prisma = require("../data/prisma.js");

const cadastrar = async (req, res) => {
    const data = req.body;

    const usuario = await prisma.usuario.create({
        data
    });

    res.status(201).json(usuario);
};

const listar = async (req, res) => {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios).end();
};

const atualizar = async (req, res) => {
    const data = req.body;
    const {id} = req.params;

    const usuarios = await prisma.usuario.update({
        where: {
            id: Number(id)
        },
        data
        
    })

    res.status(200).json(usuarios)
    console.log(usuarios)
}

const deletar = async (req, res) => {
    const {id} = req.params;

    const usuario = await prisma.usuario.delete({
        where: {
            id: Number(id)
        }
    })
    console.log(usuario)

    res.status(200).json("Usuário deletado")
}
module.exports = {
    cadastrar,
    listar,
    atualizar,
    deletar
};