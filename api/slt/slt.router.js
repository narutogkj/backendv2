const router = require("express").Router();
const { postData } = require("./slt.controller");
const { salesTrendReport } = require("./slt.controller");



router.post("/:clientName", postData);
router.get('/:clientName', salesTrendReport)


module.exports = router;