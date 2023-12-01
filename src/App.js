import './App.css';
import Home from './Pages/Home';
import { Switch, Route } from 'react-router';
import { Redirect } from 'react-router';
import ShelterLocator from './Pages/ShelterLocator';
import VolunteerOpportunites from './Pages/VolunteerOpportunities';
import CaseManagement from './Pages/CaseManagement';
import Navbar from './Components/Random/Navbar'
import LegalAid from './Pages/LegalAid';
import HealthCareAccess from './Pages/HealthCareAccess';
import BlogPage from './Pages/BlogPage';
import GenerateCredentials from './Pages/GenerateCredentials';
import Listings from './Pages/Listings';
import Donation from './Pages/Donation'
import Permissions from './Pages/Permissions';


function App() {
  return (
    <>    

    <Navbar></Navbar>
    <Switch>
      <Route path='/' exact  >
        <Redirect to={'/home'}></Redirect>
      </Route>
      <Route path='/home' exact  >
        <Home></Home>
      </Route>
      <Route path='/ShelterLocator' exact  >
        <ShelterLocator></ShelterLocator>
      </Route>
      <Route path='/VolunteerOpportunities' exact  >
        <VolunteerOpportunites></VolunteerOpportunites>
      </Route>
      <Route path='/CaseManagement' exact  >
        <CaseManagement></CaseManagement>
      </Route>
      <Route path='/HealthAccess' exact>
        <HealthCareAccess></HealthCareAccess>
      </Route>
      <Route path='/GenerateCredentials' exact>
        <GenerateCredentials></GenerateCredentials>
      </Route>
      <Route path='/LegalOrganization' exact>
        <LegalAid></LegalAid>
      </Route>
      <Route path='/BlogPage' exact>
        <BlogPage></BlogPage>
      </Route>
      <Route path='/Listings' exact>
        <Listings></Listings>
      </Route>
      <Route path='/Donations' exact>
        <Donation></Donation>
      </Route>
      <Route path='/Permissions' exact>
        <Permissions></Permissions>
      </Route>
      <Route path='/' >
        <Redirect to={'/home'}></Redirect>
      </Route>
    </Switch>
    </>



  );
}

export default App;
