const { expect } = require('chai');
const { cashTransactionOperation } = require('../lib/CashTransactionOperation');

describe('input and output sample validation check of cash transaction', () => {
    it('{ "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" } } - 0.06', async ()=>{
        expect(await cashTransactionOperation({ "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" } })).to.equal((0.06).toFixed(2))
    })

    it('{ "date": "2016-01-06", "user_id": 2, "user_type": "juridical", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } } - 0.90', async ()=>{
        expect(await cashTransactionOperation({ "date": "2016-01-06", "user_id": 2, "user_type": "juridical", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } })).to.equal((0.90).toFixed(2))
    })

    it('{ "date": "2016-01-06", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 30000, "currency": "EUR" } } - 87.00', async ()=>{
        expect(await cashTransactionOperation({ "date": "2016-01-06", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 30000, "currency": "EUR" } })).to.equal((87.00).toFixed(2))
    })

    it('{ "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } } - 3.00', async ()=>{
        expect(await cashTransactionOperation({ "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } })).to.equal((3).toFixed(2))
    })

    it('{ "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } } - 0.30', async ()=>{
        expect(await cashTransactionOperation({ "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } })).to.equal((0.3).toFixed(2))
    })

    it('{ "date": "2016-01-10", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } } - 0.30', async ()=>{
        expect(await cashTransactionOperation({ "date": "2016-01-10", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } })).to.equal((0.3).toFixed(2))
    })

    it('{ "date": "2016-01-10", "user_id": 2, "user_type": "juridical", "type": "cash_in", "operation": { "amount": 1000000.00, "currency": "EUR" } } - 5.00', async ()=>{
        expect(await cashTransactionOperation({ "date": "2016-01-10", "user_id": 2, "user_type": "juridical", "type": "cash_in", "operation": { "amount": 1000000.00, "currency": "EUR" } })).to.equal((5).toFixed(2))
    })

    it('{ "date": "2016-01-10", "user_id": 3, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } } - 0.00', async ()=>{
        expect(await cashTransactionOperation({ "date": "2016-01-10", "user_id": 3, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } })).to.equal((0).toFixed(2))
    })

    it('{ "date": "2016-02-15", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } } - 0.00', async ()=>{
        expect(await cashTransactionOperation({ "date": "2016-02-15", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } })).to.equal((0).toFixed(2))
    })
})