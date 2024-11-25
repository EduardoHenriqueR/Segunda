export interface Tarefa {
    id: number;             // ID da tarefa
    titulo: string;         // Título da tarefa
    descricao: string;      // Descrição da tarefa
    categoriaId: number;    // ID da categoria associada à tarefa
    estado: number;  // Status da tarefa usando os valores do enum como string
  }