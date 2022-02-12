const Queues = require("../../models/Queues");
const Visitors = require("../../models/Visitors");
const short = require('short-uuid');

module.exports = {
    index: async (req, res) => {
        try {
            let { perPage, page } = req.params
            page = Math.max(0, page)

            const queue = await Queues.find()
            .select(`
                _id
                queue
                customer_name
                id_barcode
                medical_record
            `)
            .sort({createdAt: -1})
            .limit(perPage)
            .skip(perPage * page)

            const count = await Queues.count()
            
            return res.status(200).json({
                status: true,
                total:count,
                data: [
                    ...queue
                ]
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: 'Failed!'
            })
        }
    },
    lastData: async (req, res) => {
        try {

            const queue = await Queues.findOne({},{}, { sort: { 'createdAt' : -1 } })
            
            return res.status(200).json({
                status: true,
                data: queue
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: 'Failed!'
            })
        }
    },
    detail: async (req, res) => {
        try {
            let { idBarcode } = req.params

            const queue = await Queues.find({id_barcode: idBarcode})
            .select(`
                _id
                queue
                customer_name
                id_barcode
                medical_record
            `)
            
            return res.status(200).json({
                status: true,
                data: [
                    ...queue
                ]
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: 'Failed!'
            })
        }
    },
    store: async (req, res) => {
        try {
            const {
                id
            } = req.params

            const visitor =await  Visitors.findOne({_id: id})
            var now = new Date();
            var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let queueTotal = await Queues.find({createdAt: {
                $gte: startOfToday
              }}).count() + 1

            
            const maskedNumberQueueTotal = `${queueTotal}`.padStart(3, '0');

            const queueData = {
                customer_name: visitor.customer_name,
                medical_record: visitor.medical_record,
                visitor: id,
                id_barcode: short.generate(),
                queue: `A${maskedNumberQueueTotal}`
            }
            const queue = await Queues.create(queueData)

            return res.status(200).json({
                status: true,
                message: 'Sucessfully!',
                data: {
                    ...queue._doc
                }
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: 'Failed!'
            })
        }
    }
}