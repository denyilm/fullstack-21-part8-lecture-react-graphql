import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { CREATE_PERSON, ALL_PERSONS, EDIT_NUMBER } from '../helpers/queries'
import PhoneForm from './PhoneForm'


const PersonForm = ({setError}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  /**
   * useMutation for making mutations
   */
  const [ createPerson ] = useMutation(CREATE_PERSON, {
      /**
       * fetching all persons is done again whenever a new person is created
       */
      refetchQueries: [ {query: ALL_PERSONS}],
      onError: (error) => {
          setError(error.graphQLErrors[0].message)
      }
  })

  const submit = (event) => {
    event.preventDefault()

    createPerson({  
      variables: { 
        name, street, city,
        phone: phone.length > 0 ? phone : undefined 
      } 
    })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street <input value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city <input value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default PersonForm