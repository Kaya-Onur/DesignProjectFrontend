import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Category extends Component {
  render() {
    const { isLoggedIn, userRoleId } = this.props.store;
    return (
      <div>
        <div className="list-group" id="myList">

        <Link to="/" className="list-group-item list-group-item-action">
            Tüm İlanlar
          </Link>

          <Link to="/cats" className="list-group-item list-group-item-action">
            Kedi
          </Link>
          <Link to="/dogs" className="list-group-item list-group-item-action">
            Köpek
          </Link>
          <Link to="/birds" className="list-group-item list-group-item-action">
            Kuş
          </Link>
         

          {userRoleId === 1 && (
            <Link to="/advertTypes" className="list-group-item list-group-item-action">
              İlan Türü
            </Link>
          )}
          {userRoleId === 1 && (
            <Link to="/users" className="list-group-item list-group-item-action">
              Kullanıcılar
            </Link>
          )}

         
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    store,
  };
};

export default connect(mapStateToProps)(Category);
