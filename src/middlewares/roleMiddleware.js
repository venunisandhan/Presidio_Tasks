
const roleMiddleware = (...allowedRoles) => {

    return (req , res , next) => {

        if(!req.user)
        {
            return res.status(401).json({
                success : false ,
                message : 'User not authenticated' ,
            });
        }

        if(!allowedRoles.includes(req.user.role))
        {
            return res.status(401).json({
                success : false ,
                message : ' Access denied. Requires proper roles' ,
            });
        }

        next();
    }
};

module.exports = roleMiddleware ;