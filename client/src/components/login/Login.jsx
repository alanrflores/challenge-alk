
import Swal from "sweetalert2";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/user/actions.js";
import { useSelector, useDispatch } from "react-redux";
import './styles/login.css';

const Login = () => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logoAlkemy = 'https://assets.alkemy.org/assets/alkemy-logo.svg'
 
  return (
    <div className='containerLogin'>
    <div className='contentInfoLogin'>
        <div className='contentImage'>
            <img src={logoAlkemy} alt="logo-alkemy"/>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(fields) => {
            let errors = {};
            //Validate email
            if (!fields.email) {
              errors.email = "Please insert email to continue";
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                fields.email
              )
            ) {
              errors.email =
                "The email can only contain letters, numbers, periods, scripts and underscore";
            }
            //Validate password
            if (!fields.password) {
              errors.password = "Please insert password to continue";
            } else if (
              !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(
                fields.password
              )
            ) {
              errors.password =
                "The password must be at least 8-16 characters long, at least one digit, at least one lowercase, and at least one uppercase. It may have other symbols";
            }
            return errors;
          }}
          onSubmit={(fields, { resetForm }) => {
            resetForm();
            let options = {
              method: "POST",
              url: "http://localhost:3001/login",
              header: {
                ContentType: "application/json",
              },
              data: {
                email: fields.email,
                password: fields.password,
              },
            };
            axios
              .request(options)
              .then((user) => {
                localStorage.setItem("user", JSON.stringify(user.data));
                dispatch(loginUser(user.data));
                Swal.fire({
                  icon: "success",
                  title: "Welcome",
                  confirmButtonText: "Cool",
                }).then((result) => {
                  if (result.isConfirmed || result.isDismissed) {
                    navigate("/home");
                  }
                });
              })
              .catch((err) => {
                Swal.fire({
                  icon: "error",
                  title: "something went wrong",
                  text: `${err.message}`,
                });
              });
          }}
        >
          {({ touched, errors }) => (
            <Form className='formLogin'>
              <Field
                type="email"
                name="email"
                placeholder="correo@correo.com"
              />
              {touched.email && errors.email ? <p className='error'>{errors.email}</p> : ""}

              <Field type="password" name="password" placeholder="Password" />
              {touched.password && errors.password ? (
                <p className='error'>{errors.password}</p>
              ) : (
                ""
              )}

              <button className='buttonLogin'type="submit"> Sign in </button>
            </Form>
          )}
          
        </Formik>
        <Link className='register' to={"/register"}> Register now!</Link>
      </div>
    </div>

  );
};

export default Login;
