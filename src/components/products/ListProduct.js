
function ListProduct({
    listSP,
    btnUpdateOnClick,
    btnDeleteOnClick,
}){
    return(
        <div className="mt-5 d-flex justify-content-center">
        <table className="table table-striped col-8">
          <thead className="table-dark">
            <tr>
              <td>Id</td>
              <td>Tên SP</td>
              <td>Giá Sp</td>
              <td>Loại Sp</td>
              <td>Thao Tác</td>
            </tr>
          </thead>
          <tbody>
            {
              listSP.map(function (value, index) {
                return (
                  <tr key={index}>
                    <td>{value.id}</td>
                    <td>{value.ten_san_pham}</td>
                    <td>{value.gia_san_pham}</td>
                    <td>{value.loai_sp}</td>
                    <td>
                      <button
                        onClick={function (event) {
                          btnUpdateOnClick(event, value, index);
                        }}
                        className="btn btn-primary">
                        Update</button>
                      <button
                        onClick={function (event) {
                          btnDeleteOnClick(event, value, index);
                        }}
                        className='btn btn-danger ml-5'
                      >Delete</button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
}

export default ListProduct;