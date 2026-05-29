const { Prisma } = require("@prisma/client");
const prisma = require("../data/prisma.js");

const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        if (!data.nome || !data.email || !data.idade) {
            return res.status(400).json("Por favor coloque um valor para os campos do nome, email e idade")
        }

        if (!Number(data.idade)) {
            return res.status(400).json("A idade precisa ser um valor númerico")
        }
        data.idade = Number(data.idade);

        const usuario = await prisma.usuario.create({
            data
        });

        res.status(201).json(usuario);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(400).json({ error: "O email já foi cadastrado" });
        }

        res.status(500).json("Erro de servidor")
        throw error
    }



};

const listar = async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.status(200).json(usuarios).end();
    } catch (error) {
        res.status(500).json("Erro de servidor");
        throw error
    }

};

const listarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !Number(id)) {
            return res.status(400).json("O valor do ID precisa existir, e necessita ser um número")
        }

        const usuarios = await prisma.usuario.findUnique({
            where: {
                id: Number(id)
            }
        });

        if ( !usuarios) {
            return res.status(404).json("Usuário não encontrado");
        }
        res.status(200).json(usuarios).end();
    } catch (error) {
        res.status(500).json("Erro de servidor");
        throw error
    }
}

const atualizar = async (req, res) => {
    try {

        const data = req.body;
        const { id } = req.params;

        if (!data.nome || !data.email || !data.idade) {
            return res.status(400).json("Por favor coloque um valor para os campos do nome, email e idade")
        }

        if (!Number(data.idade)) {
            return res.status(400).json("A idade precisa ser um valor númerico")
        }
        data.idade = Number(data.idade);

        if (!id || !Number(id)) {
            return res.status(400).json("O valor do ID precisa existir, e necessita ser um número")
        }

        const usuarios = await prisma.usuario.update({
            where: {
                id: Number(id)
            },
            data

        })

        res.status(200).json(usuarios)
        console.log(usuarios)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(400).json({ error: "O email já foi cadastrado" });
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.status(500).json("Erro de servidor");
        throw error
    }

}

const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !Number(id)) {
            return res.status(400).json("O valor do ID precisa existir, e necessita ser um número")
        }

        const usuario = await prisma.usuario.deleteMany({
            where: {
                id: Number(id)
            }
        })
        console.log(usuario)
        if (usuario.count == 0) {
            return res.status(404).json("Usuário não foi encontrado");
        }

        res.status(200).json("Usuário deletado")
    } catch (error) {
        res.status(500).json("Erro de servidor");
        throw error
    }

}
module.exports = {
    cadastrar,
    listar,
    listarPorId,
    atualizar,
    deletar
};