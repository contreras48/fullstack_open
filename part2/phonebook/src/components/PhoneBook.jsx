import Person from './Person'

const Phonebook = ({ contacts }) => {
  return (
    <div>
      { contacts.map(c => <Person key={c.name} person={c} />) }
    </div>
  )
}

export default Phonebook;