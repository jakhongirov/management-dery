import { useState, useEffect } from "react";

import http from "../../axios.config";
import Edit from "../../Assets/images/icons/edit.svg";
import DeleteSvg from "../../Assets/images/icons/delete.svg";

import useToken from "../../Hooks/useToken";
import Header from "../../Containers/Header/Header";

function Admins() {
  const [token, setToken] = useToken();
  const [offset, setOffset] = useState(0);
  const [addAdmins, setAddAdmins] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editAdmins, setEditAdmins] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [defaultEmail, setDefaultEmail] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("");
  const [adminsList, setAdminsList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`admins/list?limit=10&page=1`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        setAdminsList({
          isFetched: true,
          data: res.data.data,
          err: false,
        })
      )
      .catch((error) =>
        setAdminsList({
          isFetched: true,
          data: [],
          err: error,
        })
      );
  }, [offset]);
  console.log(adminsList);
  return (
    <div>
      {adminsList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap ">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {adminsList.data?.map((admin, index) => (
                  <tr key={index} className="table_tr">
                    <td>{admin.admin_id}</td>
                    <td>{admin.admin_email}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="btns">
                      <button
                        className="edit"
                        onClick={() => {
                          setEditAdmins(true);
                          setSelectedId(admin.admin_id);
                          setDefaultEmail(admin.admin_email);
                          setDefaultPassword(admin.admin_password);
                        }}
                      >
                        <img src={Edit} alt="edit" />
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedId(admin.admin_id);
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
                setAddAdmins(true);
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

export default Admins;
