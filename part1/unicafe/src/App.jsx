import { useState } from 'react'

const Statistcs = (props) => {
  const avegare = () => (props.good - props.bad) / (props.good + props.neutral + props.bad);

  const positive = () => (props.good) / (props.good + props.neutral + props.bad) * 100;

  return (
    <div>
      <h2>statistcs</h2>
      {
        props.good + props.neutral + props.bad === 0
          ? <div>No feedback given</div>
          : <div>
            <div>
              good {props.good}
            </div>
            <div>
              neutral {props.neutral}
            </div>
            <div>
              bad {props.bad}
            </div>
            <div>
              all {props.good + props.neutral + props.bad}
            </div>
            <div>
              average {avegare()}
            </div>
            <div>
              positive {positive()}%
            </div>
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
        <button onClick={() => setGood(g => g + 1)}>good </button>
        <button onClick={() => setNeutral(n => n + 1)}>neutral </button>
        <button onClick={() => setBad(b => b + 1)}> bad</button>
      </div>
      <Statistcs good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
