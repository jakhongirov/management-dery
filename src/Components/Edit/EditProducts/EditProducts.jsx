import { useEffect, useState } from "react";
import "./EditProducts.scss";
import Close from "../../../Assets/images/icons/close.svg";
import http from "../../../axios.config";
import File from "../../../Assets/images/icons/file.svg";
import useToken from "../../../Hooks/useToken";

function EditProducts({
  editModal,
  setEditModal,
  api,
  id,
  default_title_uz,
  default_title_ru,
  default_description_uz,
  default_description_ru,
  default_price,
  default_category_id,
  default_img,
}) {
  const [isModalOpen, setIsModalOpen] = useState(editModal);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [token, setToken] = useToken();

  const [newsList, setNewsList] = useState({
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
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      photo,
      title_uz,
      title_ru,
      description_uz,
      description_ru,
      price,
      category_id,
    } = e.target.elements;

    const formData = new FormData();
    formData.append("id", id);
    if (photo.files[0]) {
      formData.append("image", photo.files[0]);
    }
    formData.append("product_name_uz", title_uz.value);
    formData.append("product_name_ru", title_ru.value);
    formData.append("product_description_uz", description_uz.value);
    formData.append("product_description_ru", description_ru.value);
    formData.append("product_price", price.value);
    formData.append("category_id", category_id.value);

    http
      .put(api, formData, {
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
    setEditModal(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedImageData(file);
    } else {
      setSelectedImage(null);
      setSelectedImageData(null);
    }
  };

  return (
    <>
      {editModal ? (
        <div className="modal_bg" onClick={closeModal}>
          <div className="add_products_wrapper" onClick={stopPropagation}>
            <button
              className="close"
              onClick={() => {
                setEditModal(false);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h1>Изменить</h1>
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
                {selectedImage || default_img ? (
                  <img
                    src={selectedImage ? selectedImage : default_img}
                    alt="Selected"
                    className="selected_img"
                  />
                ) : (
                  <img src={File} alt="File" />
                )}
              </label>
              <div className="form_wrapper">
                <div className="form_wrapper_left">
                  <input
                    required
                    type="text"
                    autoFocus
                    placeholder="Заголовок узб"
                    name="title_uz"
                    defaultValue={default_title_uz}
                  />
                  <textarea
                    required
                    placeholder="Описание узб"
                    name="description_uz"
                    defaultValue={default_description_uz}
                    style={{ resize: "none" }}
                  ></textarea>
                  <input
                    required
                    type="number"
                    placeholder="Цена продукта"
                    name="price"
                    defaultValue={default_price}
                  />
                </div>
                <div className="form_wrapper_right">
                  <input
                    required
                    type="text"
                    placeholder="Заголовок русс"
                    name="title_ru"
                    defaultValue={default_title_ru}
                  />
                  <textarea
                    required
                    placeholder="Описание русс"
                    name="description_ru"
                    defaultValue={default_description_ru}
                    style={{ resize: "none" }}
                  ></textarea>
                  <select
                    required
                    name="category_id"
                    defaultValue={default_category_id}
                  >
                    <option value="">Выберите категорию</option>
                    {newsList.data.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name_uz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button className="add_btn" type="submit">
                Изменить
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

export default EditProducts;
