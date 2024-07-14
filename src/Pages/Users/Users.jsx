import { useState, useEffect } from "react";

import Header from "../../Containers/Header/Header";
import http from "../../axios.config";
import "./Users.scss";
import DeleteSvg from "../../Assets/images/icons/delete.svg";
import useToken from "../../Hooks/useToken";
import UsersInfo from "../../Components/InfoModal/UsersInfo/UsersInfo";
import Pagination from "../../Components/Pagination/Pagination";

function Users() {
  const [page, setPage] = useState(1);
  const [token, setToken] = useToken();
  const [offset, setOffset] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [infoModal, setInfoModal] = useState(false);
  const [infoName, setInfoName] = useState("");
  const [infoId, setInfoId] = useState("");
  const [infoAge, setInfoAge] = useState("");
  const [infoBirthay, setInfoBirthay] = useState("");
  const [infoCashback, setInfoCashback] = useState("");
  const [infoGender, setInfoGender] = useState("");
  const [infoPhone, setInfoPhone] = useState("");
  const [infoPersonal, setInfoPersonal] = useState("");
  const [infoBonus, setInfoBonus] = useState("");
  const [infoDate, setInfoDate] = useState("");
  const [filterPhone, setFilterPhone] = useState("");

  const [studentsList, setStudentsList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`users/list?limit=15&page=${page}&phone=${filterPhone}`, {
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
  }, [page, filterPhone]);

  const handleFilterChange = (e) => {
    setFilterPhone(e.target.value);
  };

  return (
    <div>
      {studentsList.isFetched ? (
        <div className="container">
          <Header />
          <UsersInfo
            info_name={infoName}
            info_age={infoAge}
            infoModal={infoModal}
            setInfoModal={setInfoModal}
            info_bonus={infoBonus}
            info_cashback={infoCashback}
            info_gender={infoGender}
            info_id={infoId}
            info_personal={infoPersonal}
            info_phone={infoPhone}
            date={infoDate}
            info_birthay={infoBirthay}
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
          <div className="table_wrap_users ">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Имя</th>
                  <th>Номер</th>
                  <th>Пол</th>
                  <th>Кэшбэк</th>
                  <th>Возраст</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {studentsList.data.map((user, index) => (
                  <tr key={index} className="table_tr">
                    <td>{++index}</td>
                    <td>{user.user_name}</td>
                    <td>{user.user_phone}</td>
                    <td>{user.user_gender}</td>
                    <td>{user.user_cashbek}</td>
                    <td>{user.user_age}</td>
                    <td className="btns">
                      <button
                        className="ellipsis"
                        onClick={() => {
                          setInfoName(user.user_name);
                          setInfoId(user.user_id);
                          setInfoGender(user.user_gender);
                          setInfoCashback(user.user_cashbek);
                          setInfoAge(user.user_age);
                          setInfoPhone(user.user_phone);
                          setInfoPersonal(user.user_personal);
                          setInfoBonus(user.user_referral_bonus);
                          setInfoDate(user.user_create_at);
                          setInfoBirthay(user.user_birthday);
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

export default Users;
