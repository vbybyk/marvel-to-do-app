function useRandomResetCounter(value) {
  const [counter, setCounter] = React.useState(value);

  const randomCounter = () => {
      setCounter((Math.random() * (50 - -50) + -50).toFixed(0))
    }

  const resetCounter = () => {
      setCounter(value)
    }

  const incCounter = () => {
      if (counter < 50) {
        setCounter(counter => counter + 1)
      }
    }

    const decCounter = () => {
      if (counter > -50) {
        setCounter(counter => counter - 1)
      }
    }

  return {counter, randomCounter, resetCounter, incCounter, decCounter}
}

const Counter = (props) => {

    const {counter, randomCounter, resetCounter, incCounter, decCounter} = useRandomResetCounter(props.counter);


    return (
      <div className="component">
        <div className="counter">{counter}</div>
        <div className="controls">
          <button onClick={incCounter}>INC</button>
          <button onClick={decCounter}>DEC</button>
          <button onClick={randomCounter}>RND</button>
          <button onClick={resetCounter}>RESET</button>
        </div>
      </div>
    )
}

const RndCounter = (props) => {
    const {counter, randomCounter, resetCounter} = useRandomResetCounter(props.counter);

    return (
      <div className="component">
        <div className="counter">{counter}</div>
        <div className="controls">
          <button onClick={randomCounter}>RND</button>
          <button onClick={resetCounter}>RESET</button>
        </div>
      </div>
    )
}

const App = () => {
    return (
        <>
            <Counter counter={0}/>
            <RndCounter counter={5}/>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));

