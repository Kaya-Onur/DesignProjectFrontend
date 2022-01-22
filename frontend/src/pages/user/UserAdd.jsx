import axios from "axios";
import React, { Component } from "react";
import alertify from "alertifyjs";
import { addUser } from "../../services/userService";
import Input from "../component/Input";
import { getUserRole } from "../../services/userRoleService";


export default class UserAdd extends Component {
  state = {
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPhoneNumber:"",
    userPassword: null,
    userRoleId: null,
    pendingApicall: false, //tek request atabilmek için ekledim.
    errors: {},
    userRoles: [],

  };

  componentDidMount() {
    getUserRole().then((response) => {
      this.setState({
        userRoles: response.data.data,
      });
    });
  }

  onChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...this.state.errors }; //inputa kullanıcı herhangi bir giriş yapmaya başlayınca hata mesajının silinmesi için
    errors[name] = undefined; //inputa kullanıcı herhangi bir giriş yapmaya başlayınca hata mesajının silinmesi için
    this.setState({
      [name]: value,
      errors,
    });
  };


  alert = () => {
    alertify.success("Kullanıcı  eklendi.");
  };

  alertError=()=>{
      alertify.error("Kullanıcı eklenemedi bilgileri kontrol ediniz.")
  }

  reflesh = () => {
    window.location.assign("/login");
  };

  onClickSignUp = async (event) => {
    event.preventDefault();
    const { userFirstName, userLastName, userPassword, userEmail, userRoleId,userPhoneNumber } =
      this.state;
    const body = {
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      userPhoneNumber,
      userRoleId:2
    };
    this.setState({ pendingApicall: true });

    try {
      const response = await addUser(body);
      this.alert();
            setTimeout(() => {
              this.reflesh();
            }, 1000);
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }
    this.setState({ pendingApicall: false });
  };

  render() {
    const { errors } = this.state;
    const { userFirstName, userLastName, userPassword, userEmail,userPhoneNumber} =
      errors;
    return (
      <div className="container mt-4">
        <h1 className="text-center">Kayıt Ol</h1>
        <form>
          <Input
            label="Kullanıcı Adı"
            name="userFirstName"
            onChange={this.onChange}
            error={userFirstName}
          />
          <Input
            label="Kullanıcı Soyadı"
            name="userLastName"
            onChange={this.onChange}
            error={userLastName}
          />
          <Input
            label="Email"
            name="userEmail"
            onChange={this.onChange}
            error={userEmail}
          />

          <Input
            label="Telefon No"
            name="userPhoneNumber"
            onChange={this.onChange}
            error={userPhoneNumber}
          />
          <Input
            label="Şifre"
            name="userPassword"
            onChange={this.onChange}
            error={userPassword}
            type="password"
          />

          <div className="text-center mt-3">
            <button
              disabled={this.state.pendingApicall}
              className="btn btn-primary"
              onClick={this.onClickSignUp}
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    );
  }
}
