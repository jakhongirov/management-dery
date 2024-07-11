import Close from "../../../Assets/images/icons/close.svg";

function ReviewsInfo({
  infoModal,
  setInfoModal,
  info_id,
  info_name,
  info_phone,
  info_review,
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
              <span>Id Отзыва: </span> {info_id}
            </h1>
            <p>
              <span>Имя пользователя: </span> {info_name}
            </p>
            <p>
              <span>Номер пользователя: </span> {info_phone}
            </p>
            <p>
              <span>Отзыв: </span> {info_review}
            </p>
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

export default ReviewsInfo;
