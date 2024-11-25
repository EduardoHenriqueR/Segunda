import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import TarefaListar from './components/pages/tarefa/TarefaListar';
import TarefaCadastrar from './components/pages/tarefa/TarefaCadastrar';
import TarefaAlterar from './components/pages/tarefa/TarefaAlterar';
import TarefaListarConcluidas from './components/pages/tarefa/TarefaListarConcluidas';
import TarefaListarNaoConcluidas from './components/pages/tarefa/TarefaListarNaoConcluidas';

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <nav>
            <ul>
              <li><Link to="/">Home</Link></li>

              <li> <Link to="/pages/tarefa/listar">Listar Tarefas</Link></li>

              <li><Link to="/pages/tarefa/cadastrar">Cadastrar Tarefa</Link></li>

              <li><Link to="/pages/tarefa/alterar">Alterar Estado Tarefa</Link></li>

              <li><Link to="/pages/tarefa/listarconcluidas">Listar Concluidas</Link></li>

              <li><Link to="/pages/tarefa/listarnaoconcluidas">Listar Não Concluidas</Link></li>

            </ul>
        </nav>
        


        <Routes>
          <Route path="/" element={<TarefaListar />} />
          <Route path="/pages/tarefa/listar" element={<TarefaListar />} />
          <Route path="/pages/tarefa/cadastrar" element={<TarefaCadastrar />}/>
          <Route path="/pages/tarefa/alterar" element={<TarefaAlterar />}/>
          <Route path="/pages/tarefa/listarconcluidas" element={<TarefaListarConcluidas />}/>
          <Route path="/pages/tarefa/listarnaoconcluidas" element={<TarefaListarNaoConcluidas />}/>


          {/* Para páginas não encontradas */}
          {/* <Route path="*" element={<Componente da Página não encontrada />} /> */}
        </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;
