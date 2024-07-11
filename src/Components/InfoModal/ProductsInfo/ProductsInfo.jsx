import Close from "../../../Assets/images/icons/close.svg";

function ProductsInfo({
  infoModal,
  setInfoModal,
  info_title_uz,
  info_title_ru,
  info_description_uz,
  info_description_ru,
  info_id,
  img,
  info_price,
  date,
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
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-based in JavaScript
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
            <button
              onClick={() => {
                setInfoModal(false);
              }}
            >
              <img className="close" src={Close} alt="" />
            </button>
            <h1>
              <span>Id Новости: </span> {info_id}
            </h1>
            <p>
              <span>Название uz: </span> {info_title_uz}
            </p>
            <p>
              <span>Название ru: </span> {info_title_ru}
            </p>
            <p>
              <span>Описание uz:</span> {info_description_uz}
            </p>
            <p>
              <span>Описание ru: </span> {info_description_ru}
            </p>
            <p>
              <span>Цена: </span> {info_price}
            </p>
            <img src={img} className="user_img" alt="" />
            <p>
              <span>Дата: </span> {formatDate(date)}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ProductsInfo;
