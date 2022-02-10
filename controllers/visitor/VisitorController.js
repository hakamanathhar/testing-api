const Cities = require("../../models/Cities");
const Countries = require("../../models/Countries");
const States = require("../../models/States");
const Visitors = require("../../models/Visitors");

module.exports = {
    index: async (req, res) => {
        try {
            let { perPage, page } = req.params
            page = Math.max(0, page)

            const visitor = await Visitors.find()
            .select(`
                _id
                customer_name
                pic
                remark
                address_primary
                address_secondary
                contact_no
                kuota
            `)
            .populate([{
                path: 'province',
                select: '_id name'
            },{
                path: 'region',
                select: '_id name'
            },{
                path: 'city',
                select: '_id name'
            }])
            .limit(perPage)
            .skip(perPage * page)

            const count = await Visitors.count()
            

            return res.status(200).json({
                status: true,
                total:count,
                data: [
                    ...visitor
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
    store: async(req, res) => {
        try {
            const {
                cust_name,
                pic,
                region,
                province,
                city,
                remark,
                address,
                address_nd,
                contact,
                kuota
            } = req.body;

            const regionObj = await Countries.findOne({id: region})
            const provinceObj = await States.findOne({id: province})
            const cityObj = await Cities.findOne({id: city})

            const count = await Visitors.countDocuments()
            const digit = `${count}`;
            const maskedNumberRM = digit.padStart(5, '0');

            const visitorData = {
                customer_name: cust_name,
                pic: pic,
                region: regionObj._id,
                province: provinceObj._id,
                city: cityObj._id,
                remark: remark,
                address_primary: address,
                address_secondary: address_nd,
                contact_no: contact,
                kuota: kuota,
                medical_record: `RM-${maskedNumberRM}`,
            }

            const visitor = await Visitors.create(visitorData)

            return res.status(200).json({
                status: true,
                message: 'Sucessfully!'
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
            let { id } = req.params

            const visitor = await Visitors.findOne({_id: id})
            .select(`
                _id
                customer_name
                pic
                remark
                address_primary
                address_secondary
                contact_no
                kuota
            `)
            .populate([{
                path: 'province',
                select: '_id name'
            },{
                path: 'region',
                select: '_id name'
            },{
                path: 'city',
                select: '_id name'
            }])
            

            return res.status(200).json({
                status: true,
                data: visitor
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: 'Failed!'
            })
        }
    },
    search: async (req, res) => {
        try {
            let { perPage, page, cust_name, medical_record } = req.body
            // page = Math.max(0, page)
            perPage = 2
            page = 0
            const searchCondition = {}
            if(cust_name != ''){
                searchCondition.customer_name = { $regex : new RegExp(cust_name, "i") }
            }
            if(medical_record != ''){
                searchCondition.medical_record = { $regex : new RegExp(medical_record, "i") }
            }

            const visitor = await Visitors.find(searchCondition)
            .select(`
                _id
                customer_name
                pic
                remark
                address_primary
                address_secondary
                contact_no
                kuota
            `)
            .populate([{
                path: 'province',
                select: '_id name'
            },{
                path: 'region',
                select: '_id name'
            },{
                path: 'city',
                select: '_id name'
            }])
            .limit(perPage)

            const count = await Visitors.find(searchCondition).count()
            

            return res.status(200).json({
                status: true,
                total:count,
                data: [
                    ...visitor
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
    edit: async (req, res) => {
        
    },
}