function serverError(err, req, res, next) {

    console.error(err.stack);

    res.status(500).json({
        error: "500 error Internal Server",
        message: err.message
    })

}

module.exports = serverError