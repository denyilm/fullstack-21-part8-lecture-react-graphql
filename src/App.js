import React, { useState } from 'react'
import { gql, useApolloClient, useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notify from './components/Notify'
import { ALL_PERSONS } from './helpers/queries'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [ token, setToken ] = useState(null)

  /**
  * the use of the hook function useQuery is the dominant practice. 
  */
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  /**
   * https://www.apollographql.com/docs/react/api/react/hooks/#result
   */
  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage}/>
      <button onClick={logout}>logout</button>
      <Persons persons = {result.data.allPersons}/>
      <PersonForm setError={notify}/>
      <PhoneForm notify={notify}/>
    </div>

  )
}

export default App