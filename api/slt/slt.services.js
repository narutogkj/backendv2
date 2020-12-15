const pool = require("../../config/database");

function fillblankValuesWithNullSTR(data) {

    if (!data.Trans_Date_Time) {
        data.Trans_Date_Time = ''
    } if (!data.Trans_ID) {
        data.Trans_ID = ''
    } if (!data.Store) {
        data.Store = ''
    } if (!data.System_Category) {
        data.System_Category = ''
    } if (!data.Salesperson) {
        data.Salesperson = ''
    } if (!data.Contract_Type) {
        data.Contract_Type = ''
    } if (!data.Department) {
        data.Department = ''
    } if (!data.Customer) {
        data.Customer = ''
    } if (!data.Category) {
        data.Category = ''
    } if (!data.Trans_Type) {
        data.Trans_Type = ''
    } if (!data.Product_Desc) {
        data.Product_Desc = ''
    } if (!data.Product_ID) {
        data.Product_ID = ''
    } if (!data.Qty) {
        data.Qty = ''
    } if (!data.Unit_Price) {
        data.Unit_Price = 0
    } if (!data.Unit_Cost) {
        data.Unit_Cost = 0
    } if (!data.Discounts) {
        data.Discounts = 0
    } if (!data.Ext_Cost) {
        data.Ext_Cost = 0
    } if (!data.Ext_Price) {
        data.Ext_Price = 0
    } if (!data.GP) {
        data.GP = 0
    } if (!data.Tax) {
        data.Tax = 0
    } if (!data.Total_Sales) {
        data.Total_Sales = ''
    } if (!data.Activated_Mobile_Number) {
        data.Activated_Mobile_Number = ''
    } if (!data.Serial_1) {
        data.Serial_1 = ''
    } if (!data.SKU) {
        data.SKU = ''
    } if (!data.Trans_Start_Time) {
        data.Trans_Start_Time = ''
    } if (!data.Trans_Date) {
        data.Trans_Date = ''
    } if (!data.Trans_Day) {
        data.Trans_Day = ''
    } if (!data.Trans_Month) {
        data.Trans_Month = ''
    } if (!data.Trans_Year) {
        data.Trans_Year = ''
    }
    return data;
}


exports.create_SalesTrendreportReport = (data, callBack) => {
    data = JSON.parse(JSON.stringify(data).replace(/(?<=")\s/g, "").replace(/\s(?=\w+":)/g, "").replace(/\s(?=":)/g, ""));
    data = fillblankValuesWithNullSTR(data);
    pool.query(
        `insert into sales_trend_report(Trans_Date_Time, 
            Trans_ID, 
            Store, 
            System_Category, 
            Salesperson,
            Contract_Type,  
            Department,
            Customer, 
            Category, 
            Trans_Type, 
            Product_Desc, 
            Product_ID, 
            Qty, 
            Unit_Cost, 
            Unit_Price, 
            Discounts,
            Ext_Cost,
            Ext_Price, 
            gp,
            Tax,
            Total_Sales,
            Activated_Mobile_Number,
            Serial_1,
            SKU,
            Trans_Start_Time,
            Trans_Date, 
            Trans_Day, 
            Trans_Month,
            Trans_Year,
            clientName
            ) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
            data.Trans_Date_Time,
            data.Trans_ID,
            data.Store,
            data.System_Category,
            data.Salesperson,
            data.Contract_Type,
            data.Department,
            data.Customer,
            data.Category,
            data.Trans_Type,
            data.Product_Desc,
            data.Product_ID,
            data.Qty,
            data.Unit_Cost,
            data.Unit_Price,
            data.Discounts,
            data.Ext_Cost,
            data.Ext_Price,
            data.GP,
            data.Tax,
            data.Total_Sales,
            data.Activated_Mobile_Number,
            data.Serial_1,
            data.SKU,
            new Date(data.Trans_Start_Time).getTime(),
            new Date(data.Trans_Date).getTime(),
            data.Trans_Day,
            data.Trans_Month,
            data.Trans_Year,
            data.clientName
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

exports.getDataFromSalesTrend = (clientName, callBack) => {
    pool.query(
        `SELECT * FROM sales_trend_report where clientName = ?`,
        [clientName],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

exports.selectWithCondition = (sqlString, callBack) => {
    pool.query(`${sqlString}`, [], (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results);
    })
}