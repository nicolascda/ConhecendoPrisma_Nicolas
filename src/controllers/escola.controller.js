const { Prisma } = require("@prisma/client");
const prisma = require("../data/prisma.js");

const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        if (!data.nome) {
            return res.status(400).json("Por favor coloque um valor para o campo de nome")
        }

        if (!(data.endereco)) {
            data.endereco = null;
        }

        const escola = await prisma.escola.create({
            data
        });

        res.status(201).json(escola);
    } catch (error) {
        res.status(500).json("Erro de servidor")
        throw error
    }



};

const listar = async (req, res) => {
    try {
        const escolas = await prisma.escola.findMany();
        res.status(200).json(escolas).end();
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

        const escola = await prisma.escola.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!escola) {
            return res.status(404).json("Escola não encontrada");
        }
        res.status(200).json(escola).end();
    } catch (error) {
        res.status(500).json("Erro de servidor");
        throw error
    }
}

const atualizar = async (req, res) => {
    try {

        const data = req.body;
        const { id } = req.params;

        if (!data.nome) {
            return res.status(400).json("Por favor coloque um valor para o campo de nome")
        }

        if (!(data.endereco)) {
            data.endereco = null;
        }

        if (!id || !Number(id)) {
            return res.status(400).json("O valor do ID precisa existir, e necessita ser um número")
        }

        const escolas = await prisma.escola.update({
            where: {
                id: Number(id)
            },
            data

        })

        res.status(200).json(escolas)
        console.log(escolas)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: "Escola não foi encontrada" });
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

        const escola = await prisma.escola.deleteMany({
            where: {
                id: Number(id)
            }
        })
        console.log(escola)
        if (escola.count == 0) {
            return res.status(404).json("Escola não foi encontrada");
        }

        res.status(200).json("Escola deletada");
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
            return res.status(400).json({ error: "Não é possível deletar o valor da escola, pois está sendo utilizado em outro lugar, então delete o lugar que está sendo usado o valor primeiro, para depois deletar esse dado" });
        }

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