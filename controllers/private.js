exports.getPrivateData = (req, res, next) => {
    res.status(201).json({
        success: true,
        data: "Access gained"
    })
};