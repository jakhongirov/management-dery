import { useState, useEffect } from "react";

import http from "../../axios.config";
import Edit from "../../Assets/images/icons/edit.svg";
import DeleteSvg from "../../Assets/images/icons/delete.svg";

import useToken from "../../Hooks/useToken";
import Header from "../../Containers/Header/Header";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import AddCategories from "../../Components/Add/AddCategories/AddCategories";
import EditCategory from "../../Components/Edit/EditCategory/EditCategory";

function Categories() {
  const [token, setToken] = useToken();
  const [offset, setOffset] = useState(0);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [defaultUz, setDefaultUz] = useState("");
  const [defaultRu, setDefaultRu] = useState("");
  const [categoriesList, setCategories] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`categories`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        setCategories({
          isFetched: true,
          data: res.data.data,
          err: false,
        })
      )
      .catch((error) =>
        setCategories({
          isFetched: true,
          data: [],
          err: error,
        })
      );
  }, []);
  return (
    <div>
      {categoriesList.isFetched ? (
        <div className="container">
          <Header />
          <DeleteModal
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            api={"category/delete"}
            id={"id"}
            mark_id={selectedId - 0}
          />
          <EditCategory
            editModal={editModal}
            setEditModal={setEditModal}
            api={"category/edit"}
            id={selectedId}
            default_uz={defaultUz}
            default_ru={defaultRu}
          />
          <AddCategories
            addModal={addModal}
            setAddModal={setAddModal}
            api={"category/add"}
          />
          <div className="table_wrap ">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categoriesList.data?.map((category, index) => (
                  <tr key={index} className="table_tr">
                    <td>{++index}</td>
                    <td>{category.category_name_ru}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="btns">
                      <button
                        className="edit"
                        onClick={() => {
                          setEditModal(true);
                          setSelectedId(category.category_id);
                          setDefaultUz(category.category_name_uz);
                          setDefaultRu(category.category_name_ru);
                        }}
                      >
                        <img src={Edit} alt="edit" />
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedId(category.category_id);
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
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

export default Categories;
