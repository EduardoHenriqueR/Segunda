import { useEffect, useState } from "react";
import axios from "axios";
import { Tarefa } from "../../../models/Tarefa";
import { Categoria } from "../../../models/Categoria";

function TarefaListarConcluidas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Carregar as tarefas e as categorias ao inicializar o componente
  useEffect(() => {
    carregarTarefasConcluidas();
    carregarCategorias();
  }, []);

  // Função para carregar as tarefas concluídas da API
  function carregarTarefasConcluidas() {
    axios
      .get<Tarefa[]>("http://localhost:5267/api/tarefa/listar")
      .then((resposta) => {
        // Filtrar apenas as tarefas concluídas (estado 2)
        const tarefasConcluidas = resposta.data.filter(tarefa => tarefa.estado === 2);
        setTarefas(tarefasConcluidas);
      })
      .catch((erro) => {
        console.error("Erro ao carregar tarefas concluídas:", erro);
      });
  }

  // Função para carregar as categorias da API
  function carregarCategorias() {
    axios
      .get<Categoria[]>("http://localhost:5267/api/categoria/listar")
      .then((resposta) => {
        setCategorias(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar categorias:", erro);
      });
  }

  // Função para mapear o estado numérico para o estado legível
  function mapearStatus(estado: number): string {
    switch (estado) {
      case 0:
        return "Pendente";
      case 1:
        return "Em Andamento";
      case 2:
        return "Concluído";
      default:
        return "Status desconhecido";
    }
  }

  return (
    <div>
      <h1>Lista de Tarefas Concluídas</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.length > 0 ? (
            tarefas.map((tarefa) => (
              <tr key={tarefa.id}>
                <td>{tarefa.id}</td>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>
                  {categorias.find((categoria) => categoria.id === tarefa.categoriaId)
                    ?.nome}
                </td>
                <td>{mapearStatus(tarefa.estado)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Nenhuma tarefa concluída encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TarefaListarConcluidas;
