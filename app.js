const express = require('express')
const fs = require('fs');
const path = require('path');
const { cashTransactionOperation } = require('./lib/CashTransactionOperation');
const { naturalUserCashOuts } = require('./lib/CheckDate');
const app = express()
const port = 3000

const checkInputInnformation = (pathURL) => {
    fs.readFile(pathURL, "utf8", async (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        
        let jsonDataList = JSON.parse(jsonString);

        for(let i=0; i<jsonDataList.length; i++){
            let result = await cashTransactionOperation(jsonDataList[i])
            console.log(result)
        }

        naturalUserCashOuts.splice(0)
    });
}

app.listen(port, () => {
  const input_files = process.argv.slice(2);
  input_files.map(async file_name=>{
    checkInputInnformation(file_name)
  })

  console.log(`Example app listening at http://localhost:${port}`)
})