import { notification } from 'antd';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {

  const navigate = useNavigate()

  const clickBack = () => {
    navigate('/course')
  }
  return (
    <div>
      <div className='inp1 back'>

        <h2>Add New Course</h2><br />

        <div className='inp2 md:w-[600px] mx-auto '>

          <Formik
            initialValues={{ course_name: '', course_description: '' }}
            validate={values => {
              const errors = {};
              if (!values.course_name) {
                errors.course_name = 'course_name is Required';
              }
              if (!values.course_description) {
                errors.course_description = 'course_description is Required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {

              values.course_name = values.course_name.toLowerCase();
              values.course_description = values.course_description.toLowerCase();

              axios.post('https://hr-management-backend-frontend.onrender.com//add-category', values)
                .then((res) => {
                  console.log(res.data)
                  notification.success({ message: res.data.message })
                  setSubmitting(false)
                  navigate('/course') 
                })
                .catch((err) => {
                  console.log(err)
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
              <form onSubmit={handleSubmit}><br />
                <input
                  type="text"
                  name="course_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.course_name}
                  placeholder='course_name *'
                  className='border border w-[90%] h-[35px] std1'
                />
                {errors.course_name && touched.course_name && errors.course_name} <br />
                <input
                  type="text"
                  name="course_description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.course_description}
                  placeholder='course_description *'
                  className='border border w-[90%] h-[35px] std1'
                />
                {errors.course_description && touched.course_description && errors.course_description} <br />

                <Button type="submit" className='butt' style={{ marginBottom: '20px' }} disabled={isSubmitting}>
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </div>

        <button className='but' onClick={clickBack}>Back</button>
      </div>

    </div>
  )
}

export default AddCourse