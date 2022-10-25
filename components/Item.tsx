import moment from 'moment'
import { NextPage } from 'next'
import React from 'react'
import { Task } from '../types/Task'

type ItemProps = {
    task: Task
}

export const Item : NextPage<ItemProps> = ({task}) => {
const taskIsFinished = task.finishDate || false

const getDateText = (finishDate: Date | undefined, finishPrevisionDate : Date) => {
    if(finishDate) {
        return `Concluído em ${moment(finishDate).format('DD/MM/yyyy')}`
    }
    return `Conclusão em ${moment(finishPrevisionDate).format('DD/MM/yyyy')}`
}

  return (
    <div className={'container-item' + (!taskIsFinished && 'active')}>
        <img src={taskIsFinished ? 'checked.svg': 'not-checked.svg'} alt={taskIsFinished ? 'Concluída': 'Em aberto'} />
        <div>
            <p className={taskIsFinished ? 'finished': ''}>{task.name}</p>
            <span>{getDateText(task.finishDate, task.finishPrevisionDate)}</span>
        </div>
    </div>
  )
}