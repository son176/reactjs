import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Card from './Card';
import './Cate.css';
function Categories() {
    const urlParams = new URLSearchParams(window.location.search);
    let pageInit = urlParams.get('page') != null ? parseInt(urlParams.get('page')) : 1;
    const [page, setPage] = useState(pageInit);
    const [listSP, setListSanPham] = useState([]);
    const limit = 8;
    const url = "https://60139de054044a00172dda66.mockapi.io/api/v1/my-product?limit=" +
        limit + "&page=" + page;

    useEffect(() => {
        const result = axios({
            method: "GET",
            url: url,
        }).then(
            (response) => {
                const { data } = response;
                setListSanPham(data);
            }
        ).catch((error) => {
            console.log(error, error.response);
        });

    }, [
        page,
    ]);


    const nextPage = function () {
        let maxpage = listSP.length-1;
        if(page >=maxpage){
          return;
        }
        setPage(page + 1);
    }

    const previosPage = function () {
        if (page == 1) {
            return;
        }

        setPage(page - 1);
    }
    let [productNew, setproductNew] = useState("");
    const filterProducts = function (hang) {
        let filter = []
        listSP.map((value, index) => {
            if (value.loai_sp == hang) {
                filter.push(value)
            } else if (hang == "Tatca") {
                return listSP;
            }
        })
        setproductNew(filter)
    }
    // 
    const [searchText, setSearchText] = useState("");
    const excludeColumns = ["id"];
    const onChangeIputValue = (value) => {
        setSearchText(value);
        filterData(value);
    };

    const filterData = (value) => {

        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "" || lowercasedValue === "all") {
            setproductNew(listSP)
        }
        else {
            const filteredData = listSP.filter(item => {
                return Object.keys(item).some(key =>
                    excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
                );
            });
            setproductNew(filteredData);
        }
    }
    // card
    const [cartPro, setCartPro] = useState([])
    const onAddToCart = function (value) {
        let mua = false;
        let soluong = 0;
        if(cartPro.length>0){
          for(let i = 0; i<cartPro.length; i++){
            if(cartPro[i].id == value.id){
              mua = true;
              soluong = cartPro[i].so_luong + 1 ;
              break;
            }
          }
        }
        if(mua){
          setCartPro(oldState=>{
            const list = oldState.map(function(val){
              return value.id == val.id ? {...val,so_luong: soluong}:val
            })
            return list
          })
        }else{
          setCartPro(oldState=>([...oldState,value]))
        }
    }
    return (
        <div className="container mt-3">
            <form className="form-inline my-2 my-lg-0 justify-content-center">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                    value={searchText}
                    onChange={e => onChangeIputValue(e.target.value)}
                />
                <span className="input-group-btn">
                    <button
                        className="btn btn-info"
                        type="button"
                        onClick={() => onChangeIputValue('')}
                    >
                        Clear
          </button>
                </span>
            </form>
            <div className="row">
                <div className="col-md-2 ">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Fillter
                       </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button onClick={() => { filterProducts("Tatca") }} className="dropdown-item" type="button">Tất cả</button>
                            <button onClick={() => { filterProducts("điện thoại") }} className="dropdown-item" type="button">Iphone</button>
                            <button onClick={() => { filterProducts("laptop") }} className="dropdown-item" type="button">LapTop</button>
                        </div>
                    </div>
                </div>
                <div className="container">
                            <div className="row mt-5">
                                {
                                    productNew == "" ? listSP.map(function (value, index) {
                                        return (
                                            <div key={index} className="col-md-3 col-sm-6 col-12" >
                                                <div className="card card-product md-3">
                                                    <img className="card-img-top" src={value.img} />
                                                    <div className="card-body">
                                                        <h5 className="card-title"> {value.ten_san_pham} </h5>
                                                        <h5 className="card-text">  {value.gia_san_pham} VND</h5>
                                                        <button className="btn btn-primary"
                                                            onClick={() => {
                                                                value.so_luong = 1;
                                                                onAddToCart(value) }}
                                                        >Mua</button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }) : productNew.map(function (value, index) {
                                        return (
                                            <div key={index} className="col-md-3 col-sm-6 col-12">
                                                <div className="card card-product md-3">
                                                    <img className="card-img-top" src={value.img} />
                                                    <div className="card-body">
                                                        <h5 className="card-title"> {value.ten_san_pham} </h5>
                                                        <h5 className="card-text">  {value.gia_san_pham} VND</h5>
                                                        <button className="btn btn-primary"
                                                            onClick={() => { onAddToCart(value) }}
                                                        >Mua</button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                       
                    </div>
            </div>
            <ul className="pagination justify-content-center">
                        <li
                            onClick={previosPage}
                            className="page-item">
                            <a className="page-link" >Trang trước</a>
                        </li>
                        <li className="page-item"><a className="page-link">{page}</a></li>
                        <li
                            onClick={nextPage}
                            className="page-item">
                            <a className="page-link">Trang sau</a>
                        </li>
                    </ul>
            <Card
                cartPro={cartPro}
                setCartPro={setCartPro}
            />
        </div>
    );
}
export default Categories;