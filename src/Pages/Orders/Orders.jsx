import { useState, useEffect } from "react";
import Header from "../../Containers/Header/Header";
import http from "../../axios.config";
import DeleteSvg from "../../Assets/images/icons/delete.svg";
import useToken from "../../Hooks/useToken";
import OrdersInfo from "../../Components/InfoModal/OrdersInfo/OrdersInfo";
import "./Orders.scss";
import Pagination from "../../Components/Pagination/Pagination";

function Orders() {
  const [page, setPage] = useState(1);
  const [token, setToken] = useToken();
  const [offset, setOffset] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [filterPhone, setFilterPhone] = useState("");

  const [orderList, setOrdersList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`orders/list?limit=15&page=1&phone=${filterPhone}`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.status === 401) {
          setToken();
        } else {
          console.log(res.data.data);
          setOrdersList({
            isFetched: true,
            data: res.data.data,
            err: false,
          });
        }
      })
      .catch((error) =>
        setOrdersList({
          isFetched: true,
          data: [],
          err: error,
        })
      );
  }, [offset, token, setToken, filterPhone]);

  const handleFilterChange = (e) => {
    setFilterPhone(e.target.value);
  };
  console.log(orderList);
  return (
    <div>
      {orderList.isFetched ? (
        <div className="container">
          <Header />
          <OrdersInfo
            infoModal={infoModal}
            setInfoModal={setInfoModal}
            selectedId={selectedId}
          />
          <div className="filter_wrap">
            <div class="group">
              <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
              <input
                type="text"
                placeholder="Фильтр по номеру телефона"
                value={filterPhone}
                onChange={handleFilterChange}
                class="input"
              />
            </div>
          </div>
          <div className="table_wrap_orders">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Итоговая сумма</th>
                  <th>Имя пользователя</th>
                  <th>Номер пользователя</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orderList.data.map((order, index) => (
                  <tr key={index} className="table_tr">
                    <td>{index + 1}</td>
                    <td>{order.order_total_price}</td>
                    <td>{order.user_name}</td>
                    <td>{order.user_phone}</td>
                    <td>{order.type}</td>
                    <td className="btns">
                      <button
                        className="ellipsis"
                        onClick={() => {
                          setSelectedId(order.order_id);
                          setInfoModal(true);
                        }}
                      >
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} setPage={setPage} data={orderList.data} />
        </div>
      ) : (
        <div className="loader">
          <div className="loader__wrap">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
            <div className="bar7"></div>
            <div className="bar8"></div>
            <div className="bar9"></div>
            <div className="bar10"></div>
            <div className="bar11"></div>
            <div className="bar12"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
