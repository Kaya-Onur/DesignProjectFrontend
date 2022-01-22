import React, { Component } from "react";

export default class Footer extends Component {
 
  render() {
    
    return (
      <div className="mt-4">
        <footer  className="bg-light text-warning pt-5 pb-1">
          <div className="container text-center">
            <div className="row">
              <div className="col-md-4 text-center">
                <h3>Erciyes Üniversitesi</h3>
                <p style={{ color: "black" }}>
                  Mühendislik Fakültesi
                </p>
                <p style={{ color: "black" }}>Talas/KAYSERİ</p>
                <p style={{ color: "black" }}>info@eru.com</p>
                <p style={{ color: "black" }}> Tel:0352 555 55 55 </p>
              </div>
              <div class="col-md-4 text-center">
                <h5>Mobil Uygulamalar</h5>
                <a
                  href="#"
                  style={{ color: "black" }}
                  className="text-decoration-none"
                >
                  Uygulama 1
                </a>
                <br />
                <a
                  href="#"
                  style={{ color: "black" }}
                  className="text-decoration-none"
                >
                  Uygulama 2
                </a>
              </div>
              <div className="col-md-4 text-center">
                
                  <h5>Çözüm Ortaklarımız</h5>
                
                <a
                  href="#"
                  style={{ color: "black" }}
                  className="text-decoration-none"
                >
                  Çözüm Ortak 1
                </a>
                <br />
                <a
                  href="#"
                  style={{ color: "black" }}
                  className="text-decoration-none"
                >
                  Çözüm Ortak 2
                </a>
                <h5 className="mt-5">Sosyal Medyada Biz</h5>
                <a href="#" className="ml-1">
                  <img src="https://img.icons8.com/office/32/000000/facebook-new.png" />
                </a>
                <a href="#" className="ml-1">
                  <img src="https://img.icons8.com/office/32/000000/instagram-new.png" />
                </a>
                <a href="#" className="ml-1">
                  <img src="https://img.icons8.com/office/32/000000/twitter.png" />
                </a>
                <a href="#" className="ml-1">
                  <img src="https://img.icons8.com/office/32/000000/youtube-play.png" />
                </a>
              </div>
            </div>
          </div>
          <p className="text-center" style={{ color: "black" }}>
          © 2022 Erciyes Üniversitesi
          </p>
        </footer>
      </div>
    );
  }
}
