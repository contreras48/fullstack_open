import Country from "./Country";

const ListCountries = ({ countries }) => {

  const list = <ul>
    {countries.map(c => <li key={c.cca2}>{c.name.common}</li>)}
  </ul>

  return (
    <div>
      {countries.length === 0 && null}
      {countries.length === 1 && <Country country={countries[0]}/>}
      {(countries.length > 1 && countries.length <= 10) && list}
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
    </div>
  );
}

export default ListCountries