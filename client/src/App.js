import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Resources from "./components/pages/Resources";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/resources" component={Resources}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
