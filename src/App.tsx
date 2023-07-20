import { useState } from 'preact/hooks';
import { Header } from './components/Header'
import styles from './App.module.css';
import { PlusCircle } from '@phosphor-icons/react';
import './global.css'
import clipboard from './assets/Clipboard.svg';
import { Task, TaskContent } from './components/Task';



export function App() {

  const [tasks, setTasks] = useState<TaskContent[]>([]);
  const [newTask, setNewTask] = useState('');
  const [countDone, setCountDone] = useState(0);

  function handdleCreateNewItem(event: any) {
    event.preventDefault();
    const task: TaskContent = {
      taskText: newTask,
      checkedTask: false,
      onCheckChange: handleCheckChange,
      onDeleteTask: handleDeleteTask,
    }

    setTasks((state) => {
      const newTasks = [...state, task];
      countTasksDone(newTasks);
      return newTasks;
    });
    setNewTask('');
  }

  function handleCheckChange(taskText: string, taskCheched: boolean) {
    setTasks(state => {
      const task = state.find(task => task.taskText === taskText);
      if (task) {
        task.checkedTask = taskCheched;
      }
      countTasksDone(state);
      return state;
    });
  }

  function countTasksDone(tasks: TaskContent[]) {
    const newCountDone = tasks.reduce((prev, current) => {
      return prev + (current.checkedTask ? 1 : 0);
    }, 0);
    setCountDone(newCountDone);
  }

  function handleDeleteTask(taskText: string) {
    setTasks(state => {
      const newTasks = state.filter(task => task.taskText !== taskText);
      countTasksDone(newTasks);
      return newTasks;
    });
  }

  function handleNewTaskChange(event: any) {
    setNewTask(event.target.value);
  }



  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <main>
          <form onSubmit={handdleCreateNewItem} className={styles.toDoListForm}>
            <input
              onChange={handleNewTaskChange}
              value={newTask}
              placeholder='Adicione uma nova tarefa'
              required
            ></input>
            <button disabled={!newTask} type='submit'>Criar <PlusCircle /></button>

          </form>

          <div className={styles.tasks}>
            <div className={styles.tasksInfo}>
              <div className={styles.infoCreated}>
                <span>Tarefas criadas</span>
                <span>{tasks.length}</span>
              </div>
              <div className={styles.infoDone}>
                <span>Concluídas</span>
                <span>{tasks.length > 0 ? `${countDone} de ${tasks.length}` : 0}</span>
              </div>
            </div>
            {tasks.length > 0 ?
              <div className={styles.taskList}>
                {tasks.map(task => {
                  return (
                    <Task key={task.taskText} task={task} />)
                })}
              </div> :
              <div className={styles.taskEmpty}>
                <img src={clipboard} alt="cliboard" />
                <span>Você ainda não tem tarefas cadastradas</span>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            }
          </div>
        </main>
      </div>
    </div>
  )
}
