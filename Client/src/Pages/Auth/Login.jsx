import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const submitdata = (formDetails) => {
    try {
      if (formDetails) {
        console.log("im here");
        axios
          .post("http://localhost:3000/api/admin/login", formDetails)
          .then((res) => {
            console.log("response here", res);
            if (res.status === 200) {
              localStorage.setItem("validate", "true");

              console.log("here is your data", res);
              navigate("/categories");
            } else {
              console.log("soory something went wrong", res.data.message);
            }
          });
      }
    } catch (error) {
      console.log("error while login", error);
    }
  };
  return (
    <section>
      <div className="flex flex-col items-center justify-center bg-[#1F2937] py-6 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:text-black dark:border-[#1F2937]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-secoundary-500 text-center md:text-2xl">
              Admin Login
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(submitdata)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", {
                    required: { value: true, message: "email is required" },
                  })}
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:border-blue-500"
                />
                {errors.email && (
                  <span style={{ color: "red" }}>{errors.email.message}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="on"
                  {...register("password", {
                    required: {
                      message: "password is required",
                    },
                    minLength: {
                      value: 3,
                      message: "Password must be at least 3 characters long!",
                    },
                  })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:border-blue-500"
                  required=""
                />
                {errors.password && (
                  <span style={{ color: "red" }}>
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#1D4ED8] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const logout = () => {};

export default Login;
