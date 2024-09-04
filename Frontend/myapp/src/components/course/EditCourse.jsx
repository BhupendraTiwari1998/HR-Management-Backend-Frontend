import { notification } from 'antd'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditCourse = () => {

  const [editCourse, setEditCourse] = useState({})
  const { course_id } = useParams()
  // console.log("bhssjk",course_id)

  const navigate = useNavigate()

  useEffect(()=>{
    axios.get(`http://localhost:3003/get-category/${course_id}`)
    .then((res)=>{
      setEditCourse(res.data.data)
    })
    .then((err)=>{
      console.log(err)
    })
  },[course_id])

  const clickBack = () => {
    navigate('/course')
  }
  return (
    <div>
      <div className='inp1 back'>

        <h2>Edit Course</h2><br />

        <div className='inp2 md:w-[600px] mx-auto'>

          <Formik
            initialValues={{ course_name: editCourse.course_name || " ", course_description: editCourse.course_description || '' }}
            enableReinitialize={true}
            validate={values => {
              const errors = {};
              if (!values.course_name) {
                errors.course_name = 'course_name is Required';
              }
              if (!values.course_description) {
                errors.course_description = 'Description is Required';
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {

              axios.put(`http://localhost:3003/update-category/${course_id}`, values)
                .then((res) => {
                  console.log(res.data)
                  notification.success({ message: "Updated successfully" })
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
                  // placeholder=' name *'
                  className='border border w-[90%] h-[35px] std1'
                />
                {errors.course_name && touched.course_name && errors.course_name} <br />
                <input
                  type="test"
                  name="course_description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.course_description}
                  // placeholder='description'
                  className='border border w-[90%] h-[35px] std1'
                />
                {errors.course_description && touched.course_description && errors.course_description} <br />

                <button className='butt btn btn-primary' type="submit" style={{ marginBottom: '20px' }} disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>

        <button className='but' onClick={clickBack}>Back</button>
      </div>
    </div>
  )
}

export default EditCourse