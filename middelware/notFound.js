function notFound(req, res, next) {
    console.log("rout not found");

    res.status(404).json({
        error: "ERROR 404 not found",
        message: "so sorry, i don't foud " + req.url
    })

}

module.exports = notFound