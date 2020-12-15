const router = require("express").Router();
const { postData } = require("./slt.controller");
const { salesTrendReport, salesTrendReportWithCondition } = require("./slt.controller");



router.post("/:clientName", postData);
router.get('/:clientName', salesTrendReport)
router.get('/:clientName/:store/:product', salesTrendReportWithCondition)

module.exports = router;