import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import Logo from "../../Assets/images/LOGO.DARK.png";
import "./Sidebar.scss";

function Sidebar() {
  //dropdown useStates
  const [carOpen, setCarOpen] = useState(false);
  const [motorcycleOpen, setMotorcycleOpen] = useState(false);
  const [mhOpen, setMhOpen] = useState(false);
  const [vanOpen, setVanOpen] = useState(false);
  const [truckOpen, setTruckOpen] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [sttOpen, setSttOpen] = useState(false);
  const [stOpen, setStOpen] = useState(false);
  const [coacheOpen, setCoacheOpen] = useState(false);
  const [avOpen, setAvOpen] = useState(false);
  const [cmOpen, setCmOpen] = useState(false);
  const [ftOpen, setFtOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

  return (
    <div className="nav-bar_wrapper">
      <div className="nav-bar_wrapper_inner">
        <div className="logo_wrapper">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <nav>
          <ul className="nav_list">
            <li className="nav_list_item">
              <NavLink className="nav_link" to="/">
                Пользователи
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/orders"
                onClick={() => setUsersOpen(!usersOpen)}
              >
                Заказы
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/cashback"
                onClick={() => setUsersOpen(!usersOpen)}
              >
                Кэшбэк
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink className="nav_link" to="/categories">
                Категории
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink className="nav_link" to="/products">
                Продукты
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink className="nav_link" to="/news">
                Новости
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink className="nav_link" to="/reviews">
                Отзывы
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
