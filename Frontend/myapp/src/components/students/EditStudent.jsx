import { notification } from 'antd'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditStudent = () => {

    const [EditStudent, seteditStudent] = useState({})
    const [stdCategory, setStdCategory] = useState([])
    const { student_edit } = useParams()
    console.log("bhssjk", student_edit)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3003/get-student/${student_edit}`)
            .then((res) => {
                seteditStudent(res.data.data)
            })
            .then((err) => {
                console.log(err)
            })
    }, [student_edit])

    useEffect(() => {
        axios.get(`http://localhost:3003/get-categories`)
            .then((res) => {
                setStdCategory(res.data.data)
            })
            .then((err) => {
                console.log(err)
            })
    }, [student_edit])


    return (
        <div>
            <div className='inp1 back'>

                <h2>Edit Student</h2><br />

                <div className='inp2 w-[600px] border border-black mx-auto'>

                    <Formik
                        initialValues={{ name: EditStudent.name || " ", email: EditStudent.email || '', contact: EditStudent.contact || " ", course_category: stdCategory || '' }}
                        enableReinitialize={true}
                        validate={values => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = 'name is Required';
                            }
                            if (!values.email) {
                                errors.email = 'Description is Required';
                            }
                            if (!values.contact) {
                                errors.contact = 'contact is Required';
                            }
                            if (!values.course_category) {
                                errors.course_category = 'course_category is Required';
                            }

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {

                            axios.put(`http://localhost:3003/update-student/${student_edit}`, values)
                                .then((res) => {
                                    console.log(res.data)
                                    notification.success({ message: "Updated successfully" })
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
                                    // placeholder=' name *'
                                    className='border border w-[90%] h-[35px]'
                                />
                                {errors.name && touched.name && errors.name} <br />
                                <input
                                    type="test"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    // placeholder='description'
                                    className='border border w-[90%] h-[35px]'
                                />
                                {errors.email && touched.email && errors.email} <br />

                                <input
                                    type=""
                                    name="contact"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.contact}
                                    // placeholder=' name *'
                                    className='border border w-[90%] h-[35px]'
                                />
                                {errors.contact && touched.contact && errors.contact} <br />
                                <select
                                    name="course_category"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.course_category}
                                    className='border border w-[90%] h-[35px]'
                                >
                                    <option value="">Select Course</option>
                                    {
                                        stdCategory &&
                                        stdCategory.map((elem, ind) => {
                                            return (
                                                <option key={elem._id} value={elem._id}>{elem.course_name}</option>
                                            )
                                        })
                                    }
                                </select>
                                {errors.course_category && touched.course_category && errors.course_category} <br /><br />



                                <button className='butt btn btn-primary' type="submit" style={{ marginBottom: '20px' }} disabled={isSubmitting}>
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

export default EditStudent