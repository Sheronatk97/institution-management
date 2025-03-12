// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { TextField, Button, Typography, Container, Box } from '@mui/material';

// // const Login = () => {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [message, setMessage] = useState('');
    
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
// //             localStorage.setItem('token', response.data.token);
// //             setMessage('Login successful');
// //         } catch (error) {
// //             setMessage(error.response?.data?.message || 'Login failed');
// //         }
// //     };

// //     return (
// //         <Container maxWidth="xs">
// //             <Box
// //                 sx={{
// //                     display: 'flex',
// //                     flexDirection: 'column',
// //                     justifyContent: 'center',     
// //                     alignItems: 'center',
// //                     padding: 3,
// //                     borderRadius: 2,
// //                     boxShadow: 3,
// //                     padding:'100px'
// //                 }}
// //             >
// //                 <Typography variant="h5" gutterBottom>
// //                     Login
// //                 </Typography>
// //                 <form onSubmit={handleSubmit} style={{ width: '100%' }}>
// //                     <TextField
// //                         label="Email"
// //                         type="email"
// //                         variant="outlined"
// //                         fullWidth
// //                         margin="normal"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                         required
// //                     />
// //                     <TextField
// //                         label="Password"
// //                         type="password"
// //                         variant="outlined"
// //                         fullWidth
// //                         margin="normal"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                     />
// //                     <Button
// //                         type="submit"
// //                         variant="contained"
// //                         fullWidth
// //                         color="primary"
// //                         sx={{ marginTop: 2 }}
// //                     >
// //                         Login
// //                     </Button>
// //                 </form>
// //                 {message && (
// //                     <Typography
// //                         variant="body2"
// //                         color={message === 'Login successful' ? 'green' : 'red'}
// //                         sx={{ marginTop: 2 }}
// //                     >
// //                         {message}
// //                     </Typography>
// //                 )}
// //             </Box>
// //         </Container>
// //     );
// // };

// // export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Typography, Container, Box } from '@mui/material';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
//             localStorage.setItem('token', response.data.token);
//             setMessage('Login successful');
//         } catch (error) {
//             setMessage(error.response?.data?.message || 'Login failed');
//         }
//     };

//     return (
//         <Container maxWidth="xs">
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     padding: 3,
//                     borderRadius: 2,
//                     boxShadow: 3,
//                     padding:'100px'
//                 }}
//             >
//                 <Typography variant="h5" gutterBottom>
//                     Login
//                 </Typography>
//                 <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//                     <TextField
//                         label="Email"
//                         type="email"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Password"
//                         type="password"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         fullWidth
//                         color="primary"
//                         sx={{ marginTop: 2 }}
//                     >
//                         Login
//                     </Button>
//                 </form>

//                 {/* Registration Link */}
//                 <Box sx={{ marginTop: 2, textAlign: 'center' }}>
//                     <Typography variant="body2">
//                         Don't have an account?{' '}
//                         <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
//                             Register here
//                         </Link>
//                     </Typography>
//                 </Box>

//                 {message && (
//                     <Typography
//                         variant="body2"
//                         color={message === 'Login successful' ? 'green' : 'red'}
//                         sx={{ marginTop: 2 }}
//                     >
//                         {message}
//                     </Typography>
//                 )}
//             </Box>
//         </Container>
//     );
// };

// export default Login;







// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Typography, Container, Box } from '@mui/material';
// import { useNavigate ,Link} from 'react-router-dom'; // useNavigate from React Router v6

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate(); // hook for navigation

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Send login request to the server
//             const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
//             const { token, role } = response.data; // Assuming response contains 'token' and 'role'

//             // Save the token in localStorage
//             localStorage.setItem('token', token);

//             // Set a success message
//             setMessage('Login successful');

//             // Navigate based on the role
//             switch (role) {
//                 case 'admin':
//                     navigate('/admin'); // Navigate to Admin Dashboard
//                     break;
//                 case 'hr':
//                     navigate('/hr'); // Navigate to HR Dashboard
//                     break;
//                 case 'student':
//                     navigate('/student'); // Navigate to Student Dashboard
//                     break;
//                 case 'digital_marketing':
//                     navigate('/digital_marketing'); // Navigate to Digital Marketing Dashboard
//                     break;
//                 default:
//                     setMessage('Invalid role');
//             }
//         } catch (error) {
//             setMessage(error.response?.data?.message || 'Login failed');
//         }
//     };

//     return (
//         <Container maxWidth="xs">
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     padding: 3,
//                     borderRadius: 2,
//                     boxShadow: 3,
//                     padding: '100px'
//                 }}
//             >
//                 <Typography variant="h5" gutterBottom>
//                     Login
//                 </Typography>
//                 <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//                     <TextField
//                         label="Email"
//                         type="email"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Password"
//                         type="password"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         fullWidth
//                         color="primary"
//                         sx={{ marginTop: 2 }}
//                     >
//                         Login
//                     </Button>
//                 </form>

