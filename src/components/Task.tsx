import styles from './Task.module.css';
import { Trash } from '@phosphor-icons/react';

export interface TaskContent {
  taskText: string;
  checkedTask: boolean;
  onCheckChange: (taskText: string, checkedTask: boolean) => void;
  onDeleteTask: (taskText: string) => void;
}

export interface TaskProps {
  task: TaskContent
}

export function Task({ task }: TaskProps) {
  // n encontrei evento para checked e usando change event n consegui acessar o checkd
  function handleCheckedChange(event: any) {
    if (task.onCheckChange) {
      task.onCheckChange(task.taskText, event.target.checked);
    }
  }

  function handleDeleteTask() {
    if (task.onDeleteTask) {
      task.onDeleteTask(task.taskText);
    }
  }

  return (
    <div className={styles.task}>
      <div className={styles.checkText}>
        <input type="checkbox" checked={task.checkedTask} onChange={handleCheckedChange} />
        <label>{task.taskText}</label>
      </div>
      <Trash size={24} onClick={handleDeleteTask} />
    </div>
  );
}