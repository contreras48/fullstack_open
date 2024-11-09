const Form = ({ value, onChangeHandler }) => {

  return (
    <div>
      <form action="">
        <label htmlFor="countryText">find countries</label>
        <input id='countyText' type="text" value={value} onChange={onChangeHandler} />
      </form>
    </div>
  )
}

export default Form;