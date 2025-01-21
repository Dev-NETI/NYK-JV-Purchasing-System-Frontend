"use client";

import { useAuth } from "@/hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function page() {
  const router = useRouter();
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/login-otp",
  });

  const FormSchema = z.object({
    email: z.string().email({
      message: "Invalid email format.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  });

  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (router.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.reset));
    } else {
      setStatus(null);
    }
  });

  const submitForm = async (data) => {
    login({
      email: data.email,
      password: data.password,
      remember: data.shouldRemember,
      setErrors,
      setStatus,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <a href="index.html">
                        {/* <img src="images/logo-full.png" alt="" /> */}
                      </a>
                    </div>
                    <h2 className="text-center mb-4 font-bold">
                      Sign in your account
                    </h2>
                    <form onSubmit={form.handleSubmit(submitForm)}>
                      <div className="form-group">
                        <label className="mb-1 form-label"> Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email address"
                          {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group mb-4">
                        <label className="mb-1 form-label">Password</label>
                        <div className="position-relative">
                          <input
                            type="password"
                            id="dz-password"
                            className="form-control"
                            placeholder="Password"
                            {...form.register("password")}
                          />
                          <span className="show-pass eye position-absolute end-0 py-2translate-middle-y pe-3">
                            <i className="fa fa-eye-slash"></i>
                            <i className="fa fa-eye"></i>
                          </span>
                        </div>
                        {form.formState.errors.password && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.password.message}
                          </p>
                        )}
                      </div>
                      <div className="form-row d-flex justify-content-between mt-4 mb-2">
                        <div className="form-group">
                          <div className="form-check custom-checkbox ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="basic_checkbox_1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="basic_checkbox_1"
                            >
                              Remember Password
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <a href="page-forgot-password.html">
                            Forgot Password?
                          </a>
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary light btn-block"
                        >
                          Sign Me In
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p>
                        Don't have an account?{" "}
                        <a className="text-primary" href="./page-register.html">
                          Sign up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;
