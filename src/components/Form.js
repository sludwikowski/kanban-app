/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
import React, { useReducer, useContext, useState } from 'react'

import { ItemContext, UpdateContext } from '../context/context'

import { validateData } from '../validateData'

import { v4 as uuid } from 'uuid'

const Form = () => {
  const init = {
    id: uuid(),
    name: '',
    user: '',
    deadline: '',
    idColumn: 0
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'reset':
        return init
      case 'change':
        const { name, value } = action.element
        return { ...state, [name]: value }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, init)
  const { name, user, deadline, idColumn } = state
  const [err, setErr] = useState([])
  const { tasks, columns } = useContext(ItemContext)
  const updateTask = useContext(UpdateContext)

  const countTasksInColumn = (id) => {
    const numberTasksInColumn = tasks.filter(item => Number(item.idColumn) === Number(id)).length
    return numberTasksInColumn
  }

  const checkIfIsUnderLimit = (newTask, columns) => {
    const { idColumn } = newTask
    const thatColumn = columns.find((item) => Number(idColumn) === Number(item.id))
    const { id, limit } = thatColumn
    const tasksInColumn = countTasksInColumn(Number(id))
    return (tasksInColumn < limit)
  }

  const handleForm = (e) => {
    e.preventDefault()
    const errors = validateData(state)
    if (errors.length === 0) {
      if (checkIfIsUnderLimit(state, columns)) {
        updateTask(state, 'add')
        dispatch({ type: 'reset' })
      } else alert('Too many tasks in a given implementation phase')
    }
    const copyErrors = errors.map(error => {
      return { text: error, id: uuid() }
    })
    setErr(copyErrors)
  }

  return (
    <>
      <section className={'section__form'}>
        <h3 className={'section__form--title'}>
          Add task
        </h3>
        <form onSubmit={(e) => handleForm(e)}>
          <label htmlFor={'name'}>
            Task name:
            <input
              className ={'form__input'}
              name={'name'}
              value={name}
              onChange={e => dispatch({ type: 'change', element: e.target })}
            />
          </label>
          <label htmlFor={'user'}>
            User:
            <input
              className ={'form__input'}
              name={'user'}
              value={user}
              onChange={e => dispatch({ type: 'change', element: e.target })}
            />
          </label>
          <label htmlFor={'idColumn'}>
            Implementation phase:
            <select
              className ={'form__input'}
              name={'idColumn'}
              value={idColumn}
              onChange={(e) => dispatch({ type: 'change', element: e.target })}
            >
              <option
                name={'idColumn'}
                value={0}
                onChange={e => dispatch({ type: 'change', element: e.target })}
              >
              </option>
              <option
                name={'idColumn'}
                value={1}
                onSelect={e => dispatch({ type: 'change', element: e.target })}
              >
                To Do
              </option>
              <option
                name={'idColumn'}
                value={2}
                onClick={e => dispatch({ type: 'change', element: e.target })}
              >
                Analysis
              </option>
              <option
                name={'idColumn'}
                value={3}
                onChange={e => dispatch({ type: 'change', element: value })}
              >
                Development
              </option>
              <option
                name={'idColumn'}
                value={4}
                onChange={e => dispatch({ type: 'change', element: value })}
              >
                Testing
              </option>
              <option
                name={'idColumn'}
                value={5}
                onChange={e => dispatch({ type: 'change', element: value })}
              >
                Done
              </option>
            </select>
          </label>
          <label htmlFor={'deadline'}>
            Deadline
            <input
              className ={'form__input'}
              name={'deadline'}
              placeholder={'YYYY-MM-DD'}
              value={deadline}
              onChange={e => dispatch({ type: 'change', element: e.target })}
            />
          </label>
          <input
            className= {'btn-add'}
            value= {'Add'}
            type={'submit'}
          />
        </form>
      </section>
      {
                err.length > 0 &&
                <>
                  <section className={'errors'}>
                    <h3 className={'errors__title'}>
                      Incorrect data was entered!
                    </h3>
                    <ul>{err.map(({ text, id }) =>
                      <li
                        className={'errors__item'}
                        key={id}
                      >
                        {text}
                      </li>)}
                    </ul>
                  </section>
                </>
            }
    </>
  )
}

export default Form
