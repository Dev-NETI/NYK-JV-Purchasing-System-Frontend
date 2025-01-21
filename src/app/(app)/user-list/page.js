"use client";

import { getUserList } from "@/services/UserServices";
import { Input } from "postcss";
import React, { useEffect, useState } from "react";

function UserList() {
  const [userState, setUserState] = useState({
    user_data: [],
    response_store: true,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    last_page: 1,
  });
  const [searchParams, setSearchParams] = useState({
    f_name: "",
    l_name: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserList(pagination, searchParams);
        console.log("API Response:", data);

        setUserState((prevState) => ({
          ...prevState,
          user_data: data.data,
          response_store: false,
        }));
        setPagination((prev) => ({
          ...prev,
          page: data.current_page || prev.page,
          total: data.total,
          last_page: data.last_page,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserState((prevState) => ({
          ...prevState,
          user_data: [],
          response_store: false,
        }));
      }
    };

    if (userState.response_store) {
      fetchUserData();
    }
  }, [
    userState.response_store,
    pagination.page,
    searchParams.f_name,
    searchParams.l_name,
  ]);

  const handlePageChange = (newPage) => {
    console.log("Changing to page:", newPage);
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setPagination((prev) => ({
        ...prev,
        page: newPage,
      }));
      setUserState((prev) => ({
        ...prev,
        response_store: true,
      }));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 }));
    setUserState((prev) => ({ ...prev, response_store: true }));
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">User List</h4>
        </div>
        <div className="card-body">
          <div className="basic-form">
            <form onSubmit={handleSearch}>
              <div className="row">
                <div className="col-sm-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={searchParams.f_name}
                    onChange={(e) => {
                      setSearchParams((prev) => ({
                        ...prev,
                        f_name: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="col-sm-3 mt-2 mt-sm-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    value={searchParams.l_name}
                    onChange={(e) => {
                      setSearchParams((prev) => ({
                        ...prev,
                        l_name: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="col-sm-3 mt-2 mt-sm-0">
                  <button className="btn btn-primary">Search</button>
                </div>
              </div>
            </form>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-responsive-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Company</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userState.user_data.map((user, index) => (
                  <tr key={user.id || index}>
                    <th className="text-black">
                      {(pagination.page - 1) * 10 + index + 1}
                    </th>
                    <td>
                      {user.f_name} {user.m_name} {user.l_name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.contact_number}</td>
                    <td>NETI</td>
                    <td>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="btn btn-primary shadow btn-md me-1"
                        >
                          <i className="fa fa-pencil"></i>
                        </a>
                        <a href="#" className="btn btn-danger shadow btn-md">
                          <i className="fa fa-trash"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
                {userState.user_data.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <ul className="pagination pagination-gutter pagination-primary no-bg">
              <li
                className={`page-item page-indicator ${
                  pagination.page <= 1 ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  style={{ cursor: "pointer" }}
                >
                  <i className="la la-angle-left"></i>
                </a>
              </li>

              {[...Array(pagination.last_page)].map((_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    pagination.page === index + 1 ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                    style={{ cursor: "pointer" }}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}

              <li
                className={`page-item page-indicator ${
                  pagination.page >= pagination.last_page ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  style={{ cursor: "pointer" }}
                >
                  <i className="la la-angle-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
