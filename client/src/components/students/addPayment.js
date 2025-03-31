import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

export default function AddPayment() {
  const [student, setStudent] = useState({});
  const [installmentAmount, setInstallmentAmount] = useState(null);
  const [nextPaymentDate, setNextPaymentDate] = useState('');
  const [completedPayments, setCompletedPayments] = useState(0);
  const [open, setOpen] = useState(false); // Control the popup open/close
  const [paymentAmount, setPaymentAmount] = useState(''); // Store payment input
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState(''); // Store error message

  // Validation states
  const [accountNameError, setAccountNameError] = useState('');
  const [accountNumberError, setAccountNumberError] = useState('');
  const [ifscError, setIfscError] = useState('');
  const [cvcError, setCvcError] = useState('');

  useEffect(() => {
    const token = jwtDecode(localStorage.getItem("token"));
    console.log(token.id)
    const studentId=token.id
    if (studentId) {
      axios.get('http://localhost:3000/api/financeManager/fetchpaymentstudent', { headers: { id: studentId } })
        .then((res) => {
          setStudent(res.data);
          console.log(res.data)
          const completed = res.data.paymentStatus === '0' ? 0 : parseInt(res.data.paymentStatus, 10);
          setCompletedPayments(completed);

  
          if (res.data.totalAmount && res.data.totalInstallment) {
            const amount = res.data.totalAmount / res.data.totalInstallment;
            setInstallmentAmount(amount);
            setPaymentAmount(amount); // Pre-fill the payment input with the installment amount
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const handlePayment = () => {
    // Validate fields
    let valid = true;
    if (!accountName) {
      setAccountNameError('Account holder name is required.');
      valid = false;
    } else {
      setAccountNameError('');
    }

    if (!accountNumber || !/^\d{9,18}$/.test(accountNumber)) {
      setAccountNumberError('Valid account number is required (9 to 18 digits).');
      valid = false;
    } else {
      setAccountNumberError('');
    }

    if (!ifsc || !/^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/.test(ifsc)) {
      setIfscError('Valid IFSC code is required.');
      valid = false;
    } else {
      setIfscError('');
    }

    if (!cvc || !/^\d{3,4}$/.test(cvc)) {
      setCvcError('Valid CVC is required (3 or 4 digits).');
      valid = false;
    } else {
      setCvcError('');
    }

    // Proceed if all validations pass
    if (paymentAmount && paymentAmount) {
      
      const nextPaymentStatus = completedPayments + 1; // Increment the payment status
      const token = jwtDecode(localStorage.getItem("token"));
      console.log(token.id)
      const studentId=token.id
      axios.put('http://localhost:3000/api/financeManager/updatePayment', 
        { paymentStatus: nextPaymentStatus,paidAmount:paymentAmount},
        { headers: { id: studentId } } // Send studentId in headers
      )
      .then(() => {
        // Update the payment status locally and close the popup
        setCompletedPayments(nextPaymentStatus);
        setPaymentAmount(''); // Clear input after successful payment
        setAccountName('');
        setAccountNumber('');
        setIfsc('');
        setCvc('');
        setOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
    } else {
      setError('Invalid payment amount! Please enter the correct installment amount.');
    }
  };

  const remainingInstallments = student.totalInstallment - completedPayments;

  return (
    <Container maxWidth="xs" style={{ paddingTop: '20px' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Student Payment Details
          </Typography>
          {student && student.studentId ? (
            <>
              <Typography variant="h6">Student Name: {student.studentId.studentName}</Typography>
              <Typography variant="body1"><strong>Course:</strong> {student.studentId.course.name}</Typography>
              <Typography variant="body1"><strong>Total Amount:</strong> ₹{student.totalAmount}</Typography>
              <Typography variant="body1"><strong>Paid Amount:</strong> ₹{student.paidAmount}</Typography>
             
              <Typography variant="body1"><strong>Total Installments:</strong> {student.totalInstallment}</Typography>
              <Typography variant="body1">
                <strong>Payment Status:</strong> 
                {completedPayments === 0 ? 'No Payment Made' :
                  completedPayments === student.totalInstallment ? 'All Payments Completed' :
                  `Payment ${completedPayments} Done`}
              </Typography>
              <Typography variant="body1"><strong>Payment Date:</strong> {new Date(student.paymentDate).toLocaleDateString()}</Typography>

              {installmentAmount !== null && (
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                  <strong>Current Installment Amount:</strong> ₹{installmentAmount}
                </Typography>
              )}

              <Typography variant="body1" style={{ marginTop: '10px' }}>
                <strong>Next Payment Date:</strong> {student.nextInstallmentDate}
              </Typography>

              <Typography variant="body1" style={{ marginTop: '10px' }}>
                <strong>Remaining Installments:</strong> {remainingInstallments}
              </Typography>

              {/* Button to open payment section */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setOpen(true)}
                style={{ marginTop: '20px' }}
              >
                Make Payment
              </Button>
            </>
          ) : (
            <Typography variant="body1">Loading student data...</Typography>
          )}
        </CardContent>
      </Card>

      {/* Dialog for Payment */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Make Payment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Payment Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            error={!!error}
            helperText={error}
          />

          {/* Account Details */}
          <TextField
            margin="dense"
            label="Account Holder Name"
            fullWidth
            variant="outlined"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            error={!!accountNameError}
            helperText={accountNameError}
          />
          <TextField
            margin="dense"
            label="Account Number"
            fullWidth
            variant="outlined"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            error={!!accountNumberError}
            helperText={accountNumberError}
          />
          <TextField
            margin="dense"
            label="IFSC Code"
            fullWidth
            variant="outlined"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
            error={!!ifscError}
            helperText={ifscError}
          />
          <TextField
            margin="dense"
            label="CVC"
            fullWidth
            variant="outlined"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            error={!!cvcError}
            helperText={cvcError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePayment} color="primary">
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}