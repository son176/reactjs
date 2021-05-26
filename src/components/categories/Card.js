import { event } from "jquery";

function Card(
  {
    cartPro,
    setCartPro,
  }
) {

  const Clearheadler = function (value) {
    setCartPro([])
  }
  return (
    <section className="section">
      <div className="table-responsive">
        <h5 style={{ textAlign: "center", color: "red" }}>Giỏ Hàng</h5>
        <table className="table product-table">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Sản Phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Loại</th>
            </tr>
          </thead>
          <tbody>
            {cartPro.map((value, index) => {
              return (
                <tr key={index}>
                  <th><img src={value.img} height="20px"></img></th>
                  <th>{value.ten_san_pham}</th>
                  <th>{value.so_luong}</th>
                  <th>{value.gia_san_pham}</th>
                  <th>{value.loai_sp}</th>
                </tr>
                
              )
            })
            }
          </tbody>
        </table>
        <button  className="btn btn-danger" onClick={() => { Clearheadler(event) }} >Clear</button>
      </div>
    </section>
  );
}
export default Card;