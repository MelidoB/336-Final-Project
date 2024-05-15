import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage'; 
import HomePage from './components/HomePage'; 
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserDashboard from './components/UserDashboard';
import Populate from './components/Populate'; 
import Drop from './components/Drop'; 
import AvailabilityList from './components/AvailabilityList'; 
import './App.css';
import RepairService from './components/RepairService';

import CleanTouchHeader from './components/clean_touch/HomePage'; // Home page for Clean Touch
import IndividualCompanyPage from './components/clean_touch/CompanyTemplate';
import MainSearch from './components/clean_touch/MainSearch.js';
import AboutUs from './components/clean_touch/AboutUs.js';

//Business homepage
import BusinessHomepage from './components/Business/BusinessHomepage.js';
import CreateAvailability from './components/Business/CreateAvailability.js';
import DeleteAvailability from './components/Business/DeleteAvailability.js';
import UpdateAvailability from './components/Business/UpdateAvailability.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} /> // Main landing page
        <Route path="/repair_wave" component={HomePage} /> // Repair Wave home page
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={UserDashboard} />
        <Route path="/populate" component={Populate} /> 
        <Route path="/drop" component={Drop} /> 
        <Route path="/availability-list" component={AvailabilityList} />

        <Route path='/repairservice' component={RepairService}/>

        {/*Clean Touch*/}
        <Route exact path="/clean_touch" component={CleanTouchHeader} /> // Clean Touch home page
        <Route path='/clean_touch/search' component={MainSearch}/>
        <Route path='/clean_touch/aboutUs' component={AboutUs}/>
        

        <Route path='/clean_touch/company/:companyName' component={IndividualCompanyPage}/>

        {/*Business homepage*/}
        <Route exact path='/business' component={BusinessHomepage}/>
        <Route exact path='/business/create' component={CreateAvailability}/>
        <Route exact path='/business/delete' component={DeleteAvailability}/>
        <Route exact path='/business/update' component={UpdateAvailability}/>

      </Switch>
    </Router>
  );
}

export default App;
