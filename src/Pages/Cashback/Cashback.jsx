import { useState, useEffect } from "react";

import Header from "../../Containers/Header/Header";
import http from "../../axios.config";
import DeleteSvg from "../../Assets/images/icons/delete.svg";
import useToken from "../../Hooks/useToken";
import Pagination from "../../Components/Pagination/Pagination";

function Cashback() {
  const [page, setPage] = useState(1);
  const [token, setToken] = useToken();
  const [offset, setOffset] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [studentsList, setStudentsList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`cashbek/list?limit=15&page=1`, {
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

  console.log(studentsList);

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
    <div>
      {studentsList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap ">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Сумма</th>
                  <th>Тип</th>
                  <th>Категория кэшбэка</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {studentsList.data?.map((cashback, index) => (
                  <tr key={index} className="table_tr">
                    <td>{++index}</td>
                    <td>{cashback.amount}</td>
                    <td>{cashback.type}</td>
                    <td>{cashback.cashbek_category}</td>
                    <td>{formatDate(cashback.cashbek_create_at)}</td>
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

export default Cashback;
