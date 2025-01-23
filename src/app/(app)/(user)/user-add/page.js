"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { storeUser } from "@/services/UserServices";

// Define validation schema
const userSchema = z.object({
  f_name: z.string().min(2, "First name must be at least 2 characters"),
  m_name: z.string().optional(),
  l_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  position_id: z.string().min(1, "Please select a position"),
  department_id: z.string().min(1, "Please select a department"),
  company_id: z.string().min(1, "Please select a company"),
});

function UserAdd() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      middle_name: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await storeUser(data);
      console.log(response);
      toast.success("User added successfully!");
      router.push("/user-list"); // Enable the redirect
    } catch (error) {
      console.error("Error adding user:", error);

      // Handle different error response formats
      if (error.response?.data?.errors) {
        // Handle validation errors (array format)
        if (Array.isArray(error.response.data.errors)) {
          error.response.data.errors.forEach((error) => {
            toast.error(error[0]);
          });
        }
        // Handle validation errors (object format)
        else if (typeof error.response.data.errors === "object") {
          Object.values(error.response.data.errors).forEach((errorArray) => {
            if (Array.isArray(errorArray)) {
              errorArray.forEach((errorMessage) => {
                toast.error(errorMessage);
              });
            }
          });
        }
      }
      // Handle single error message
      else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
      // Handle generic error
      else {
        toast.error("An error occurred while adding the user.");
      }
    }
  };

  return (
    <div className="col-xl-12 col-lg-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Add User</h4>
        </div>
        <div className="card-body">
          <div className="basic-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="form-group col-md-4">
                  <label>First Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.f_name ? "is-invalid" : ""
                    }`}
                    placeholder="Please enter first name"
                    {...register("f_name")}
                  />
                  {errors.f_name && (
                    <div className="invalid-feedback">
                      {errors.f_name.message}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-4">
                  <label>Middle Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter middle name"
                    {...register("m_name")}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.l_name ? "is-invalid" : ""
                    }`}
                    placeholder="Please enter last name"
                    {...register("l_name")}
                  />
                  {errors.l_name && (
                    <div className="invalid-feedback">
                      {errors.l_name.message}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label>Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4">
                  <label>Position</label>
                  <select
                    className={`form-control ${
                      errors.position_id ? "is-invalid" : ""
                    }`}
                    {...register("position_id")}
                  >
                    <option value="">Choose...</option>
                    <option value="1">Position 1</option>
                    <option value="2">Position 2</option>
                    <option value="3">Position 3</option>
                  </select>
                  {errors.position_id && (
                    <div className="invalid-feedback">
                      {errors.position_id.message}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-4">
                  <label>Department</label>
                  <select
                    className={`form-control ${
                      errors.department_id ? "is-invalid" : ""
                    }`}
                    {...register("department_id")}
                  >
                    <option value="">Choose...</option>
                    <option value="1">Department 1</option>
                    <option value="2">Department 2</option>
                    <option value="3">Department 3</option>
                  </select>
                  {errors.department_id && (
                    <div className="invalid-feedback">
                      {errors.department_id.message}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-4">
                  <label>Company</label>
                  <select
                    className={`form-control ${
                      errors.company_id ? "is-invalid" : ""
                    }`}
                    {...register("company_id")}
                  >
                    <option value="">Choose...</option>
                    <option value="1">Company 1</option>
                    <option value="2">Company 2</option>
                    <option value="3">Company 3</option>
                  </select>
                  {errors.company_id && (
                    <div className="invalid-feedback">
                      {errors.company_id.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAdd;
