import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Containers/Header/Header";
import http from "../../axios.config";
import useToken from "../../Hooks/useToken";
import Pagination from "../../Components/Pagination/Pagination";

function History() {
  const [page, setPage] = useState(1);
  const [token, setToken] = useToken();
  const [offset, setOffset] = useState(0);
  const { id } = useParams();

  const [studentsList, setStudentsList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`cashbek/history?user_id=${id}&limit=15&page=1`, {
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
  }, [offset, id, token, setToken]);

  //   function truncateTextAfterWords(text) {
  //     const words = text.split(" ");
  //     if (words.length > 3) {
  //       return words.slice(0, 3).join(" ") + "...";
  //     }
  //     return text;
  //   }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  console.log(studentsList);
  console.log(id);
  return (
    <div>
      {studentsList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap">
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
                {studentsList.data?.map((user, index) => (
                  <tr key={index} className="table_tr">
                    <td>{index + 1}</td>
                    <td>{user.amount}</td>
                    <td>{user.type}</td>
                    <td>{user.cashbek_category}</td>
                    <td>{formatDate(user.cashbek_create_at)}</td>
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

export default History;
