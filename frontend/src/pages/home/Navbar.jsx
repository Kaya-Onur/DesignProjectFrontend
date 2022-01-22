import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutSuccess } from "../../redux/authActions";

class Navbar extends Component {
  render() {
  

    const isLoggedIn = this.props.store.isLoggedIn;
    const userFirstName = this.props.store.userFirstName;
    const userLastName = this.props.store.userLastName;
    const userEmail = this.props.store.userEmail;
    const userId = this.props.store.userId;
    let links = (
      <ul className="navbar-nav ms-auto">
        <li>
          {" "}
          <Link className="nav-link" to="/users/userAdd">
            Üye ol
          </Link>
        </li>
        <li>
          {" "}
          <Link className="nav-link" to="/login">
            Giriş yap
          </Link>
        </li>
      </ul>
    );
    if (isLoggedIn) {
      links = (
        <ul className="navbar-nav ms-auto">
          <li>
            {" "}
            <Link className="nav-link" to={"/user/advertUser"}>
              {/* userEmail yerine userId olacak */}
              {userFirstName!=undefined && (userFirstName + " " + userLastName)}
            </Link>
          </li>
          <li
            onClick={this.props.onLogoutSuccess}
            style={{ cursor: "pointer" }}
          >
            <Link className="nav-link" to={"/"}>
              Çıkış yap
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <div className="shadow-sm bg-light mb-1">
        <nav className="navbar navbar-expand-lg navbar-light container">
          <Link className="navbar-brand" to="/">
            PETS
          </Link>

          {links}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    store,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutSuccess: () => {
      return dispatch(logoutSuccess());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
