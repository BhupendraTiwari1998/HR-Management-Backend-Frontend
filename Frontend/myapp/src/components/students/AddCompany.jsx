import { notification } from 'antd';
import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddCompany = () => {
    const navigate = useNavigate();
    const { student_id1 } = useParams();
    const [singlestudent, setSinglestudent] = useState({});

    useEffect(() => {
        axios.get(`https://hr-management-backend-frontend.onrender.com//get-student/${student_id1}`)
            .then((res) => {
                setSinglestudent(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [student_id1]);

    return (
        <div className="container mx-auto p-4">
            <div className="inp1 back shadow-md rounded p-4">

                <h2 className="text-center">Add New Company</h2>

                <div className="mb-4 text-center text-gray-300">
                    <h4>Student Name: {singlestudent.name}</h4>
                    <h4>Course: {singlestudent.course_category?.course_name}</h4>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <Formik
                        initialValues={{ company_name: '', company_description: '', company_status: '', date: '', student_detail: student_id1 }}
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
                            axios.post(`https://hr-management-backend-frontend.onrender.com//add-company`, values)
                                .then((res) => {
                                    notification.success({ message: "Added successfully" });
                                    setSubmitting(false);
                                    navigate('/single_student/' + res.data.data.student_detail);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
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
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        name="company_name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.company_name}
                                        placeholder="Company Name *"
                                        className="border border-gray-300 p-2 w-full rounded"
                                    />
                                    {errors.company_name && touched.company_name && <div className="text-red-500 text-sm mt-1">{errors.company_name}</div>}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="company_description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.company_description}
                                        placeholder="Description"
                                        className="border border-gray-300 p-2 w-full rounded"
                                    />
                                    {errors.company_description && touched.company_description && <div className="text-red-500 text-sm mt-1">{errors.company_description}</div>}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="company_status"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.company_status}
                                        placeholder="Company Status *"
                                        className="border border-gray-300 p-2 w-full rounded"
                                    />
                                    {errors.company_status && touched.company_status && <div className="text-red-500 text-sm mt-1">{errors.company_status}</div>}
                                </div>
                                <div>
                                    <input
                                        type="date"
                                        name="date"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.date}
                                        placeholder="Date"
                                        className="border border-gray-300 p-2 w-full rounded"
                                    />
                                    {errors.date && touched.date && <div className="text-red-500 text-sm mt-1">{errors.date}</div>}
                                </div>
                                <div className="text-center">
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default AddCompany;
