import { useState, useEffect } from "react";

import Header from "../../Containers/Header/Header";
import http from "../../axios.config";
import DeleteSvg from "../../Assets/images/icons/delete.svg";
import useToken from "../../Hooks/useToken";
import ReviewsInfo from "../../Components/InfoModal/ReviewsInfo/ReviewsInfo";
import Pagination from "../../Components/Pagination/Pagination";

function Reviews() {
  const [page, setPage] = useState(1);
  const [token, setToken] = useToken();
  const [offset, setOffset] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [infoModal, setInfoModal] = useState(false);
  const [infoId, setInfoId] = useState("");
  const [infoName, setInfoName] = useState("");
  const [infoPhone, setInfoPhone] = useState("");
  const [infoReview, setInfoReview] = useState("");
  const [infoDate, setInfoDate] = useState("");

  const [studentsList, setStudentsList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`reviews/list?limit=15&page=1`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.status === 401) {
          setToken();
        } else {
          setStudentsList({
            isFetched: true,
            data: res.data.data,
            err: false,
          });
        }
      })
      .catch((error) =>
        setStudentsList({
          isFetched: true,
          data: [],
          err: error,
        })
      );
  }, [offset]);

  function truncateTextAfterWords(text) {
    const words = text.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return text;
  }
  console.log(studentsList);
  return (
    <div>
      {studentsList.isFetched ? (
        <div className="container">
          <Header />
          <ReviewsInfo
            infoModal={infoModal}
            setInfoModal={setInfoModal}
            info_id={infoId}
            info_name={infoName}
            info_phone={infoPhone}
            info_review={infoReview}
            date={infoDate}
          />
          <div className="table_wrap ">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Имя</th>
                  <th>Номер</th>
                  <th>Отзыв</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {studentsList.data?.map((user, index) => (
                  <tr key={index} className="table_tr">
                    <td>{++index}</td>
                    <td>{user.user_name}</td>
                    <td>{user.user_phone}</td>
                    <td>{truncateTextAfterWords(user.review)}</td>
                    <td className="btns">
                      <button
                        className="ellipsis"
                        onClick={() => {
                          setInfoId(user.review_id);
                          setInfoName(user.user_name);
                          setInfoPhone(user.user_phone);
                          setInfoReview(user.review);
                          setInfoDate(user.user_create_at);
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
          <Pagination page={page} setPage={setPage} data={studentsList.data} />
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

export default Reviews;
