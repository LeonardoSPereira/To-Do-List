import styles from './App.module.css'
import Logo from './assets/logo.svg'
import { PlusCircle } from '@phosphor-icons/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Task, TaskProps } from './components/Task';
import { Clipboard } from './assets/Clipboard';

export function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([{
    id: 1,
    title: 'Estudar React',
    isCompleted: false
  }, {
    id: 2,
    title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    isCompleted: false
  }, {
    id: 3,
    title: 'Estudar Node.js',
    isCompleted: true
  }])
  const [totalTasks, setTotalTasks] = useState(tasks.length)
  const [completedTasks, setCompletedTasks] = useState(0)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  function handleNewTaskTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value);
  }

  function handleAddNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!newTaskTitle) {
      return;
    }

    let highestId;

    if(tasks.length !== 0) {
      highestId = tasks.reduce((acc: TaskProps, task: TaskProps) => {
        return task.id > acc.id ? task : acc
      })
    } else {
      highestId = { id: 0 };
    }

    const newTask: TaskProps = {
      id: highestId.id + 1,
      title: newTaskTitle,
      isCompleted: false
    }
    
    setTasks(prevState => [...prevState, newTask])
    setTotalTasks(prevState => prevState + 1)
    setNewTaskTitle('')

  }

  function countCompletedTasks() {
    const completedTasks = tasks.filter(task => task.isCompleted);

    setCompletedTasks(completedTasks.length);
  }

  function handleCheckTask(id: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleDeleteTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id);

    setTasks(filteredTasks);
    setTotalTasks(prevState => prevState - 1);
  }

  useEffect(() => {
    countCompletedTasks();
  }, [tasks])

  return (
    <div>
      <header className={styles.header}>
        <img src={Logo} alt="" />
      </header>

      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleAddNewTask}>
          <input
            className={styles.input}
            type="text"
            placeholder='Adicione uma nova tarefa'
            onChange={handleNewTaskTitleChange}
            value={newTaskTitle}
          />

          <button
            className={styles.addButton}
          >
            Criar
            <PlusCircle size={20} weight='bold' />
          </button>
        </form>

        <div className={styles.taskList}>
          <header>
            <div>
              <p>Tarefas criadas</p>
              <span>{totalTasks}</span>
            </div>

            <div>
              <p>Concluídas</p>
              <span>{totalTasks > 0 ? `${completedTasks} de ${totalTasks}` : 0}</span>
            </div>
          </header>

          {
            totalTasks > 0 ? (
              <div className={styles.tasks}>
                {tasks.map(task => (
                  <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    isCompleted={task.isCompleted}
                    onCheck={handleCheckTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyList}>
                <Clipboard />
                <p>Você ainda não tem tarefas cadastradas</p>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            )
          }
        </div>
      </main>
    </div>
  )
}


