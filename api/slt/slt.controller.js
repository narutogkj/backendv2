const { create_SalesTrendreportReport } = require('./slt.services');
const { getDataFromSalesTrend } = require("./slt.services");
exports.postData = (req, res) => {
    data = req.body
    data.map(m => {
        Object.keys(m).map(e => {
            m[e.replace(/\s+/g, '_')] = m[e]
            if (e.replace(/\s+/g, '_') != e) {
                delete m[e]
            }
        })
        m.clientName = req.params.clientName
        m.Trans_Date_Time = Date.parse(m.Trans_Date_Time)
        m.Unit_Price = m.Unit_Price.replace('$', '').replace(' ', '')


        create_SalesTrendreportReport(m, (err, results) => {
            if (err) {
                console.log(err)
                result = false;
            }
        })

    })

    res.status(200).send({
        success: true,
        data
    })
}


exports.salesTrendReport = (req, res) => {
    let clientName = req.params.clientName
    getDataFromSalesTrend(clientName, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            })
        }
        return res.json({
            success: 1,
            data: results
        });
    });
}