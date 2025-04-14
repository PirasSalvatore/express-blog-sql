const express = require("express")
const app = express()
const port = 3000

//importo lr cors policy
const cors = require('cors')

//importo la middelware per la gestione degli errori lato server
const serverError = require("./middelware/serverError")

//importo la middelware per la gestione degli errori lato rout
const notFound = require("./middelware/notFound")

// import static assets
app.use(express.static("public"))
// importo le midleware per la lettura del request body
app.use(express.json())

//imposto il cors
app.use((cors)({
    origin: 'http://localhost:5173'
}))


//import rout
const postsRouter = require("./routers/posts")

app.listen(port, () => {
    console.log(`the blog server is run to port http://localhost:${port}`);
})

app.get('/', (req, res) => {
    res.send("welcome to blog server")
})

//uso le rout importate
app.use("/api/v1/posts", postsRouter)

//intercetto errori lato server
app.use(serverError)

//gestisco richieste di rout inesistenti o errate
app.use(notFound)