import React, { Component } from "react";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import { deleteUser,getUsers } from "../../services/userService";
import { connect } from "react-redux";

class UserList extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    getUsers().then((response) => {
      this.setState({
        users: response.data.data,
      });
    });
  }

  deleteUser(userId) {
    deleteUser(userId).then((result) => console.log(result));
  }

  alert = (userFirstName,userLastName) => {
    alertify.success(userFirstName +" "+userLastName+" kullanıcı silindi.");
  };

  reflesh = () => {
    window.location.assign("/users");
  };

  comps(userId,userFirstName,userLastName) {
    deleteUser(userId);
    this.alert(userFirstName,userLastName);
    setTimeout(() => {
      this.reflesh();
    }, 2000);
  }

  render() {
    const renderUsers = (user) => {
      
      if(this.props.store.userRoleId===1 && user.userStatus){
        return (
          <div className="col-md-4 mr-1" style={{ maxWidth: "350px" }}>
            <div className="card" style={{margin:10, minHeight:"350px"}}>
              <div className="card-body">
                <h5 className="card-title">{user.userFirstName+" "+user.userLastName}</h5>
                <p className="card-text">
                  {user.userEmail}
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                <b>Kullanıcı durmu: </b>{user.userStatus ? "Aktif Kullanıcı" : "Aktif Kullanıcı"}
                </li>
                <li className="list-group-item"><b>Statü: </b>{user.userRole.userRole}</li>
              </ul>
              <div className="card-body text-center">
                <Link to={`/users/userUpdate/${user.userId}`}>
                  <button type="button" className="btn btn-success me-1">
                    Güncelle
                  </button>
                </Link>

                <button
                  onClick={() => this.comps(user.userId,user.userFirstName,user.userLastName)}
                  type="button"
                  className="btn btn-danger"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        );
      }
    };

    return (
      <div className="row container">
        <div class="card-group">{this.state.users.map(renderUsers)}</div>

        <div className="text-center mt-3">
          <Link to={"/users/userAdd"}>
            <button type="button" className="btn btn-primary">
              Kullanıcı Ekle
            </button>
          </Link>
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

export default connect(mapStateToProps)(UserList);
