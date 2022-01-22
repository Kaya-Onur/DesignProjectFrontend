import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
import Input from "../component/Input";
import { updateUser } from "../../services/userService";

class ProfileCard extends Component {
  state = {
    userFirstName: null,
    userLastName: null,
    userEmail: null,
    userPassword: null,
    userStatus: null,
    userRoleId: null,
    companyId: null,
    pendingApicall: false, //tek request atabilmek için ekledim.
    errors: {},
  };

  alert = () => {
    alertify.success("Bilgileriniz  güncellendi.");
  };

  alertError = () => {
    alertify.error("Bilgileriniz güncellenemedi bilgilerinizi kontrol ediniz.");
  };

  reflesh = () => {
    window.location.assign("/");
  };

  onChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...this.state.errors }; //inputa kullanıcı herhangi bir giriş yapmaya başlayınca hata mesajının silinmesi için
    errors[name] = undefined; //inputa kullanıcı herhangi bir giriş yapmaya başlayınca hata mesajının silinmesi için
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignUp = async (event) => {
    event.preventDefault();
    const {
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      userStatus,
      userRoleId,
      companyId,
    } = this.state;
    const body = {
      userId: this.props.match.params.userId,
      userFirstName: this.props.store.userFirstName,
      userLastName: this.props.store.userLastName,
      userEmail,
      userPassword,
      userStatus: this.props.userStatus,
      userRoleId: this.props.store.userRoleId,
      companyId: this.props.store.companyId,
    };

    this.setState({ pendingApicall: true });

    try {
      const response = await updateUser(body);
      this.alert();
      setTimeout(() => {
        this.reflesh();
      }, 1000);
    } catch (error) {
      this.alertError();
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }
    this.setState({ pendingApicall: false });
  };
  render() {
    const { errors } = this.state;
    const {
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      userStatus,
      userRoleId,
      companyId,
    } = errors;

    return (
      <div className="container mt-4">
        <h1 className="text-center">Kullanıcı Bİlgileriniz</h1>
        <form>
          <Input
            label="İsim"
            name="userFirstName"
            onChange={this.onChange}
            error={userFirstName}
            placeholder={this.props.store.userFirstName}
            disabled
          />

          <Input
            label="Soyisim"
            name="userLastName"
            onChange={this.onChange}
            error={userLastName}
            placeholder={this.props.store.userLastName}
            disabled
          />

          <Input
            label="Email"
            name="userEmail"
            onChange={this.onChange}
            error={userEmail}
            placeholder={this.props.store.userEmail}
          />

          <Input
            label="Şifre"
            name="userPassword"
            onChange={this.onChange}
            type="password"
            error={userPassword}
          />

          <div className="text-center mt-3"> 
            <Link to="/">
              <button
                disabled={this.state.pendingApicall}
                className="btn btn-success"
                onClick={this.onClickSignUp}
              >
                Güncelle
              </button>
            </Link>
            <Link to="/">
              <button className="btn btn-warning">
                Ana Sayfa
              </button>
            </Link>  
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    store,
  };
};
export default connect(mapStateToProps)(withRouter(ProfileCard));
