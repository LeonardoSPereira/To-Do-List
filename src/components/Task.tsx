import styles from './Task.module.css';
import { Circle, CheckCircle, Trash } from '@phosphor-icons/react'

export interface TaskProps {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface TaskComponentProps extends TaskProps {
  onCheck: (id:number) => void;
  onDelete: (id:number) => void;
}

export function Task({ id, title, isCompleted, onCheck, onDelete }: TaskComponentProps) {
  return (
    <div className={styles.task}>
      <button
        className={isCompleted ? styles.checkCompletedButton : styles.checkToDoButton}
        onClick={() => onCheck(id)}
      >
        {isCompleted ? (<CheckCircle weight='fill' size={20} />) : (<Circle size={20} />)}
      </button>

      <p className={isCompleted ? styles.taskCompletedTitle : styles.taskToDoTitle}>{title}</p>

      <button 
        className={styles.deleteButton}
        onClick={() => onDelete(id)}
      >
        <Trash size={20} />
      </button>
    </div>
  )
}