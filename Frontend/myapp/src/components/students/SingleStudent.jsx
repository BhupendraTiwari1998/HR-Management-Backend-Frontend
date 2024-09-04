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

  // For student 
  const [singlestudent, setSinglestudent] = useState({});
  const { student_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3003/get-student/${student_id}`)
      .then((res) => {
        setSinglestudent(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [student_id]);

  const clickBack = () => {
    navigate('/');
  };

  // For company
  const [company, setCompany] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [delete3, setDelete3] = useState("");

  const getdata = (val = '') => {
    axios.get(`http://localhost:3003/get-companies?studentid=${student_id}&search=${val}`)
      .then((res) => {
        setCompany(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchHand = (e) => {
    getdata(e.target.value);
  };

  useEffect(() => {
    getdata();
  }, [isModalOpen, student_id]);

  const Companyhand = () => {
    navigate('/add-company/' + student_id);
  };

  const deletehand = () => {
    axios.delete(`http://localhost:3003/delete-company/${delete3}`)
      .then((res) => {
        notification.success({ message: "Deleted successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setisModalOpen11 = (id) => {
    setisModalOpen(true);
    setDelete3(id);
  };

  return (
    <div className='container'>
      <div className='color h-[650px]'>
        <h1 className='pt-5 upper text-center'>Profile : {singlestudent.name}</h1>
        <div className='trans mx-auto p-4' style={{ maxWidth: '800px', textAlign: 'left', lineHeight: 2 }}>
          <Row>
            <Col xs={12} md={5}>
              <div className='mx-5 leading-9 text-c py-4'>
                <h3>Name :</h3>
                <h3>Email :</h3>
                <h3>Contact :</h3>
                <h3>Course Name :</h3>
              </div>
            </Col>
            <Col xs={12} md={7}>
              <div className='deta py-4'>
                <h3>{singlestudent.name}</h3>
                <h3>{singlestudent.email}</h3>
                <h3>{singlestudent.contact}</h3>
                <h3>{singlestudent.course_category?.course_name ? singlestudent.course_category?.course_name : "Uncategorised"}</h3>
              </div>
            </Col>
          </Row>
        </div>
        <button className='but' onClick={clickBack}>Back</button>
      </div>

      <div className='back bord'>
        <div className='d-flex flex-column flex-md-row justify-content-between align-items-center px-8 down my-5'>
          <h3 className='text-[#ff9843ad] mt-4 text-center'>Company Details</h3>
          <input className='border w-full md:w-[450px] h-[50px] rounded-xl in my-3 my-md-0' onChange={searchHand} type="text" placeholder='Search Company' />
          <button className='butt mt-3 mt-md-0' onClick={Companyhand}>Add Company</button>
        </div>
        <div className='px-4'>
          <Table bordered responsive>
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
              {company && company.map((com, ind) => (
                <tr key={com._id}>
                  <td>{ind + 1}</td>
                  <td>{com.company_name}</td>
                  <td>{com.company_description ? truncate(com.company_description, 90) : ''}</td>
                  <td>{moment(com.date).utc().format('YYYY-MM-DD')}</td>
                  <td>{com.company_status}</td>
                  <td className='d-flex'>
                    <Button className='m-2' onClick={() => navigate(`/edit-company/${com._id}`)}><CiEdit /></Button>
                    <Button className='m-2' onClick={() => setisModalOpen11(com._id)}><MdDelete /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal title="" open={isModalOpen} onCancel={() => setisModalOpen(false)}>
            <div>
              <h6>Are you sure you want to delete this data?</h6>
              <div className='model1'>
                <Button className='mr-4' onClick={() => setisModalOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                  deletehand();
                  setisModalOpen(false);
                }}>Delete</Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SingleStudent;
