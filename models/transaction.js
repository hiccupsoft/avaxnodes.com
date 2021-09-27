const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    _id: String,
    chainID: String,
    epoch: Number,
    genesis: Boolean,
    //   inputs:
    rewarded: Boolean,
    txBlockId: String,
    txFee: Number,
    type: String,
    validatorEnd: Number,
    validatorNodeID: String,
    validatorStart: Number,
    vertexId: String,
},
    {
        _id: false,
        timestamps: true,
    });

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
