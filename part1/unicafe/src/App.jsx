import { useState } from 'react'

const Button = (props) => {
  return <button onClick={() => props.handleClick()}>{props.text}</button>
}

const StatisticLine = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

const Statistics = (props) => {
  const average = () => (props.good - props.bad) / (props.good + props.neutral + props.bad);

  const positive = () => (props.good) / (props.good + props.neutral + props.bad) * 100;

  return (
    <div>
      <h2>statistcs</h2>
      {
        props.good + props.neutral + props.bad === 0
          ? <div>No feedback given</div>
          : <div>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
            <StatisticLine text="average" value={average()} />
            <StatisticLine text="positive" value={`${positive()}%`} />
          </div>
      }
    </div>
  )
}

const App = () => {
  //Guarda los clcks para cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <header>
        <h1>give feedback</h1>
      </header>
      <div>
        <Button text="good" handleClick={() => setGood(g => g + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(n => n + 1)} />
        <Button text="bad" handleClick={() => setBad(b => b + 1)} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