//                 {/* Registration Link */}
//                 <Box sx={{ marginTop: 2, textAlign: 'center' }}>
//                     <Typography variant="body2">
//                         Don't have an account?{' '}
//                         <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
//                             Register here
//                         </Link>
//                     </Typography>
//                 </Box>

//                 {message && (
//                     <Typography
//                         variant="body2"
//                         color={message === 'Login successful' ? 'green' : 'red'}
//                         sx={{ marginTop: 2 }}
//                     >
//                         {message}
//                     </Typography>
//                 )}
//             </Box>
//         </Container>
//     );
// };

// export default Login;





    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // Send login request to the server
    //         const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
    //         const { token, role } = response.data; // Assuming response contains 'token' and 'role'

    //         console.log('Response from server:', response.data); // Debugging log to check the structure

    //         if (!role) {     
    //             setMessage('Role not provided in the response');
    //             return;
    //         }

    //         // Save the token in localStorage
    //         localStorage.setItem('token', token);

           
    //         setMessage('Login successful');

    //         switch (role.toLowerCase()) {
    //             case 'admin':
    //                 navigate('/admin'); 
    //             case 'hr':
    //                 navigate('/hr'); 
    //                 break;
    //             case 'student':
    //                 navigate('/student'); 
    //                 break;
    //             case 'digital_marketing':
    //                 navigate('/digital_marketing');
    //                 break;
    //             default:
    //                 setMessage('Invalid role'); 
    //         }
    //     } catch (error) {
            
    //         console.error('Login error:', error);
    //         setMessage(error.response?.data?.message || 'Login failed');
    //     }
    // };



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // Send login request to the server
    //         const response = await axios.post('http://localhost:3000/api/auth/loginall', { email, password });
    //         const { token, role } = response.data; // Assuming response contains 'token' and 'role'
    
    //         console.log('Response from server:', response.data); // Debugging log to check the structure
    
    //         if (!role) {     
    //             setMessage('Role not provided in the response');
    //             return;
    //         }
    
    //         // Save the token in localStorage
    //         localStorage.setItem('token', token);
    
    //         setMessage('Login successful');
    
    //         // Ensure proper navigation using a break after each case
    //         switch (role.toLowerCase()) {
    //             case 'admin':
    //                 navigate('/admin');
    //                 break; // Added break here to prevent fall-through
    //             // case 'hr':
    //             //     navigate('/hr');
    //             //     break;
    //             case 'student':
    //                 navigate('/student');
    //                 break;
    //             case 'digital_marketing':
    //                 navigate('/digital_marketing');
    //                 break;
    //             case 'designer':
    //                 navigate('/graphic_designer');
    //                 break;
    //              case 'associate consultant':
    //                  navigate('/associate_consultant');
    //                     break;
    //              case 'video editor':
    //                  navigate('/video_Editor');
    //                     break;
    //             case 'finance manager':
    //                  navigate('/finance');
    //                     break;
    //             case 'team leader':
    //                  navigate('/team_lead');
    //                     break;
    //             case 'BDM':
    //                 navigate('/sales');
    //                     break;
    //             case 'team leader':
    //                 navigate('/team_lead');
    //                     break;
    //             default:
    //                 setMessage('Invalid role');
    //         }
    //     } catch (error) {
    //         console.error('Login error:', error);
    //         setMessage(error.response?.data?.message || 'Login failed');
    //     }
    // };
    import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'; // useNavigate from React Router v6

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // hook for navigation
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Send login request to the server
        const response = await axios.post('http://localhost:3000/api/auth/loginall', { email, password });
        
        console.log('Response from server:', response.data); // Log the full response

        const { token, role } = response.data; // Assuming response contains 'token' and 'role'
        
        if (!role) {     
            setMessage('Role not provided in the response');
            return;
        }

        // Save the token in localStorage
        localStorage.setItem('token', token);

        setMessage('Login successful');

        // Ensure proper navigation using a break after each case
        switch (role.toLowerCase()) {
            case 'admin':
                navigate('/admin');
                break;
            case 'student':
                navigate('/student');
                break;
            case 'digital marketer':
                navigate('/digital_marketing');
                break;
            case 'designer':
                navigate('/graphic_designer');
                break;
            case 'associate consultant':
                navigate('/associate_consultant');
                break;
            case 'video editor':
                navigate('/video_Editor');
                break;
            case 'finance manager':
                navigate('/finance');
                break;
            case 'team leader':
                navigate('/team_lead');
                break;
            case 'bdm':
                navigate('/sales');
                break;
            default:
                setMessage('Invalid role');
        }
    } catch (error) {
        console.error('Login error:', error);
        setMessage(error.response?.data?.message || 'Login failed');
    }
};


    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    padding: '100px',
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Login
                    </Button>
                </form>

                {/* Registration Link */}
                <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                            Signup
                        </Link>
                    </Typography>
                </Box>

                {message && (
                    <Typography
                        variant="body2"
                        color={message === 'Login successful' ? 'green' : 'red'}
                        sx={{ marginTop: 2 }}
                    >
                        {message}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default Login;
