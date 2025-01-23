"use client";
import React from "react";

function UserAdd() {
  return (
    <div className="col-xl-12 col-lg-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Add User</h4>
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
                  <label>Department</label>
                  <select className="form-control" defaultValue="">
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option value="dept1">Department 1</option>
                    <option value="dept2">Department 2</option>
                    <option value="dept3">Department 3</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label>Company</label>
                  <select className="form-control" defaultValue="">
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option value="dept1">Company 1</option>
                    <option value="dept2">Company 2</option>
                    <option value="dept3">Company 3</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAdd;
