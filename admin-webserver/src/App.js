import './App.css';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <div className='container' >
      <h1> UniGuide! </h1>
          <p> Enter your paper information </p>
        </div>

        <div className='container'>
          <Form />
        </div>
    </div>
  );
}

export default App;
