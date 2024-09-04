import { notification } from 'antd'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const AddStudent = () => {

    const [category1, setCategory1] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3003/get-categories')
            .then((res) => {
                // console.log(res)
                setCategory1(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const clickBack = () => {
        navigate('/')
    }
    return (
        <div>
            <div className='inp1 back container mx-auto px-4 py-6'>

                <h2>Add New Student</h2><br />

                <div className='w-full inp2 max-w-3xl mx-auto '>

                    <Formik
                        initialValues={{ name: '', email: '', contact: '', course_category: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = 'student_name is Required';
                            }
                            if (!values.email) {
                                errors.email = 'student_email is Required';
                            }
                            if (!values.contact) {
                                errors.contact = 'student_contact Required';
                            }
                            if (!values.course_category) {
                                errors.course_category = ' category Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {

                            axios.post('http://localhost:3003/add-student', values)
                                .then((res) => {
                                    // console.log(res.data)
                                    notification.success({ message: "Added successfully" })
                                    setSubmitting(false)
                                    navigate('/')
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
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder='enter your name *'
                                    className='border border w-[90%] h-[35px] std1'
                                />
                                {errors.name && touched.name && errors.name} <br />
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder='enter your email *'
                                    className='border border w-[90%] h-[35px] std1'
                                />
                                {errors.email && touched.email && errors.email} <br />

                                <input
                                    type="text"
                                    name="contact"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.contact}
                                    placeholder='contact *'
                                    className='border border w-[90%] h-[35px] std1'
                                />
                                {errors.contact && touched.contact && errors.contact} <br />

                                <select
                                    name="course_category"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.course_category}
                                    className='border border w-[90%] h-[35px] std1'
                                >
                                    <option value="">Select Course</option>
                                    {
                                        category1 &&
                                        category1.map((elem, ind) => {
                                            return (
                                                <option key={elem._id} value={elem._id}>{elem.course_name}</option>
                                            )
                                        })
                                    }
                                </select>
                                {errors.course_category && touched.course_category && errors.course_category} <br /><br />
                                <Button type="submit" className='butt' style={{ marginBottom: '20px' }} disabled={isSubmitting}>
                                    Submit
                                </Button>
                            </form>
                        )}
                    </Formik>



                </div>

                <button className='but mt-10' onClick={clickBack}>Back</button>
            </div>
        </div>
    )
}

export default AddStudent