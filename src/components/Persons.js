import React, { useEffect, useState } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { FIND_PERSON } from '../helpers/queries'

// const FIND_PERSON = gql`
//   query findPersonByName($nameToSearch: String!) {
//     findPerson(name: $nameToSearch) {
//       name
//       phone 
//       id
//       address {
//         street
//         city
//       }
//     }
//   }
// `


/**
 * useQuery hook is well-suitde for situations where the query is done
 * when the component is rendered
 */
const Persons = ({ persons }) => {
    const [getPerson, result] = useLazyQuery(FIND_PERSON)
    const [person, setPerson] = useState(null)

    const showPerson = (name) => {
        getPerson({variables : {nameToSearch: name}})
    }

    const closePerson = () => {
        getPerson({variables : {nameToSearch:""}})
        setPerson(null)
    }

    useEffect(() => {
     if (result.data) {
         setPerson(result.data.findPerson)
     }
    }, [result])

    if (person) {
        console.log("STUUUF", person)
        return(
          <div>
            <h2>{person.name}</h2>
            <div>{person.address.street} {person.address.city}</div>
            <div>{person.phone}</div>
            <button onClick={() => closePerson()}>close</button>
          </div>
        )
    }

    return (
      <div>
        <h2>Persons</h2>
        {persons.map(p =>
          <div key={p.name}>
            {p.name} {p.phone}
            <button onClick={() => showPerson(p.name)} >
                show address
            </button> 
          </div>  
        )}
      </div>
    )
  }

export default Persons