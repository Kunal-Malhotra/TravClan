
import './App.css';
import Deatils from './Details';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Details2 from './Details2';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Deatils} />
        <Route path="/details" exact component={Details2} />
      </Router>
    </div>
  );
}

export default App;
