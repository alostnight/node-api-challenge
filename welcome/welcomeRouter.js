const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
	res.status(200).json({
		message: `Welcome to ${process.env.API}, ${process.env.NAME}`,
	})
})

module.exports = router