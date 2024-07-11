import React from "react";
import Sidebar from "../../Containers/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Admins from "../Admins/Admins";
import Users from "../Users/Users";
import News from "../News/News";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import Reviews from "../Reviews/Reviews";
import Cashback from "../Cashback/Cashback";
import Orders from "../Orders/Orders";
import History from "../History/History"; // Не забудьте правильно импортировать History

function Admin() {
  return (
    <div className="app">
      <div>
        <Sidebar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/news" element={<News />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/cashback" element={<Cashback />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/history/:id" element={<History />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
