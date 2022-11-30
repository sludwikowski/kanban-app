/* eslint-disable eqeqeq */
import React, { useState } from 'react'

import Board from './components/Board'

import { ItemContext, UpdateContext } from './context/context'
import { useStorage } from './hooks/useStorage'

const App = () => {
  const init = {
    columns: [
      { id: 1, name: 'To do', limit: 5 },
      { id: 2, name: 'Analysis', limit: 5 },
      { id: 3, name: 'Development', limit: 5 },
      { id: 4, name: 'Testing', limit: 3 },
      { id: 5, name: 'Done', limit: 1000 }
    ],
    tasks: []
  }

  const [getItem, setItem] = useStorage()

  let fromLocalStorage = getItem('data')
  if (fromLocalStorage === null) {
    fromLocalStorage = init
  }

  const [data, setData] = useState(fromLocalStorage)
  const { columns, tasks } = data

  const updateData = (data) => {
    setData(data)
    setItem(data, 'data')
  }

  const updateTask = (newTask, action) => {
    if (action == 'add') {
      const updatedData = {
        columns,
        tasks: [...tasks, newTask]
      }
      updateData(updatedData)
    } else if (action == 'remove') {
      const updatedData = {
        columns,
        tasks: tasks.filter(item => item.id !== newTask.id)
      }
      updateData(updatedData)
    } else if (action == 'moveRight') {
      const copyTask = { ...newTask, idColumn: Number(newTask.idColumn) + 1 }
      const updatedData = {
        columns,
        tasks: tasks.map(item => {
          if (item.id == newTask.id) {
            return copyTask
          } else { return item }
        })
      }
      updateData(updatedData)
    }
  }

  return (
    <ItemContext.Provider value ={data}>
      <UpdateContext.Provider value ={updateTask}>
        <Board/>
      </UpdateContext.Provider>
    </ItemContext.Provider>
  )
}

export default App
