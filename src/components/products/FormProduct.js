import PropTypes from 'prop-types';
function FormProduct({
    onSubmitHandler,
    formInputOnChange,
    btnXoaFormOnClick,
    formData,

}){

    return(
        <div className="mt-5 d-flex justify-content-center">
        <form className="col-6" onSubmit={onSubmitHandler}>
          <div className="form-group row">
            <label className="col-2 col-form-label">Id</label>
            <div className="col-10">
              <input
                value={formData.id}
                onChange={formInputOnChange}
                type="text"
                disabled
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label">Tên SP</label>
            <div className="col-10">
              <input
                value={formData.ten_san_pham}
                onChange={formInputOnChange}
                type="text"
                name="ten_san_pham"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label">Giá SP</label>
            <div className="col-10">
              <input
                value={formData.gia_san_pham}
                onChange={formInputOnChange}
                type="number"
                name="gia_san_pham"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label"> Loại SP</label>
            <div className="col-10">
              <input
                value={formData.loai_sp}
                onChange={formInputOnChange}
                type="text"
                name="loai_sp"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label"> Ảnh</label>
            <div className="col-10">
              <input
                value={formData.img}
                onChange={formInputOnChange}
                type="text"
                name="img"
                className="form-control"
              />
            </div>
          </div>
          <div>
            <button className="btn btn-primary">
              Lưu
              </button>
            <button
              type="reset"
              onClick={btnXoaFormOnClick}
              className="btn btn-danger ml-4">
              Xóa form
              </button>
          </div>
        </form>
      </div>
    );
}

FormProduct.dropTypes = {
  data: PropTypes.arrayOf(
      PropTypes.shape({
          id: PropTypes.number.isRequired,
          nten_san_pham: PropTypes.string.isRequired,
          gia_san_pham: PropTypes.string.isRequired,
          loai_sp:PropTypes.string.isRequired,
          img: PropTypes.string.isRequired,
      })
  ).isRequired
};

export default FormProduct;