import React from 'react';
import Formularios from "../components/Formularios";
import Lista from "../components/Lista";
import Cronometro from "../components/Cronometro";
import style from'./App.module.scss';
import { ITarefa } from '../types/tarefa';



function App(): JSX.Element {
  const [tarefas, setTarefas] = React.useState<ITarefa[]>([])
  const [selecionado, setSelecionado] = React.useState<ITarefa>();

  
  function selecionaTarefa(tarefaSelecionada: ITarefa){
    setSelecionado(tarefaSelecionada);
    setTarefas(tarefasAntigas => tarefasAntigas.map(tarefa => ({
      ...tarefa,
      selecionado: tarefa.id === tarefaSelecionada.id ? true : false

    })));
      
  }

  function finalizaTarefa(){
    if(selecionado){
      setSelecionado(undefined)
      setTarefas(tarefasAntigas => tarefasAntigas.map(tarefa =>{
        if(tarefa.id === selecionado.id){
          return {
            ...tarefa,
            selecionado: false,
            completado: true
          }
        }
        return tarefa
      }))
    }
  }

  return (
    <div className={style.AppStyle}>
      <Formularios setTarefas={setTarefas}/>
      <Lista 
      tarefas={tarefas}
      selecionaTarefa={selecionaTarefa}
      />
      <Cronometro selecionado={selecionado} finalizarTarefa={finalizaTarefa}/>
    </div>
  )
}

export default App;
