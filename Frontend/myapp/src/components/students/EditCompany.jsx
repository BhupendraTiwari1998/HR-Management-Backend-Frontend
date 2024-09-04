import { notification } from 'antd'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'

const EditCompany = () => {

  const [editComp, setEditComp] = useState({})
  const { edit_id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3003/get-company/${edit_id}`)
      .then((res) => {
        setEditComp(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [edit_id])


  return (
    <div className=" inp1 back container mx-auto px-4 py-6">
      <h2>Edit Company Details</h2>

      <div className='w-full inp2 max-w-3xl mx-auto'>
        <Formik
          initialValues={{
            company_name: editComp.company_name || "",
            company_description: editComp.company_description || '',
            company_status: editComp.company_status || "",
            date: moment(editComp.date).utc().format('YYYY-MM-DD') || ''
          }}
          enableReinitialize={true}
          validate={values => {
            const errors = {};
            if (!values.company_name) {
              errors.company_name = 'Company name is required';
            }
            if (!values.company_description) {
              errors.company_description = 'Description is required';
            }
            if (!values.company_status) {
              errors.company_status = 'Company status is required';
            }
            if (!values.date) {
              errors.date = 'Date is required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            axios.put(`http://localhost:3003/update-company/${edit_id}`, values)
              .then((res) => {
                notification.success({ message: "Updated successfully" })
                setSubmitting(false)
                navigate('/single_student/' + editComp.student_detail._id)
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
          }) => (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <input
                type="text"
                name="company_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.company_name}
                placeholder='Company name *'
                className='border border-gray-300 w-full mt-3 py-2 px-3 rounded'
              />
              {errors.company_name && touched.company_name && <div className='text-red-600'>{errors.company_name}</div>}

              <input
                type="text"
                name="company_description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.company_description}
                placeholder='Description'
                className='border border-gray-300 w-full py-2 px-3 rounded'
              />
              {errors.company_description && touched.company_description && <div className='text-red-600'>{errors.company_description}</div>}

              <input
                type="text"
                name="company_status"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.company_status}
                placeholder='Company status *'
                className='border border-gray-300 w-full py-2 px-3 rounded'
              />
              {errors.company_status && touched.company_status && <div className='text-red-600'>{errors.company_status}</div>}

              <input
                type="date"
                name="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.date}
                placeholder='Date'
                className='border border-gray-300 w-full py-2 px-3 rounded'
              />
              {errors.date && touched.date && <div className='text-red-600'>{errors.date}</div>}

              <button className='bg-blue-500 text-white py-2 px-4 rounded' type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default EditCompany
