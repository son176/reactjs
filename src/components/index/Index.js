import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
function Index() {
    const url = "https://60139de054044a00172dda66.mockapi.io/api/v1/my-product/";
    const [listSP, setListSanPham] = useState([]);
    useEffect(function () {
        axios.get(url)
            .then(function (response) {
                // Destructuring -ES6
                const { data } = response;
                setListSanPham(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {/* side */}
            <div id="carouselExampleCaptions" className="carousel slide mt-3" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner ">
                    <div className="carousel-item active">
                        <img src="Img/slide.png" className="d-block w-100" height='300px' alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="Img/slide1.jpg" className="d-block w-100" height='300px' alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="Img/slide2.jpg" className="d-block w-100" height='300px' alt="..." />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only" >Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            {/* side */}

            <div className="container">
                <div className="row mt-5">
                    <h2 className="list-product-tite">New Product</h2>
                    <div className="list-product-subtite">
                        <p>List product</p>
                    </div>
                
                        <div className="row">
                            {
                                listSP.map(function (value, index) {
                                    const {length} = listSP;
                                    
                                    if(length > 8){
                                        if (index >=  length * 1 - 8*1) {
                                            return (
                                                <div key={index} className="col-md-3 col-sm-6 col-12">
                                                   <div className="card card-product md-3">
                                                   <img className="card-img-top" src={value.img}/> 
                                                    <div className="card-body">
                                                        <h5 className="card-title"> {value.ten_san_pham} </h5>
                                                        <h5 className="card-text">  {value.gia_san_pham} VND</h5>
                                                    </div>
                                                   </div>
                                                </div>
                                            );
                                        }
                                    }else{
                                        return (
                                            <div key={index} className="col-md-3 col-sm-6 col-12">
                                               <div className="card card-product md-3">
                                               <img className="card-img-top" src={value.img} /> 
                                                <div className="card-body">
                                                    <h5 className="card-title"> {value.ten_san_pham} </h5>
                                                    <h5 className="card-tile">  {value.gia_san_pham} VND</h5>
                                                </div>
                                               </div>
                                            </div>
                                        );
                                    }
                                })
                            }
                        </div>
                 
                </div>

            </div>
        </div>
    );
}
export default Index;