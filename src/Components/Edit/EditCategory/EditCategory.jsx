import { useEffect, useState } from "react";

import "./EditCategory.scss";
import Close from "../../../Assets/images/icons/close.svg";
import http from "../../../axios.config";
import useToken from "../../../Hooks/useToken";

function EditCategory({
  editModal,
  setEditModal,
  api,
  default_uz,
  default_ru,
  id,
}) {
  const [isModalOpen, setIsModalOpen] = useState(editModal);
  const [token, setToken] = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { category_uz, category_ru } = e.target.elements;
    const data = {
      id: id,
      category_name_uz: category_uz.value,
      category_name_ru: category_ru.value,
    };

    http
      .put(api, data, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          window.location.reload();
        } else if (response.data.status === 401) {
          setToken();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setEditModal(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {editModal ? (
        <div className="modal_bg" onClick={closeModal}>
          <div className="add_categories_wrapper" onClick={stopPropagation}>
            <button
              className="close"
              onClick={() => {
                setEditModal(false);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h1>Добавить</h1>
            <form onSubmit={handleSubmit}>
              <h2>Описание узб</h2>
              <input
                required
                type="text"
                autoFocus
                name="category_uz"
                defaultValue={default_uz}
              />
              <h2>Описание русс</h2>
              <input
                required
                type="text"
                autoFocus
                name="category_ru"
                defaultValue={default_ru}
              />
              <button className="add_btn" type="submit">
                Добавить
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default EditCategory;
