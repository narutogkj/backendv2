const { create_SalesTrendreportReport } = require('./slt.services');
const { getDataFromSalesTrend, selectWithCondition } = require("./slt.services");
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

exports.salesTrendReportWithCondition = (req, res) => {
    let store = JSON.parse(req.params.store);
    let product = JSON.parse(req.params.product);
    let startDate = JSON.parse(req.params.startDate);
    let endDate = JSON.parse(req.params.endDate);
    let sqlString = `SELECT * FROM sales_trend_report where clientName = '${req.params.clientName}' `;


    let storeString = `(`;
    for (i = 0; i < store.length; i++) {
        if (i != 0) {
            storeString += 'OR '
        }
        storeString += `Store = '${store[i]}'`
    }
    storeString += ')'

    let productString = `(`;
    for (i = 0; i < product.length; i++) {
        if (i != 0) {
            productString += 'OR '
        }
        productString += `Product_Desc = '${product[i]}'`
    }
    productString += ')'

    let dateString = ` Trans_Date_Time >= ${startDate} AND Trans_Date_Time <= ${endDate} `;


    sqlString = `${sqlString} AND ${storeString} AND ${productString} AND ${dateString}`;
    selectWithCondition(sqlString, (err, results) => {
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