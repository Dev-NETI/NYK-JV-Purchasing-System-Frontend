"use client";
import React from "react";

function UserEdit() {
  return (
    <div className="col-xl-12 col-lg-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Edit User</h4>
        </div>
        <div className="card-body">
          <div className="basic-form">
            <form>
              <div className="row">
                <div className="form-group col-md-4">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter first name"
                  />
                </div>
                <div className="form-group col-md-4">
                  <label>Middle Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter middle name"
                  />
                </div>
                <div className="form-group col-md-4">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter last name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4">
                  <label>Position</label>
                  <select className="form-control" defaultValue="">
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option value="1">Position 1</option>
                    <option value="2">Position 2</option>
                    <option value="3">Position 3</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label>Department</label>
                  <select className="form-control" defaultValue="">
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option value="1">Department 1</option>
                    <option value="2">Department 2</option>
                    <option value="3">Department 3</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label>Company</label>
                  <select className="form-control" defaultValue="">
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option value="1">Company 1</option>
                    <option value="2">Company 2</option>
                    <option value="3">Company 3</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
