import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import { Categoria } from "../../../models/Categoria";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TarefaCadastrar() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState(0); // Categoria inicializada com 0
  const [estado, setEstado] = useState(0); // Pendente por padrão (0)
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const navigate = useNavigate(); // Cria a função de navegação

  useEffect(() => {
    axios
      .get<Categoria[]>("http://localhost:5267/api/categoria/listar") // Endpoint para listar categorias
      .then((resposta) => {
        setCategorias(resposta.data);
      });
  }, []);

  function enviarTarefa(event: any) {
    event.preventDefault();

    setEstado(0);
    const tarefa: Tarefa = {
      id: 0, // ID é gerado pelo servidor, portanto deixamos como 0
      titulo: titulo,
      descricao: descricao,
      categoriaId: categoriaId,
      estado: 0
    };

    // Enviar dados para a API
    axios
      .post("http://localhost:5267/api/tarefa/cadastrar", tarefa)
      .then((resposta) => {
        console.log("Tarefa cadastrada com sucesso:", resposta.data);
        navigate("/"); // Redireciona para a página inicial
      })
      .catch((erro) => {
        console.error("Erro ao cadastrar tarefa:", erro);
      });
  }

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={enviarTarefa} id="form-cadastro">
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            required
            onChange={(event) => setTitulo(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            required
            onChange={(event) => setDescricao(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria:</label>
          <select
            id="categoria"
            name="categoria"
            value={categoriaId} // Garantir que o valor inicial seja 0
            onChange={(event) => setCategoriaId(Number(event.target.value))}
          >
            <option value={0}>Selecione uma categoria</option> {/* Opção padrão com valor 0 */}
            {categorias.map((categoria) => (
              <option value={categoria.id} key={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Cadastrar Tarefa</button>
      </form>
    </div>
  );
}

export default TarefaCadastrar;
