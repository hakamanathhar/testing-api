const States = require("../../models/States")

module.exports = {
    getByCountries: async (req, res) => {
        try {
            const { countries } = req.params
            const states = await States.find({
                country_id: countries
            }).limit(20)
        
            return res.status(200).json({
                status: true,
                data: {
                    states
                }
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: 'Failed!'
            })
        }
    },
    getByObjId: async (req, res) => {
        try {
            const { id } = req.params
            const states = await States.find({
                _id: id
            }).limit(20)
        
            return res.status(200).json({
                status: true,
                data: {
                    states
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