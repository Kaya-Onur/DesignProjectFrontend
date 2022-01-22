import React, { Component } from "react";
import Input from "../component/Input";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAdvertTypes } from "../../services/advertTypeService";
import { getByAdvertId } from "../../services/advertService";
import { updateAdvert } from "../../services/advertService";
import { getDistricts } from "../../services/districtService";
import {getCities} from "../../services/cityService";
import {getNeighbourhoods} from "../../services/neighbourhoodService";
import { getAdvertSorts } from "../../services/advertSortService";

class AdvertUpdate extends Component {
  state = {
    advertPetName: null,
    advertPhoneNumber: this.props.store.userPhoneNumber,
    advertDate: "1",
    advertStatus: null,
    advertAdvertTypeId:null,
    advertAdvertSortId:null,
    advertUserEmail:this.props.store.userEmail,
    pendingApicall: false, //tek request atabilmek için ekledim.
    errors: {},
    advertTypes: [],
    advertSorts:[],
    cities:[],
    districts:[],
    neighbourhoods:[],
    addressDescription:null,
    addressStatus:null,
    cityId:null,
    districtId:null,
    neighbourhoodId:null,
    advertPhoto:"",
    uptatedAdvert: {},
  };

  componentDidMount() {
    getAdvertTypes().then((response) => {
       this.setState({
         advertTypes: response.data.data,
       });
     });

     getAdvertSorts().then((response) => {
        this.setState({
          advertSorts: response.data.data,
        });
      });
 
     getCities().then((response) => {
         this.setState({
             cities: response.data.data,
         });
       });
 
       getDistricts().then((response) => {
         this.setState({
             districts: response.data.data,
         });
       });
 
       getNeighbourhoods().then((response) => {
         this.setState({
             neighbourhoods: response.data.data,
         });
       });

       getByAdvertId(this.props.match.params.advertId).then((response) => {
        this.setState({
          uptatedAdvert: response.data.data,
        });
      });
     
   }
  alert = () => {
    alertify.success("İlan  güncellendi.");
  };

  alertError = () => {
    alertify.error("İlan güncellenemedi bilgilerinizi kontrol ediniz.");
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

  onChangeFile=(event)=>{

    const file=event.target.files[0];
    const fileReader=new FileReader();
    fileReader.onloadend=()=>{
      this.setState({
        advertPhoto:  fileReader.result,
    });
     
    }
    fileReader.readAsDataURL(file);

  }

  onClickSignUp = async (event) => {

    console.log(this.state.uptatedAdvert);
    event.preventDefault();
    const {
      advertPetName,
      advertPhoneNumber,
      advertDate,
      advertStatus,
      advertAdvertTypeId,
      advertAdvertSortId,
      addressDescription,
      addressStatus,
      cityId,
      districtId,
      neighbourhoodId,
      advertUserEmail,
      advertPhoto
    } = this.state;
    const body = {
        advertId:this.props.match.params.advertId,
        advertPetName,
        advertPhoneNumber: this.props.store.userPhoneNumber,
        advertDate:"1",
        advertStatus:1,
        advertAdvertTypeId:this.state.uptatedAdvert.advertType.advertTypeId,
        advertAdvertSortId:this.state.uptatedAdvert.advertSort.advertSortId,
        advertUserEmail:this.props.store.userEmail,
        addressDescription,
        addressStatus:1,
        cityId,
        districtId,
        neighbourhoodId,
        advertPhoto:this.state.uptatedAdvert.advertPhoto
    };
    this.setState({ pendingApicall: true });
    try {
        this.setState({ pendingApicall: true });
        updateAdvert(body).then((response)=>{this.setState({result:response.data.success})})
    console.log(body)
      this.alert();
            setTimeout(() => {
              this.reflesh();
            }, 1000);
    } catch (error) {
      this.alertError();
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
        console.log(error);
      }
    }
    this.setState({ pendingApicall: false });
  };
  render() {
    const { errors } = this.state;
    const {
        advertPetName,
        advertPhoneNumber,
        advertDate,
        advertStatus,
        advertAdvertTypeId,
        advertAdvertSortId,
        addressDescription,
        addressStatus,
        cityId,
        districtId,
        neighbourhoodId,
        advertUserEmail,
        advertPhoto
    } = errors;

    return (
      <div className="container mt-4">
        <h1 className="text-center">İlan Güncelle</h1>
        <form>
         

        <input label="Evcil Hayvan Fotoğrafı" name="advertPhoto" type={"file"} onChange={this.onChangeFile}></input>

          <Input
            label="Evcil Hayvan Adı"
            name="advertPetName"
            onChange={this.onChange}
            error={advertPetName}
            placeholder={this.state.uptatedAdvert.advertPetName}
          />

        <div className="mt-2">
            <label>İlan Kategorisi</label>
          </div>
          <div className="input-group">
            <select
              className="form-select"
              name="advertAdvertTypeId"
              onChange={this.onChange}
              aria-label="Example select with button addon"
            >
              <option selected>Seçiniz...</option>
              {this.state.advertTypes.map((advertType) => {
                return (
                  <option value={advertType.advertTypeId}>
                    {advertType.advertTypeName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mt-2">
            <label>İlan Türü</label>
          </div>
          <div className="input-group">
            <select
              className="form-select"
              name="advertAdvertSortId"
              onChange={this.onChange}
              aria-label="Example select with button addon"
            >
              <option selected>Seçiniz...</option>
              {this.state.advertSorts.map((advertSort) => {
                return (
                  <option value={advertSort.advertSortId}>
                    {advertSort.advertSortName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mt-2">
            <label>İl</label>
          </div>
          <div className="input-group">
            <select
              className="form-select"
              name="cityId"
              onChange={this.onChange}
              aria-label="Example select with button addon"
            >
              <option selected>Seçiniz...</option>
              {this.state.cities.map((city) => {
                return (
                  <option value={city.cityId}>
                    {city.cityName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mt-2">
            <label>İlçe</label>
          </div>
          <div className="input-group">
            <select
              className="form-select"
              name="districtId"
              onChange={this.onChange}
              aria-label="Example select with button addon"
            >
              <option selected>Seçiniz...</option>
              {this.state.districts.map((district) => {
                return (
                  <option value={district.districtId}>
                    {district.districtName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mt-2">
            <label>Mahalle</label>
          </div>
          <div className="input-group">
            <select
              className="form-select"
              name="neighbourhoodId"
              onChange={this.onChange}
              aria-label="Example select with button addon"
            >
              <option selected>Seçiniz...</option>
              {this.state.neighbourhoods.map((neighbourhood) => {
                return (
                  <option value={neighbourhood.neighbourhoodId}>
                    {neighbourhood.neighbourhoodName}
                  </option>
                );
              })}
            </select>
          </div>

          <Input
            label="Adres Açıklama"
            name="addressDescription"
            onChange={this.onChange}
            error={addressDescription}
          />

         
          <div className="text-center mt-3">
          <Link to="/">
              <button
                disabled={this.state.pendingApicall}
                className="btn btn-primary"
                onClick={this.onClickSignUp}
              >
                Kaydet
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
  
  export default connect(mapStateToProps)(AdvertUpdate);