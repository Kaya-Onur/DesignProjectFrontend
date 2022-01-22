import React, { Component } from "react";
import Input from "../component/Input";
import { connect } from "react-redux";
import { loginHandler } from "../../redux/authActions";

class LoginPage extends Component {
  state = {
    userEmail: null,
    userPassword: null,
    error: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: null,
    });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { userEmail, userPassword } = this.state;
    const creds = {
      username: userEmail,
      password: userPassword,
    };
    this.setState({ error: null });

    try {
     await this.props.dispatch(loginHandler(creds));
    this.props.history.push("/");
    
    } catch (apiError) {
      this.setState({
        error: apiError.response.data.message,
      });
    }
  };

  render() {
    const buttonEnabled = this.state.userEmail && this.state.userPassword;
    return (
      <div className="container mt-4">
        <h1 className="text-center">Giriş Sayfası</h1>
        <form>
          <Input label="Email" name="userEmail" onChange={this.onChange} />
          <Input
            label="Şifre"
            name="userPassword"
            onChange={this.onChange}
            type="password"
          />
          {this.state.error && (
            <div className="alert alert-danger mt-3">
              Bilgilerinizi kontrol ediniz!
            </div>
          )}

          <div className="text-center mt-3">
            <button
              onClick={this.onClickLogin}
              className="btn btn-primary"
              disabled={!buttonEnabled}
            >
              Giriş Yap
            </button>
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



export default connect(mapStateToProps)(LoginPage);
