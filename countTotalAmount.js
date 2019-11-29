module.exports = {
    countTotalAmount: function() {
        let allAmount = 0
        Record.find({}, {amount: 1})
            .exec((err, allRecordsWithAmount) => {
                if (err) return console.log(err)
                for (eachAmount of allRecordsWithAmount) {
                        allAmount += eachAmount.amount
                }
                // 存回去資料庫
                record.totalAmount = allAmount
                record.save(err=> {
                    if (err) return console.log(err)
                    return res.redirect('/')
                    })
                })
    }
}
