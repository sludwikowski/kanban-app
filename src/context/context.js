import React from 'react'

// eslint-disable-next-line no-unused-vars
const init = {
  columns: [
    { id: 1, name: 'To do', limit: 5 },
    { id: 2, name: 'Analysis', limit: 3 },
    { id: 3, name: 'Development', limit: 5 },
    { id: 4, name: 'Testing', limit: 3 },
    { id: 5, name: 'Done', limit: 10 }
  ],
  tasks: []
}

const ItemContext = React.createContext()
const UpdateContext = React.createContext()

export { ItemContext, UpdateContext }
