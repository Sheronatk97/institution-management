// const jwt = require('jsonwebtoken');

// const protect = (roles) => {
//     return (req, res, next) => {
//         const token = req.headers['authorization']?.split(' ')[1];

//         if (!token) {
//             return res.status(401).json({ message: 'No token, authorization denied' });
//         }

//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = decoded;

//             if (roles && !roles.includes(decoded.role)) {
//                 return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
//             }

//             next();
//         } catch (err) {
//             res.status(401).json({ message: 'Token is not valid' });
//         }
//     };
// };



// module.exports = protect;


const jwt = require('jsonwebtoken');

const protect = (roles) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Check if user has required roles
            if (roles && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
            }

            next();
        } catch (err) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    };
};

module.exports = protect;
