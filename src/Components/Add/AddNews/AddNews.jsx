import { useEffect, useState } from "react";

import "./AddNews.scss";
import Close from "../../../Assets/images/icons/close.svg";
import http from "../../../axios.config";
import File from "../../../Assets/images/icons/file.svg";
import useToken from "../../../Hooks/useToken";

function AddNews({ addModal, setAddModal, api }) {
  const [isModalOpen, setIsModalOpen] = useState(addModal);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [token, setToken] = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { photo, title_uz, title_ru, description_uz, description_ru } =
      e.target.elements;

    if (!photo.files[0]) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", photo.files[0]);
    formData.append("news_title_uz", title_uz.value);
    formData.append("news_title_ru", title_ru.value);
    formData.append("news_description_uz", description_uz.value);
    formData.append("news_description_ru", description_ru.value);
    console.log(photo.files[0]);

    http
      .post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
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
    setAddModal(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setSelectedImageData(file);
  };

  return (
    <>
      {addModal ? (
        <div className="modal_bg" onClick={closeModal}>
          <div className="add_level_wrapper" onClick={stopPropagation}>
            <button
              className="close"
              onClick={() => {
                setAddModal(false);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h1>Добавить</h1>
            <form onSubmit={handleSubmit}>
              <h2>Изображение</h2>
              <input
                className="input_file"
                id="photo"
                type="file"
                name="photo"
                onChange={handleFileChange}
              />
              <label className="file_label" htmlFor="photo">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="selected_img"
                  />
                ) : (
                  <img src={File} alt="File" />
                )}
              </label>
              <div className="form_wrapper_news">
                <div className="form_wrapper_left">
                  <input
                    required
                    type="text"
                    autoFocus
                    placeholder="Заголовок узб"
                    name="title_uz"
                  />
                  <textarea
                    required
                    placeholder="Описание узб"
                    name="description_uz"
                    style={{ resize: "none" }}
                  ></textarea>
                </div>
                <div className="form_wrapper_right">
                  <input
                    required
                    type="text"
                    placeholder="Заголовок русс"
                    name="title_ru"
                  />
                  <textarea
                    required
                    placeholder="Описание русс"
                    name="description_ru"
                    style={{ resize: "none" }}
                  ></textarea>
                </div>
              </div>
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

export default AddNews;
