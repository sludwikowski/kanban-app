
import React from 'react'

import Column from './Column'
import Form from './Form'

const Board = () => {
  return (
    <>
      <h1 className ={'title'}>Kanban Board</h1>
      <Form/>
      <Column/>
    </>
  )
}

export default Board
