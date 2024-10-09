import { useState } from 'react'

function App() {
  //Guarda los clcks para cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const avegare = () => (good - bad) / (good + neutral + bad);

  const positive = () => (good) / (good + neutral + bad) * 100;


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
      <div>
        <h2>statistcs</h2>
        <div>
          good {good}
        </div>
        <div>
          neutral {neutral}
        </div>
        <div>
          bad {bad}
        </div>
        <div>
          all {good + neutral + bad}
        </div>
        <div>
          average {avegare()}
        </div>
        <div>
          positive {positive()}%
        </div>
      </div>
    </>
  )
}

export default App
