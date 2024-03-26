import styles from './App.module.css'
import Logo from './assets/logo.svg'
import { PlusCircle } from '@phosphor-icons/react'
import { useState } from 'react';
import { TaskProps } from './components/Task';
import { Clipboard } from './assets/Clipboard';

export function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [totalTasks, setTotalTasks] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)

  return (
    <div>
      <header className={styles.header}>
        <img src={Logo} alt="" />
      </header>

      <main className={styles.main}>
        <form className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder='Adicione uma nova tarefa'
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
              <span>{completedTasks}</span>
            </div>
          </header>

          {
            tasks.length > 0 ? (
              <h1>task</h1>
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
