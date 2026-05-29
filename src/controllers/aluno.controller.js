const { Prisma } = require("@prisma/client");
const prisma = require("../data/prisma.js");

const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        if (!data.nome || !data.idade || !data.escolaId) {
            return res.status(400).json("Por favor coloque um valor para os campos do nome, idade e escolaId")
        }

        if (!Number(data.idade)) {
            return res.status(400).json("A idade precisa ser um valor númerico")
        }
        data.idade = Number(data.idade);

        if (!Number(data.escolaId)) {
            return res.status(400).json("O id da escola precisa ser um valor númerico")
        }
        data.escolaId = Number(data.escolaId);

        const aluno = await prisma.aluno.create({
            data
        });

        res.status(201).json(aluno);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
            return res.status(400).json({ error: "O id da escola não existe" });
        }

        res.status(500).json("Erro de servidor")
        throw error
    }



};

const listar = async (req, res) => {
    try {
        const alunos = await prisma.aluno.findMany();
        res.status(200).json(alunos).end();
    } catch (error) {
        res.status(500).json("Erro de servidor");
        throw error
    }

};

const atualizar = async (req, res) => {
    try {

        const data = req.body;
        const { id } = req.params;

        if (!data.nome || !data.idade || !data.escolaId) {
            return res.status(400).json("Por favor coloque um valor para os campos do nome, idade e escolaId")
        }

        if (!Number(data.idade)) {
            return res.status(400).json("A idade precisa ser um valor númerico")
        }
        data.idade = Number(data.idade);

        if (!Number(data.escolaId)) {
            return res.status(400).json("O id da escola precisa ser um valor númerico")
        }
        data.escolaId = Number(data.escolaId);



        if (!id || !Number(id)) {
            return res.status(400).json("O valor do ID precisa existir, e necessita ser um número")
        }

        const alunos = await prisma.aluno.update({
            where: {
                id: Number(id)
            },
            data

        })

        res.status(200).json(alunos)
        console.log(alunos)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
            return res.status(400).json({ error: "O id da escola não existe" });
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: "Aluno não encontrado" });
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

        const aluno = await prisma.aluno.deleteMany({
            where: {
                id: Number(id)
            }
        })
        console.log(aluno)
        if (aluno.count == 0) {
            return res.status(404).json("Aluno não foi encontrado");
        }

        res.status(200).json("Aluno deletado")
    } catch (error) {

        res.status(500).json("Erro de servidor");
        throw error
    }

}
module.exports = {
    cadastrar,
    listar,
    atualizar,
    deletar
};