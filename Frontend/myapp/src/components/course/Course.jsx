import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { truncate } from '../util'
import { MdDelete } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { IoAddCircleOutline } from "react-icons/io5";
import { Modal, notification } from 'antd'


const Course = () => {

    const [course, setCourse] = useState([])

    const [conferm, setConferm] = useState(false)
    const [delete2, setDelete2] = useState("")

    const navigate = useNavigate()


    const getdata = (val = '') => {
        axios.get('http://localhost:3003/get-categories?search=' + val)
            .then((res) => {
                // console.log(res.data.data)
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
        axios.delete(`http://localhost:3003/delete-category/${delete2}`)
            .then((res) => {
                console.log(res.data)
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
        <div className='p-4'>

            <div className="table-up tableup">
                <h1>Course list</h1>
            </div>

            <div className='flex justify-end std1'>
                <input className='border w-[450px] h-[50px] rounded-xl in' onChange={searchHand} type="text" name="" placeholder='Search Course' id="" />
            </div>


            <div className='h-screen backk'>
                <div className='flex justify-end w-36 butt text-white' onClick={addCourse}>
                    <IoAddCircleOutline />
                    <button >Add New Course</button>
                </div>
                <Table bordered className='mt-4'>
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
                            course &&
                            course.map((elem, ind) => {
                                return (
                                    <tr>
                                        <td>{++ind}</td>
                                        <td style={{textTransform:'capitalize'}}>{elem.course_name}</td>
                                        <td className='text-left w-[800px]'>{elem.course_description ? truncate(elem.course_description, 100) : ''}</td>
                                        <td>
                                            <Button onClick={() => edithand(elem._id)} className='mx-3'><CiEdit /></Button>
                                            <Button onClick={() => deletehand11(elem._id)} ><MdDelete /></Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                    <Modal title="" open={conferm} onCancel={() => setConferm(false)}>
                        <div >
                            <h6>Are you sure  want to Delete this data?</h6>
                            <div className='model1'>
                                <Button className='mr-4' onClick={() => setConferm(false)}>cancel</Button>
                                <Button onClick={() => {
                                    deletehand()
                                    setConferm(false)
                                }}>delete</Button>
                            </div>
                        </div>
                    </Modal>
                </Table>
            </div>
        </div>
    )
}

export default Course