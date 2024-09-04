import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { truncate } from '../util'
import { MdDelete } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { IoAddCircleOutline } from "react-icons/io5"
import { Modal, notification } from 'antd'

const Course = () => {
    const [course, setCourse] = useState([])
    const [conferm, setConferm] = useState(false)
    const [delete2, setDelete2] = useState("")
    const navigate = useNavigate()

    const getdata = (val = '') => {
        axios.get('https://hr-management-backend-frontend.onrender.com/get-categories?search=' + val)
            .then((res) => {
                setCourse(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const searchHand = (e) => {
        getdata(e.target.value)
    }

    useEffect(() => {
        getdata()
    }, [conferm])

    const edithand = (id) => {
        navigate(`/edit-course/${id}`)
    }

    const deletehand = () => {
        axios.delete(`https://hr-management-backend-frontend.onrender.com/delete-category/${delete2}`)
            .then((res) => {
                notification.success({ message: "Deleted successfully" })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deletehand11 = (id) => {
        setConferm(true)
        setDelete2(id)
    }

    const addCourse = () => {
        navigate('/add-course')
    }

    return (
        <div className='p-4 max-w-7xl mx-auto'>
            <div className="table-up tableup">
                <h1 className='text-2xl font-bold mb-4'>Course List</h1>
            </div>

            <div className='flex justify-end mb-4 std1'>
                <input
                    className='border rounded-xl px-4 py-2 w-full md:w-[450px]'
                    onChange={searchHand}
                    type="text"
                    placeholder='Search Course'
                />
            </div>

            <div >
                <Button
                    className='flex items-center mb-4 md:mb-0 text-white bg-blue-500 hover:bg-blue-600'
                    onClick={addCourse}
                >
                    <IoAddCircleOutline className='mr-2' />
                    Add New Course
                </Button>

                <div className='w-full'>
                    <Table bordered responsive className='mt-4'>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Course Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                course.map((elem, ind) => (
                                    <tr key={elem._id}>
                                        <td>{++ind}</td>
                                        <td className='text-capitalize'>{elem.course_name}</td>
                                        <td className='text-left'>{elem.course_description ? truncate(elem.course_description, 30) : ''}</td>
                                        <td>
                                            <Button onClick={() => edithand(elem._id)} className='mx-2'>
                                                <CiEdit />
                                            </Button>
                                            <Button onClick={() => deletehand11(elem._id)} variant='danger'>
                                                <MdDelete />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>

                <Modal
                    title=""
                    open={conferm}
                    onCancel={() => setConferm(false)}
                    footer={null}
                >
                    <div>
                        <h6>Are you sure you want to delete this data?</h6>
                        <div className='flex justify-end mt-4'>
                            <Button className='mr-4' onClick={() => setConferm(false)}>Cancel</Button>
                            <Button
                                type='primary'
                                onClick={() => {
                                    deletehand()
                                    setConferm(false)
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Course
