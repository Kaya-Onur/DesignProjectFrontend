import logo from './logo.svg';
import './App.css';
import UserAdd from './pages/user/UserAdd';
import UserList from './pages/user/UserList';
import AdvertList from './pages/advert/AdvertList';
import AdvertTypeList from './pages/advertType/AdvertTypeList';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Switch } from "react-router";
import { Component } from "react";
import { connect } from "react-redux";
import "alertifyjs/build/css/alertify.min.css";
import Navbar from "./pages/home/Navbar";
import Category from "./pages/home/Category";
import LoginPage from "./pages/user/LoginPage";
import Footer from "./pages/home/Footer";
import AdvertAdd from './pages/advert/AdvertAdd';
import AdvertUpdate from './pages/advert/AdvertUpdate';
import AdvertListUser from './pages/advert/AdvertListUser';
import AdvertListDog from './pages/advert/AdvertListDog';
import AdvertListBird from './pages/advert/AdvertListBird';
import AdvertListCat from './pages/advert/AdvertListCat';


class App extends Component {
  render() {
    const { isLoggedIn } = this.props.store;

    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <div className="row">
              
                <div className="col-md-3 mt-4">
                  <Category />
                </div>
              
              <div className="col-md-9 mt-4">
                <Switch>
                  {" "}
                  <Route exact path="/" component={AdvertList} />
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/users/userAdd" component={UserAdd} />
                  <Route exact path="/users" component={UserList} />
                  <Route exact path="/advertTypes" component={AdvertTypeList} />
                  <Route exact path="/adverts/advertAdd" component={AdvertAdd} />
                  <Route exact path="/adverts/advertUpdate/:advertId" component={AdvertUpdate} />
                  <Route exact path="/user/advertUser" component={AdvertListUser} />

                  <Route exact path="/dogs" component={AdvertListDog} />
                  <Route exact path="/birds" component={AdvertListBird} />
                  <Route exact path="/cats" component={AdvertListCat} />
                  
                 
                  <Redirect to="/" />
                </Switch>
              </div>
            </div>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    store,
  };
};

export default connect(mapStateToProps)(App);
