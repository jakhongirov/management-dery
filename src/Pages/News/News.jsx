import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import Header from "../../Containers/Header/Header";
import http from "../../axios.config";
import Edit from "../../Assets/images/icons/edit.svg";
import DeleteSvg from "../../Assets/images/icons/delete.svg";
import useToken from "../../Hooks/useToken";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import AddNews from "../../Components/Add/AddNews/AddNews";
import NewsInfo from "../../Components/InfoModal/NewsInfo/NewsInfo";
import Pagination from "../../Components/Pagination/Pagination";

function News() {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [img, setImg] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [infoTitleUz, setinfoTitleUz] = useState("");
  const [infoTitleRu, setinfoTitleRu] = useState("");
  const [infoDescRu, setinfoDescRu] = useState("");
  const [infoDescUz, setinfoDescUz] = useState("");
  const [infoImg, setinfoImg] = useState("");
  const [date, setDate] = useState("");
  const [infoId, setinfoId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [token, setToken] = useToken();
  const [newsList, setNewsList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });
  useEffect(() => {
    http
      .get(`news/list?limit=15&page=${page}`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        setNewsList({
          isFetched: true,
          data: res.data.data,
          err: false,
        })
      )
      .catch((error) =>
        setNewsList({
          isFetched: true,
          data: [],
          err: error,
        })
      );
  }, [page]);

  // function truncateTextAfterWords(text) {
  //   const words = text.split(" ");
  //   if (words.length > 3) {
  //     return words.slice(0, 3).join(" ") + "...";
  //   }
  //   return text;
  // }
  return (
    <div>
      {newsList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap ">
            {/* <PhotoModal
              imgModal={imgModal}
              setImgModal={setImgModal}
              img={img}
            /> */}
            <AddNews
              addModal={addModal}
              setAddModal={setAddModal}
              api={"news/add"}
            />
            <DeleteModal
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              api={"news/delete"}
              id={"id"}
              mark_id={selectedId - 0}
            />
            <NewsInfo
              infoModal={infoModal}
              setInfoModal={setInfoModal}
              info_title_uz={infoTitleUz}
              info_title_ru={infoTitleRu}
              info_description_uz={infoDescUz}
              info_description_ru={infoDescRu}
              infoImg={infoImg}
              date={date}
              info_id={infoId}
            />
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Заголовок</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {newsList.data?.map((e, i) => (
                  <tr key={i} className="table_tr">
                    <td>{++i}</td>
                    <td>{e.news_title_uz}</td>
                    <td className="btns">
                      <button
                        className="delete"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedId(e.news_id);
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                      <button
                        className="ellipsis"
                        onClick={() => {
                          setInfoModal(true);
                          setinfoTitleUz(e.news_title_uz);
                          setinfoTitleRu(e.news_title_ru);
                          setinfoDescRu(e.news_description_ru);
                          setinfoDescUz(e.news_description_uz);
                          setinfoImg(e.news_img_url);
                          setDate(e.news_create_at);
                          setinfoId(e.news_id);
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
          <div className="add">
            <button
              onClick={() => {
                setAddModal(true);
              }}
            >
              Добавить
            </button>
          </div>
          <Pagination page={page} setPage={setPage} data={newsList.data} />
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

export default News;
