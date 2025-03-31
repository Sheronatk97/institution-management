import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';

export default function ViewStudents() {
    const [students, setStudents] = useState([]);
    const [fetchedStudents,setFetchedStudents]=useState([])
    const [filterStudents,setFilteredStudents]=useState([])
    useEffect(() => {
        console.log("Fetching students...");
        axios.get("http://localhost:3000/api/financeManager/viewStudents")
            .then((res) => {
                console.log("Students", res.data);
                setStudents(res.data); 
            })
            .catch((err) => {
                console.error("Error fetching students:", err);
            });
    
        axios.get("http://localhost:3000/api/financeManager/fetchpaymentsfinance")
            .then((res) => {
                console.log("Finance", res.data);
                setFetchedStudents(res.data); 
            })
            .catch((err) => {
                console.log(err);
            });
    
    }, []); // Empty dependency array, so this runs only once when the component mounts.
    
    useEffect(() => {
        if (students.length > 0 || fetchedStudents.length > 0) {
            // Filter out students whose _id matches any studentId._id in the fetchedStudents array
            const filterStudents = students.filter((student) => 
                !fetchedStudents.some((fetchedStudent) => fetchedStudent.studentId._id === student._id)
            );
    
            console.log("Filtered students", filterStudents);
            // You can set the filtered students in the state if you want to use them in the UI
            setFilteredStudents(filterStudents);
        }
    }, [students, fetchedStudents]); // This effect runs when either students or fetchedStudents changes
    

    const handleChange = (studentId, field, value) => {
        setStudents((prevStudents) => 
            prevStudents.map(student => 
                student._id === studentId 
                ? { ...student, [field]: value } 
                : student
            )
        );
    };

    const handleSubmit = (studentId) => {
        const student = students.find(s => s._id === studentId);
        const installment = student.totalAmount / student.totalInstallments;

        console.log(`Student ID: ${studentId}`);
        console.log(`Installment: ${installment}`);
        console.log(`Total Amount: ${student.totalAmount}`);
        console.log(`Total Installments: ${student.totalInstallments}`);
        console.log(`Paymentmethod:${student.paymentmethod}`)
        axios.post(`http://localhost:3000/api/financeManager/addFees/${studentId}`, {
            totalAmount: student.totalAmount,
            totalInstallment: student.totalInstallments,
            installment,
            paymentmethod:student.paymentmethod
        })
        .then((res) => {
            alert(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <>
            <h1>Students</h1>
            {filterStudents.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student Name</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell>Total Amount</TableCell>
                                <TableCell>Payment Method</TableCell>
                                <TableCell>Total Installments</TableCell>
                                <TableCell>Installment per Student</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterStudents.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.course.name}</TableCell>
                                    <TableCell>
                                        <input
                                            type="number"
                                            value={student.totalAmount || ''}
                                            onChange={(e) => handleChange(student._id, 'totalAmount', e.target.value)}
                                            placeholder="Total Amount"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <select name="paymentmethod"   onChange={(e) => handleChange(student._id, 'paymentmethod', e.target.value)}
                                       >
                                            <option value="Installment">Installment</option>
                                            <option value="Fullpayment">Fullpayment</option>
                                            <option value="#" selected>--select payment method--</option>
                                        </select>
                                    </TableCell>
                                  {
                                    student.paymentmethod=="Installment"?   <TableCell>
                                    <input
                                        type="number"
                                        value={student.totalInstallments || ''}
                                        onChange={(e) => handleChange(student._id, 'totalInstallments', e.target.value)}
                                        placeholder="Installments"
                                    />
                                </TableCell>:<TableCell>N/A</TableCell>
                                  }
                                    <TableCell>
                                        {student.totalAmount && student.totalInstallments
                                            ? student.totalAmount / student.totalInstallments
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleSubmit(student._id)}>
                                            Submit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <p>No students available.</p>
            )}
        </>
    );
}