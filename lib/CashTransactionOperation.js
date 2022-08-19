const { isSameWeek, naturalUserCashOuts } = require('./CheckDate');
const axios = require('axios');
const globalConfig = require('../config/global.config');

const cashTransactionOperation = async (receivedInfo)=> {
    let cash_in_constant = globalConfig.cashInConstant

    let commission = 0

    let cash_out_constant = globalConfig.cashOutConstant

    if(receivedInfo.type==="cash_in"){
        try {
            const response = await axios.get(globalConfig.cashIn)
            if(response.status===200){
                cash_in_constant = {
                    percents: response.data.percents,
                    max: {
                        amount: response.data.max.amount,
                        currency: response.data.max.currency
                    } 
                } 
            }
            commission = receivedInfo.operation.amount * (cash_in_constant.percents/100)
            if(commission>cash_in_constant.max.amount){
                commission = cash_in_constant.max.amount
            }
        } catch (error) {
            console.error(error);
        }
    }else if(receivedInfo.type==="cash_out"){
        try {
            if(receivedInfo.user_type === "natural"){
                const response = await axios.get(globalConfig.cashOutNatural)

                if(response.status===200){
                    cash_out_constant.natural = {
                        percents: response.data.percents,
                        week_limit: {
                            amount: response.data.week_limit.amount,
                            currency: response.data.week_limit.currency
                        }
                    }
                }

                let getCashoutInfos = naturalUserCashOuts.filter(cashoutInfo => cashoutInfo.user_id === receivedInfo.user_id)
                let flag = false, amount = 0;

                if(receivedInfo.operation.amount>cash_out_constant.natural.week_limit.amount){
                    commission = (receivedInfo.operation.amount - cash_out_constant.natural.week_limit.amount) * (cash_out_constant.natural.percents/100) 
                }else{
                    if(getCashoutInfos.length>0){
                        let loopDatesOfCashout = getCashoutInfos[0].data.map((dataInfo)=>{
                            if(isSameWeek(receivedInfo.date, dataInfo.date)==true){
                                flag = true;
                                amount += dataInfo.amount
                            }
                        })

                        await Promise.all(loopDatesOfCashout)

                        if(flag){
                            if(amount>cash_out_constant.natural.week_limit.amount){
                                commission = receivedInfo.operation.amount * (cash_out_constant.natural.percents/100)
                            }else{
                                commission = (receivedInfo.operation.amount - cash_out_constant.natural.week_limit.amount) * (cash_out_constant.natural.percents/100)
                            }
                        }
                    }
                }

                if(getCashoutInfos.length>0){
                    naturalUserCashOuts[naturalUserCashOuts.indexOf(getCashoutInfos[0])].data.push({
                        date: receivedInfo.date,
                        amount: receivedInfo.operation.amount  
                      })
                }else{
                    naturalUserCashOuts.push({
                        user_id: receivedInfo.user_id,
                        data: [{
                            date: receivedInfo.date,
                            amount: receivedInfo.operation.amount
                        }]
                    })
                }
            }else if(receivedInfo.user_type === "juridical"){
                const response = await axios.get(globalConfig.cashOutJuridical)

                if(response.status===200){
                    cash_out_constant.juridical = {
                        percents: response.data.percents,
                        min: {
                            amount: response.data.min.amount,
                            currency: response.data.min.currency
                        }
                    }
                }

                if(receivedInfo.operation.amount>cash_out_constant.juridical.min.amount){
                    commission = receivedInfo.operation.amount * (cash_out_constant.natural.percents/100) 
                }else{
                    commission = 0
                }
            }else{
                throw Error("Invalid transaction user type")
            }
        } catch (error) {
            console.error(error);
        }
    }else{
        throw Error("Invalid transaction type")
    }

    return commission.toFixed(2);  
}

module.exports = {
    cashTransactionOperation
}