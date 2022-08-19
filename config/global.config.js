const { dotEnvPath } = require('./path/index');
const dotenv = require('dotenv')

dotenv.config({path: dotEnvPath()})

module.exports = {
    cashIn: `${process.env.CASH_IN}`,
    cashOutNatural: `${process.env.CASH_OUT_NATURAL}`,
    cashOutJuridical: `${process.env.CASH_OUT_JURIDICAL}`,
    cashInConstant: {
        percents: 0.03,
        max: {
            amount: 5,
            currency: "EUR"
        }
    },
    cashOutConstant: {
        natural: {
            percents: 0.3,
            week_limit: {
                amount: 1000,
                currency: "EUR"
            }
        },
        juridical: {
            percents: 0.3,
            min: {
                amount: 0.5,
                currency: "EUR"
            }
        }
    }
}