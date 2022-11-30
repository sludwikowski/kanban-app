/* eslint-disable eqeqeq */
import React, { useContext } from 'react'

import Task from './Task'

import { ItemContext } from '../context/context'

const Column = () => {
  const { tasks, columns } = useContext(ItemContext)
  return (
    <section className ={'kanban__board'}>
      <ul className ={'kanban__board--column'}>
        {columns.map(el =>
          <li
            className ={'column'}
            key = {el.id}
          >
            <h3 className ={'column__title'}>{`${el.name}`}</h3>
            <Task tasks = {tasks.filter(task => task.idColumn == el.id)}/>
          </li>
        )}
      </ul>
    </section>
  )
}

export default Column
