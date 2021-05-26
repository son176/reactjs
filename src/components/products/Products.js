import { useState, useEffect } from 'react';
import axios from 'axios';
import FormProduct from './FormProduct';
import ListProduct from './ListProduct';
function Products() {
  const formDataInit = {
    id: '',
    ten_san_pham: '',
    gia_san_pham: '',
    img: '',
    loai_sp: '',
  };
  const urlParams = new URLSearchParams(window.location.search);
  let pageInit = urlParams.get('page') != null ? parseInt(urlParams.get('page')) : 1;
  const [page, setPage] = useState(pageInit);
  const limit = 8;
  const url = "https://60139de054044a00172dda66.mockapi.io/api/v1/my-product?limit=" + limit + "&page=" + page;
  const [listSP, setListSanPham] = useState([]);
  const [formData, setFormDaTa] = useState(formDataInit);
  const [clickRow, setClickRow] = useState(-1);
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


  const url1 = "https://60139de054044a00172dda66.mockapi.io/api/v1/my-product/";
  const btnDeleteOnClick = function (event, value, index) {
    if (window.confirm( 'Bạn có muốn xóa')) {
      axios.delete(url1 + value.id)
      .then(function (response) {
        const list = listSP.filter(function (val, idx) {
          return idx == index ? false : true;
        });
        setListSanPham(list);
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      return value;
    }
    axios.delete(url1 + value.id)
      .then(function (response) {
        const list = listSP.filter(function (val, idx) {
          return idx == index ? false : true;
        });
        setListSanPham(list);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const formInputOnChange = function (event) {
    const { name, value } = event.target;
    setFormDaTa({
      ...formData,
      [name]: value,
    });
  }

  const onCreate = function () {
    axios.post(url1, formData)
      .then(function (response) {
        const { data } = response;
        setListSanPham([
          ...listSP,
          data,
        ]);
        setFormDaTa(formDataInit);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onUpdate = function () {
    const urlUpdate = url1 + formData.id
    axios.put(urlUpdate, formData)
      .then(function (response) {
        const { data } = response;
        const list = listSP.map(function (val, idx) {
          if (idx == clickRow) {
            return data;
          } else {
            return val;
          }
        });
        setListSanPham(list);
        setClickRow(-1);
        setFormDaTa(formDataInit);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  // đẩy lên api
  const onSubmitHandler = function (event) {
    event.preventDefault(); // k cho load lại trang form của html
    if(formData.ten_san_pham.length !=0 && formData.gia_san_pham.length !=0 && formData.loai_sp.length != 0 && formData.img.length !=0 && !isNaN(formData.gia_san_pham)){
      if (clickRow == -1) {
        onCreate();
      } else {
        onUpdate();
    }
    }else{
      let err="";
      if(formData.ten_san_pham.length==""){
       err+="tên sản phẩm không được để trống \n"
      }
      if(formData.gia_san_pham.length==""){
        err+= "giá sản phẩm không được để trống \n"
      }
      if(formData.loai_sp.length==""){
        err+= "loại sản phẩm không được để trống \n"
      }
      if(formData.img.length==""){
        err+="ảnh sản phẩm không được để trống \n"
      }
      return window.confirm(err);
    }
  }

  const btnUpdateOnClick = function (event, value, index) {
    setFormDaTa(value);
    setClickRow(index);
  }
  const btnXoaFormOnClick = function (event) {
    event.preventDefault();
    setFormDaTa(formDataInit);
    setClickRow(-1);
  }
  const nextPage = function () {
    let maxpage = listSP.length - 1;
    if (page >= maxpage) {
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


  return (
    <div className="App" >
      <FormProduct
        onSubmitHandler={onSubmitHandler}
        formInputOnChange={formInputOnChange}
        formData={formData}
        btnXoaFormOnClick={btnXoaFormOnClick}
      />
      <ListProduct
        listSP={listSP}
        btnUpdateOnClick={btnUpdateOnClick}
        btnDeleteOnClick={btnDeleteOnClick}
      />
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
    </div>
  );
}
export default Products;