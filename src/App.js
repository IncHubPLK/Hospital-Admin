import logo from './logo.svg';
import './App.css';
import AddFood from './components/addRestaurant';
import{BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Admin from './components/Admin';
import Editpage from './components/edit';
import Availabledocs from './components/Availabledocs';
import Prebookings from './components/Prebookings';
import ViewApps from './components/ViewApps';
import EditDocApp from './components/EditDocApp'
import addRes from './components/addRestaurant'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={AddFood}></Route>
          <Route exact path='/Admin' component={Admin}></Route>
          <Route exact path='/edit' component={Editpage}></Route>
          <Route exact path='/Availabledocs' component={Availabledocs}></Route>
          <Route exact path='/Prebookings' component={Prebookings}></Route>
          <Route exact path='/ViewApps' component={ViewApps}></Route>
          <Route exact path='/EditDocApp' component={EditDocApp}></Route>
          <Route exact path='/addRestaurant' component={addRes}></Route>
          
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;
