
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
const WhatsAppButton = () => {
  const [user,setUser]=useState([])
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const[PhoneNumber,setPhoneNumber]=useState(null)
  useEffect(()=>{
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found, please login");
          setLoading(false);
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
      setPhoneNumber(user.consultant.phone)
        const response = await axios.get(
          `http://localhost:3000/api/auth/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data)
        setUser(response.data);
      } catch (err) {
        setError("Error fetching user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  
  },[])
  

  const message = "Hello, I need help with my course"; 
  const whatsappUrl = `https://wa.me/${PhoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="Chat with us on WhatsApp" 
          style={styles.floatingIcon} 
        />
      </a>
    </div>
  );
};

const styles = {
  floatingIcon: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#25D366", 
    padding: "15px",
    cursor: "pointer",
  },
};

export default WhatsAppButton;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';

// const WhatsAppButton = () => {
//   const [user, setUser] = useState(null); // Initially set as null instead of an array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("No token found, please login");
//           setLoading(false);
//           return;
//         }

//         const decodedToken = jwtDecode(token);
//         const userId = decodedToken.id;

//         const response = await axios.get(
//           `http://localhost:3000/api/auth/profile/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log(response.data);
//         setUser(response.data);
//       } catch (err) {
//         setError("Error fetching user profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Handle loading, error or empty state
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   // Check if user and user.consultant exist before accessing phone
//   const phoneNumber = user?.consultant?.phone;

//   if (!phoneNumber) {
//     return <div>Phone number not available</div>;
//   }

//   const message = "Hello, I need help with my course";
//   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

//   return (
//     <div>
//       <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
//         <img 
//           src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
//           alt="Chat with us on WhatsApp" 
//           style={styles.floatingIcon} 
//         />
//       </a>
//     </div>
//   );
// };

// const styles = {
//   floatingIcon: {
//     position: "fixed",
//     bottom: "20px",
//     right: "20px",
//     width: "60px",
//     height: "60px",
//     borderRadius: "50%",
//     backgroundColor: "#25D366", 
//     padding: "15px",
//     cursor: "pointer",
//   },
// };

// export default WhatsAppButton;
