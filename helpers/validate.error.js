export const validateClient = (req, res, next) => {
    try {
        if (req.user?.role !== 'CLIENT') {
            return res.status(403).send({ message: 'Access denied, only clients' });
        }
        next()
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General Error', err });
    }
}

export const validateAdmin = (req,res,next)=>{
    try {
        if (req.user?.role !== 'ADMIN') return res.status(403).send({
            message: 'Access denied, only admins'
        })
        next()
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General Error', err })
    }
}