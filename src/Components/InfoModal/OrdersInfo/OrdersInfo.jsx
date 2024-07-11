import { useState, useEffect } from "react";
import http from "../../../axios.config";
import useToken from "../../../Hooks/useToken";
import Close from "../../../Assets/images/icons/close.svg";
import "./OrdersInfo.scss";

function OrdersInfo({ infoModal, setInfoModal, selectedId }) {
  const [token, setToken] = useToken();

  const closeModal = () => {
    setInfoModal(false);
  };

  const [ordersList, setOrdersList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    if (selectedId) {
      http
        .get(`order/${selectedId}`, {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status === 401) {
            setToken();
          } else {
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
    }
  }, [selectedId, token, setToken]);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  return (
    <>
      {infoModal ? (
        <div className="modal_bg" onClick={closeModal}>
          <div className="info_modal_orders" onClick={stopPropagation}>
            <button onClick={closeModal}>
              <img className="close" src={Close} alt="Close" />
            </button>
            {ordersList.isFetched ? (
              <div className="order_info">
                <h1>
                  <span>ID заказа: </span> {ordersList.data.order_id}
                </h1>
                <p>
                  <span>Имя: </span> {ordersList.data.user_name}
                </p>
                <p>
                  <span>Телефон: </span> {ordersList.data.user_phone}
                </p>
                {ordersList.data?.order_products.map((e, index) => (
                  <div>
                    <p>
                      <span>Название продукта: </span> {e.product_name_ru}
                    </p>
                    <p>
                      <span>Описание ru: </span> {e.product_description_ru}
                    </p>
                    <p>
                      <span>Цена: </span> {e.product_price}
                    </p>
                    <img
                      src={e.product_image_url}
                      className="user_img"
                      alt="Order"
                    />
                    <p>
                      <span>Подсчет: </span> {e.count}
                    </p>
                    <p>
                      <span>Итог: </span> {e.total}
                    </p>
                  </div>
                ))}

                <p>
                  <span>Общая стоимость заказа: </span>{" "}
                  {ordersList.data.order_total_price}
                </p>
                <p>
                  <span>Доставка заказа: </span>{" "}
                  {ordersList.data.order_delivery ? "Да" : "Нет"}
                </p>

                <p>
                  <span>Дата: </span>{" "}
                  {formatDate(ordersList.data.order_create_at)}
                </p>
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
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default OrdersInfo;
