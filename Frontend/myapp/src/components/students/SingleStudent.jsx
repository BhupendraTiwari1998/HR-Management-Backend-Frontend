import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Button, Row, Col, Table } from 'react-bootstrap'
import { Modal, notification } from 'antd';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import moment from 'moment'
import { truncate } from '../util';

const SingleStudent = () => {

  //for student 

  const [singlestudent, setSinglestudent] = useState({});

  const { student_id } = useParams()
  const navigate = useNavigate()

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


  const clickBack = () => {
    navigate('/')
  }

  // for company

  const [company, setCompany] = useState([])

  const [isModalOpen, setisModalOpen] = useState(false)
  const [delete3, setDelete3] = useState("")


  const getdata = (val = '') => {
    // console.log("xghjkj",val)
    axios.get(`http://localhost:3003/get-companies?studentid=${student_id}&search=${val}`)
      .then((res) => {
        // console.log(res.data.data)
        setCompany(res.data.data)
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
  }, [isModalOpen, student_id])


  const Companyhand = () => {
    navigate('/add-company/' + student_id)
  }

  const deletehand = () => {
    axios.delete(`http://localhost:3003/delete-company/${delete3}`)
      .then((res) => {
        // console.log(res)
        notification.success({ message: "Deleted successfully" })
        // setDelete3(id)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const setisModalOpen11 = (id) => {
    setisModalOpen(true)
    setDelete3(id)
  }
  
  return (
    <div>
      <div className='color h-[650px]'>

        <h1 className='pt-5 upper'>Profile : {singlestudent.name}</h1>
        <div className='trans' style={{ height: '', width: '800px', margin: ' 50px auto', textAlign: 'left', lineHeight: 2 }}>

          <Row>
            <Col md={5}>
              <div className='mx-5 leading-9 text-c py-4 right'>
                <h3>Name :</h3>
                <h3>Email :</h3>
                <h3>Contact :</h3>
                <h3>Course Name :</h3>

              </div>
            </Col>

            <Col md={7}>
              <div className='deta py-4 '>
                <h3>{singlestudent.name}</h3>
                <h3>{singlestudent.email}</h3>
                <h3>{singlestudent.contact}</h3>
                <h3>{singlestudent.course_category?.course_name}</h3>
              </div>
            </Col>
          </Row>

        </div>

        <button className='but' onClick={clickBack}>Back</button>

      </div>

      <div className='back bord h-[400px]'>

        <div className='d-flex justify-between items-center px-10 down my-5'>
          <h3 className='text-[#ff9843ad] mt-4'>Company Details</h3>
          <input className='border w-[450px] h-[50px] rounded-xl in' onChange={searchHand} type="text" name="" placeholder='Search Course' id="" />
          <button className='my-10 butt ' onClick={Companyhand}>Add Company</button>
        </div>

        <Table bordered>
          <thead>
            <tr className='big'>
              <th>Sr.No</th>
              <th>Company Name</th>
              <th>Company Description</th>
              <th>Date</th>
              <th>Company Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              company &&
              company.map((com, ind) => {
                // console.log("cooooooonnnnn",com)
                return (
                  <tr>
                    <td>{++ind}</td>
                    <td>{com.company_name}</td>
                    <td>{com.company_description ? truncate(com.company_description, 90) : ''}</td>
                    <td>{moment(com.date).utc().format('YYYY-MM-DD')}</td>
                    <td>{com.company_status}</td>
                    <td className='d-flex'>
                      <Button className='m-2' onClick={() => navigate(`/edit-company/${com._id}`)}><CiEdit /></Button>
                      <Button className='m-2' onClick={() => setisModalOpen11(com._id)}><MdDelete /></Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>

          <Modal title="" open={isModalOpen} onCancel={() => setisModalOpen(false)}>
            <div >
              <h6>Are you sure  want to Delete this data?</h6>
              <div className='model1'>
                <Button className='mr-4' onClick={() => setisModalOpen(false)}>cancel</Button>
                <Button onClick={() => {
                  deletehand()
                  setisModalOpen(false)
                }}>delete</Button>
              </div>
            </div>
          </Modal>
        </Table>
      </div>


    </div>
  )
}

export default SingleStudent