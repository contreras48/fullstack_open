import { useState, useEffect } from 'react'
import countriesServices from './service/countries'
import Form from './components/Form'
import ListCountries from './components/ListCountries'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [list, setList] = useState([]);

  const onChangeHandler = (evt) => {
    const value = evt.currentTarget.value;
    
    setList(value ? countries.filter(c => c.name.common.toLowerCase().includes(value.toLowerCase())) : [])
    setCountry(value);

  } 

  useEffect(() =>{
    countriesServices
      .getAll()
      .then(data => setCountries(data))

  }, [])
  
  return (
    <div>
      <Form value={country} onChangeHandler={onChangeHandler}/>
      <ListCountries countries={list} />
    </div>
  )
}

export default App
