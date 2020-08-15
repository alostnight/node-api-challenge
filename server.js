const express = require('express');
const helmet = require("helmet")
const cors = require("cors")
const logger =  require("./middleware/logger")
const welcomeRouter = require("./welcome/welcomeRouter")
const projectRouter = require("./projects/projectRouter")
const actionRouter = require("./actions/actionsRouter")


const server = express()
const port = process.env.PORT || 2319

server.use(express.json())
server.use(cors())
server.use(helmet())

server.use(logger())

server.use(welcomeRouter)
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "something went wrong",
    })
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = server;
