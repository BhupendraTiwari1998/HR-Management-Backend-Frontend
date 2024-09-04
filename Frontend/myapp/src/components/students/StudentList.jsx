import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, notification } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
// import PaginationComp from '../pagination/PaginationComp';

const StudentList = () => {
    const [student, setStudent] = useState([]);
    const navigate = useNavigate();
    const [delete1, setDelete1] = useState();
    const [confDelete, setConfDelete] = useState(false);

    const getdata = (val = '') => {
        axios.get('https://hr-management-backend-frontend.onrender.com//get-students?search=' + val)
            .then((res) => {
                setStudent(res.data.data);
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
    }, [confDelete]);

    const deletehand = () => {
        axios.delete(`https://hr-management-backend-frontend.onrender.com//delete-student/${delete1}`)
            .then((res) => {
                notification.success({ message: "Deleted Successfully" });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteHand22 = (id) => {
        setConfDelete(true);
        setDelete1(id);
    };

    const ClickHandler = (id) => {
        navigate(`/single_student/${id}`);
    };

    const studentEdit = (id) => {
        navigate(`/edit_std/${id}`);
    };

    return (
        <>
            <div className="table-up tableup">
                <h1>Student List</h1>
            </div>

            <div className="flex justify-end pr-5 mt-2.5 std1">
                <input
                    className="border w-full md:w-[70%] lg:w-[450px] h-[40px] md:h-[45px] lg:h-[50px] rounded-xl in p-2 mx-3"
                    onChange={searchHand}
                    type="text"
                    placeholder="Search Here"
                />
            </div>

            <div className="h-screen px-2 md:px-4 backk">
                <div className="table-responsive">
                    <Table bordered className="text-sm md:text-base lg:text-lg">
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
                            {student.map((elem, ind) => (
                                <tr key={elem._id}>
                                    <td>{ind + 1}</td>
                                    <td>{elem.name}</td>
                                    <td>{elem.email}</td>
                                    <td>{elem.contact}</td>
                                    <td>{elem.course_category?.course_name || "Uncategorised"}</td>
                                    <td>
                                        <Button
                                            variant="link"
                                            className="p-0"
                                            onClick={() => ClickHandler(elem._id)}
                                        >
                                            View Info
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            className="mx-1 p-1 md:mx-2 md:p-2"
                                            onClick={() => studentEdit(elem._id)}
                                        >
                                            <CiEdit size={18} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="mx-1 p-1 md:mx-2 md:p-2"
                                            onClick={() => deleteHand22(elem._id)}
                                        >
                                            <MdDelete size={18} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <Modal title="" open={confDelete} onCancel={() => setConfDelete(false)}>
                    <div>
                        <h6>Are you sure you want to delete this data?</h6>
                        <div className="d-flex justify-content-end">
                            <Button className="mr-4" onClick={() => setConfDelete(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    deletehand();
                                    setConfDelete(false);
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default StudentList;
