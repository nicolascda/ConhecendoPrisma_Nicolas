require("dotenv").config();
const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./src/routes/usuario.route.js");
const escolaRoutes = require("./src/routes/escola.route.js");
const alunoRoutes = require('./src/routes/aluno.route.js');

const app = express();
app.use(express.json());
app.use(cors());

app.use("/usuarios", usuarioRoutes);
app.use("/escolas", escolaRoutes);
app.use("/alunos", alunoRoutes);

const PORT = process.env.PORT || 3000;


app.get('/', () => {
    console.log("oi")
})
app.listen(PORT, () => {
  console.log(`Servidor rodando na http://localhost:${PORT}`);
});
