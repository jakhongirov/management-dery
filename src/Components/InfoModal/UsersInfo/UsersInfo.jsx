import { Link } from "react-router-dom";
import Close from "../../../Assets/images/icons/close.svg";
import "./UsersInfo.scss";

function UsersInfo({
  infoModal,
  setInfoModal,
  info_id,
  info_name,
  info_age,
  info_cashback,
  info_gender,
  info_phone,
  info_personal,
  info_bonus,
  date,
  info_birthay,
}) {
  const closeModal = () => {
    setInfoModal(false);
  };

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
          <div className="info_modal" onClick={stopPropagation}>
            <button onClick={() => setInfoModal(false)}>
              <img className="close" src={Close} alt="" />
            </button>
            <h1>
              <span>Id Пользователя: </span> {info_id}
            </h1>
            <p>
              <span>Имя Пользователя: </span> {info_name}
            </p>
            <p>
              <span>Возраст: </span> {info_age}
            </p>
            <p>
              <span>День рождения: </span> {info_birthay}
            </p>
            <p>
              <span>Кэшбэк: </span> {info_cashback}
            </p>
            <p>
              <span>Пол: </span> {info_gender}
            </p>
            <p>
              <span>Телефон номер: </span> {info_phone}
            </p>
            <p>
              <span>Накопительный: </span> {info_personal}
            </p>
            <p>
              <span>Реферальный бонус: </span> {info_bonus}
            </p>
            <p>
              <span>Дата: </span> {formatDate(date)}
            </p>
            <Link to={`/history/${info_id}`}>
              <button className="history">История заказов</button>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default UsersInfo;
