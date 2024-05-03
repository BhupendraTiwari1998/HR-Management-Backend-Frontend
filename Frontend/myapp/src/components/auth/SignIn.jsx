import React from "react";
import { Formik } from "formik";
import { SiGnuprivacyguard } from "react-icons/si";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd"


const SignIn = () => {
  const navigate = useNavigate()

  //bhupendra123@gmail.com login email
  //bhupendra123 password
  
  return (
    <div className="h-screen flex justify-center items-center inp1 back">
      <div className="w-[600px] p-4">
        <div className="login_icon flex justify-center text-white ">
          <SiGnuprivacyguard className="text-5xl" />
        </div>
        
        <h2 className="my-3 text-white">SIGN IN</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = " Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            axios.post(`http://localhost:3003/sign-in`, values)
              .then((res) => {
                console.log("dfghjktyu", res.data)
                setSubmitting(false)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("admin", JSON.stringify(res.data.data))
                if (res.data.token) {
                  notification.success({ message: "Login Successfully" })
                  navigate("/")
                } else {
                  localStorage.clear()
                }
              })
              .catch((err) => {
                console.log(err)
                navigate("/sign-in")
              })
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="form-control border-2 border-sky-600 std1"
                placeholder="Email"
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="form-control border-2 border-sky-600 my-3 std1"
                placeholder="Password"
              />
              {errors.password && touched.password && errors.password}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="form-control submit_btn"
              >
                Submit
              </Button>
              {/* <div className="mt-3">
                <Link to="/sign-up" className="no-underline">
                  Don't have an account? Sign Up</Link>

              </div> */}

            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
