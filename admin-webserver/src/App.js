import './App.css';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <div className='container' >
      <h1> UniGuide! </h1>
          <p> Enter your paper information </p>
          <p1> Please enter the items in the Prerequsite list as comma seperated entries</p1>
        </div>

        <div className='container'>
          <Form />
        </div>
    </div>
  );
}

export default App;
