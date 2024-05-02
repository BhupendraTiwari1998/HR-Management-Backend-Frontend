import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Modal, notification } from 'antd'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
// import PaginationComp from '../pagination/PaginationComp'

const StudentList = () => {

    const [student, setStudent] = useState([]);

    const navigate = useNavigate()

    const [delete1, setDelete1] = useState()
    const [confDelete, setConfDelete] = useState(false)

    const getdata = (val = '') => {
        axios.get('http://localhost:3003/get-students?search=' + val)
            .then((res) => {
                // console.log(res.data.data)
                setStudent(res.data.data)
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
    }, [confDelete])

    const deletehand = () => {

        axios.delete(`http://localhost:3003/delete-student/${delete1}`)
            .then((res) => {
                // console.log(res)
                notification.success({ message: "Delete Successfully" })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteHand22 = (id) => {
        setConfDelete(true)
        setDelete1(id)
    }

    const ClickHandler = (id) => {
        // console.log("iddddd", id)
        navigate(`/single_student/${id}`)
    }

    const studentEdit = (id) => {
        navigate(`/edit_std/${id}`)
    }



    return (
        <>
            <div className=" table-up tableup">
                <h1>student list</h1>
            </div>

            <div className='flex justify-end std1'>
                <input className='border w-[450px] h-[50px] rounded-xl in' onChange={searchHand} type="text" name="" placeholder='Search Here' id="" />
            </div>
            <div className='h-screen backk'>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Course Name</th>
                            <th>View Info</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            student &&
                            student.map((elem, ind) => {
                                return (
                                    <tr>
                                        <td>{++ind}</td>
                                        <td>{elem.name}</td>
                                        <td>{elem.email}</td>
                                        <td>{elem.contact}</td>
                                        <td>{elem.course_category.course_name}</td>
                                        <td><a href="" onClick={() => ClickHandler(elem._id)}>View info</a></td>
                                        <td>
                                            <Button className='mx-2' onClick={() => studentEdit(elem._id)}><CiEdit /></Button>
                                            <Button clas onClick={() => deleteHand22(elem._id)}><MdDelete /></Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                    <Modal title="" open={confDelete} onCancel={() => setConfDelete(false)}>
                        <div >
                            <h6>Are you sure  want to Delete this data?</h6>
                            <div className='model1'>
                                <Button className='mr-4' onClick={() => setConfDelete(false)}>cancel</Button>
                                <Button onClick={() => {
                                    deletehand()
                                    setConfDelete(false)
                                }}>delete</Button>
                            </div>
                        </div>
                    </Modal>
                </Table>
                {/* <PaginationComp /> */}
            </div>

        </>
    )
}

export default StudentList