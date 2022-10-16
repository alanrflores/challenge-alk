import React, { useState } from "react";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import {useDispatch} from 'react-redux';
import './pages/styles/request.css'
const Request = () => {
  const dispatch = useDispatch();
  let logged = JSON.parse(localStorage.getItem("user"));

  const [result, setResult] = useState([]);

  const getDate = (time) => {
    let date = new Date(time).toDateString();
    return date;
  };

  return (
    <div className='containerRequest'>
       <div className='contentFormRequest'>
      <Formik
        initialValues={{
          concept: "",
          amount: "",
          type: "",
        }}
        validate={(fields) => {
          let errors = {};
          //Validate concept
          if (!fields.concept) {
            errors.concept = "Please insert concept to continue";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(fields.concept)) {
            errors.concept = "The concept can only contain letters and spaces";
          }
          //Validate amount
          if (!fields.amount) {
            errors.amount = "Please insert mount to continue";
          } else if (!/^\d+$/.test(fields.amount)) {
            errors.amount = "They must be just numbers";
          }

          return errors;
        }}
        onSubmit={(fields) => {
          if (logged) {
            let options = {
              method: "POST",
              url: "http://localhost:3001/operation",
              header: {
                ContentType: "application/json",
              },
              data: {
                concept: fields.concept,
                amount: fields.amount,
                type: fields.type,
                idUser: logged.id,
              },
            };
            axios.request(options).then((response) => {
              setResult(result.concat(response.data));
              Swal.fire({
                icon: "success",
                title: "new operation create successfully",
              });
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "something went wrong",
              text: "please login for create operation",
            });
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className='formRequest'>
            <Field type="text" name="concept" placeholder="Ej: rent" />
            {touched.concept && errors.concept ? <p className='error'>{errors.concept}</p> : ""}

            <Field type="number" name="amount" placeholder="Ej: 9999" />
            {touched.amount && errors.amount ? <p className='error'>{errors.amount}</p> : ""}

            <Field name="type" as="select">
              <option value="" hidden>
                Choose here
              </option>
              <option defaultValue="entry">entry</option>
              <option value="egress">egress</option>
            </Field>

            <button className='buttonRequest' type="submit">send</button>
          </Form>
        )}
      </Formik>
      {result && result.length > 0 ? (
        <div className='contentOperations'>
        <div className="headersTableRequest">
          {result.map((elem, i) => {
            return (
              <ul key={i}className={elem.type === 'ingress' ? 'color' : 'withoutColor'}>
                <li>{elem.concept}</li>
                <li>{elem.amount}</li>
                <li>{elem.type}</li>
                <li>{getDate(elem.createdAt)}</li>
              </ul>
            );
          })}
        </div>
        </div>
      ) : (
        <></>
      )}
    </div>
    </div>
  );
};

export default Request;
