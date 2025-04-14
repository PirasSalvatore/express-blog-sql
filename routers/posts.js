const express = require("express")
const router = express.Router()

const postsController = require("../controllers/postController")

//index (read)
router.get("/", postsController.index)

//show (read)
router.get("/:Slug", postsController.show)

//store (create)
router.post("/", postsController.store)

//update (update)
router.put("/:Slug", postsController.update)

//partial update (update)
router.patch("/:Slug", postsController.modify)

//delete (delete)
router.delete("/:Slug", postsController.destroy)

module.exports = router