import { notification } from 'antd'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddCompany = () => {

    const navigate = useNavigate()
    const { student_id } = useParams()

    const [singlestudent, setSinglestudent] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3003/get-student/${student_id}`)
            .then((res) => {
                // console.log("aaaaaaa", res.data)
                setSinglestudent(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [student_id])

    return (
        <div>
            <div className='inp1 back'>

                <h2>Add New Company</h2><br />

                <div className='text-gray-300'>
                    <h4>Student Name : {singlestudent.name}</h4>
                    <h4> Course : {singlestudent.course_category?.course_name}</h4>
                </div>

                <div className='inp2 w-[600px] border border-black mx-auto '>

                    <Formik
                        initialValues={{ company_name: '', company_description: '', company_status: '', date: '', student_detail: student_id }}
                        validate={values => {
                            const errors = {};
                            if (!values.company_name) {
                                errors.company_name = 'company_name is Required';
                            }
                            if (!values.company_description) {
                                errors.company_description = 'Description is Required';
                            }
                            if (!values.company_status) {
                                errors.company_status = 'company_status is Required';
                            }
                            if (!values.date) {
                                errors.date = 'current_date is Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {

                            axios.post(`http://localhost:3003/add-company`, values)
                                .then((res) => {
                                    // console.log(res.data)
                                    notification.success({ message: "Added successfully" })
                                    setSubmitting(false)
                                    navigate('/single_student/' + res.data.data.student_detail)
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
                                    name="company_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.company_name}
                                    placeholder='company name *'
                                    className='border border w-[90%] h-[35px]'
                                />
                                {errors.company_name && touched.company_name && errors.company_name} <br />
                                <input
                                    type="test"
                                    name="company_description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.company_description}
                                    placeholder='description'
                                    className='border border w-[90%] h-[35px]'
                                />
                                {errors.company_description && touched.company_description && errors.company_description} <br />

                                <input
                                    type="text"
                                    name="company_status"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.company_status}
                                    placeholder='company_status *'
                                    className='border border w-[90%] h-[35px]'
                                />
                                {errors.company_status && touched.company_status && errors.company_status} <br />
                                <input
                                    type="date"
                                    name="date"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.date}
                                    placeholder='description'
                                    className='border border w-[90%] h-[35px]'
                                />
                                {errors.date && touched.date && errors.date} <br />

                                <button className=' butt btn btn-primary ' type="submit" style={{ marginBottom: '20px' }} disabled={isSubmitting}>
                                    Submit
                                </button>
                            </form>
                        )}
                    </Formik>



                </div>
            </div>
        </div>
    )
}

export default AddCompany