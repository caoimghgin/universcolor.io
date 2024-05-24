import logo from './logo.svg';
import './App.css';
import Color from './colorific/classes/Color';
import Column from './colorific/classes/Column';

function App() {

  // const color =  new Color('srgb', hexToDecimal("#8352C6"))
  const color = new Color('p3', [0, 1, 0])
  // const color = new Color("okhsl", [276, 0, 1])

  const column = new Column([color]);
  console.log(column.values("hex"))
  console.log(column.values())
  console.log(column)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
