import React, { Component } from "react";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import { connect } from "react-redux";
import { getAdverts } from "../../services/advertService";
import {deleteAdvert} from "../../services/advertService";
import Image from "../component/Image";

class AdvertListUser extends Component {
  state = {
    adverts: [],
    searchCity:""
  };

  componentDidMount() {
    getAdverts().then((response) => {
      this.setState({
        adverts: response.data.data,
      });
     
    });
   
  }

  deleteAdvert(advertId) {
    deleteAdvert(advertId).then((result) => console.log(result));
  }

  alert = () => {
    alertify.success( "İlan silindi.");
  };

  reflesh = () => {
    window.location.assign("/");
  };

  comps(advertId) {
    deleteAdvert(advertId)
    this.alert();
    setTimeout(() => {
      this.reflesh();
    }, 2000);
  }
  onChangeSearch=(event)=>{
    this.setState({
      searchCity:event.target.value
    });
  }

  
  render() {
    const { userRoleId,userId} = this.props.store;
    console.log(this.state.adverts)

  
    return (
     
      <div className="row container">
      <div className="mt-1 ml-5"><p style={{float:"left"}}>Şehire Göre Ara  =   </p><input style={{marginLeft:5}} type="text" placeholder="Şehir yazınız..." onChange={this.onChangeSearch}></input></div>
        
        <div class="card-group">{this.state.adverts.filter((advert)=>{
          if(this.state.searchCity===""){return advert}
          else if(advert.address.city.cityName.toLocaleLowerCase().includes(this.state.searchCity.toLocaleLowerCase())){
            return advert
          }
        })  .map((advert)=>{
         
            if (advert.user.userId===userId) {
              return (
                <div className="col-md-4 mr-1" style={{ maxWidth: "350px" }}>
                  <div className="card">
                  <img className="card-img-top" src={advert.advertPhoto} alt="PetPhoto" />
                    <div className="card-body">
                      <h5 className="card-title">{advert.advertPetName}</h5>
                      <p className="card-text">
                      {advert.advertType.advertTypeName}
                      </p>
                    </div>
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>İlan türü: </b>
                        {advert.advertSort.advertSortName}
                      </li>
                      <li className="list-group-item">
                        <b>İlan tarihi: </b>
                        {advert.advertDate}
                      </li>

                      <li className="list-group-item">
                        <b>İlanı veren: </b>
                        {advert.user.userFirstName+" "+advert.user.userLastName}
                      </li>

                      <li className="list-group-item">
                        <b>İletişim No: </b>
                        {advert.advertPhoneNumber}
                      </li>
                      
                    </ul>

                    <div className="card-body text-center">
                      
                      <Link to={`/adverts/advertUpdate/${advert.advertId}`}>
                        <button type="button" className="btn btn-success me-1">
                          Güncelle
                        </button>
                      </Link>
    
                      <button
                        onClick={() => this.comps(advert.advertId)}
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
            
          }

        )}</div>

        {(userRoleId === 1 || userRoleId === 2) && (
          <div className="text-center mt-3">
            <Link to={"/adverts/advertAdd"}>
              <button type="button" className="btn btn-primary">
                İlan Ver
              </button>
            </Link>
          </div>
        )}
      </div>
   );
  }
}

const mapStateToProps = (store) => {
  return {
    store,
  };
};

export default connect(mapStateToProps)(AdvertListUser);

