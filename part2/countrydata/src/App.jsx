import { useState, useEffect } from 'react'
import countriesServices from './service/countries'
import Form from './components/Form'
import ListCountries from './components/ListCountries'
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [list, setList] = useState([]);

  const onChangeHandler = (evt) => {
    const value = evt.currentTarget.value;

    setList(value ? countries.filter(c => c.name.common.toLowerCase().includes(value.toLowerCase())) : [])
    setCountry(value);

  }

  const handleClick = (value) => setList([value])

  useEffect(() => {
    countriesServices
      .getAll()
      .then(data => setCountries(data))

  }, [])

  return (
    <div>
      <Form value={country} onChangeHandler={onChangeHandler} />
      {
        list.length === 1
          ? <Country country={list[0]} />
          : <ListCountries countries={list} onClick={handleClick} />
      }
    </div>
  )
}

export default App
