import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function ViewPaymentdetails() {
  const [student, setStudent] = useState([]);
  const [nextInstallmentDate,setnextInstallmentDate]=useState('')
  useEffect(() => {
    axios.get("http://localhost:3000/api/financeManager/fetchpaymentsfinance")
      .then((res) => {
        console.log(res.data);
        setStudent(res.data); // Set the student payment data in the state
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSendEmail = (payment,id) => {
    const { studentId, totalInstallment, paidAmount, totalAmount } = payment;
    const remainingInstallments = totalInstallment - paidAmount / (totalAmount / totalInstallment);
    const nextInstallmentAmount = totalAmount / totalInstallment;

    // Calculate next installment date (add 1 month to paymentDate)
    const paymentDate = new Date(payment.paymentDate);
    // paymentDate.setMonth(paymentDate.getMonth() + 1);  // Add 1 month
    // const nextInstallmentDate = paymentDate.toLocaleString(); // Format the date

    // Email data to send to backend
    const emailData = {
      email: studentId.email,
      totalInstallments: totalInstallment,
      nextInstallmentAmount: nextInstallmentAmount,
      remainingInstallments: remainingInstallments,
      nextInstallmentDate,
      id
    };

    // Send email via backend
     console.log(emailData)
     
    axios.post('http://localhost:3000/api/financeManager/sendPaymentEmail', emailData)
      .then(response => {
        console.log("Email sent successfully", response.data);
        alert("Email sent successfully to " + studentId.email);
      })
      .catch(error => {
        console.error("Error sending email", error);
        alert("Error sending email");
      });
  };

  return (
    <>
      <h1>View Payment Details</h1>
      {student.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Total Installments</TableCell>
                <TableCell>Paid Amount</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell>No Of Paid Installments</TableCell>
                <TableCell>Next Installment Date</TableCell> {/* Add column for next installment date */}
                <TableCell>Action</TableCell> {/* Add column for the button */}
              </TableRow>
            </TableHead>
            <TableBody>
              {student.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{payment.studentId.name}</TableCell>
                  <TableCell>{payment.studentId.course.name}</TableCell>
                  <TableCell>{payment.totalAmount}</TableCell>
                  <TableCell>{payment.totalInstallment}</TableCell>
                  <TableCell>{payment.paidAmount}</TableCell>
                  <TableCell>{new Date(payment.paymentDate).toLocaleString()}</TableCell>
                  <TableCell>{payment.paymentStatus}</TableCell>
                  <TableCell>
  <input 
    type='date' 
    name="nextInstallmentdate" 
    onChange={(e) => setnextInstallmentDate(e.target.value)} 
  />
</TableCell>
  <TableCell>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => handleSendEmail(payment,payment._id)}
                      disabled={payment.paymentmethod=="Fullpayment"}
                    >
                      Send Payment Email
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No payment details available.</p>
      )}
    </>
  );
}