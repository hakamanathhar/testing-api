const Cities = require("../../models/Cities")

module.exports = {
    getByState: async (req, res) => {
        try {
            const { state } = req.params
            
            const cities = await Cities.find({
                state_id: state
            }).limit(20)
        
            return res.status(200).json({
                status: true,
                data: {
                    cities
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
            
            const cities = await Cities.find({
                _id: id
            }).limit(20)
        
            return res.status(200).json({
                status: true,
                data: {
                    cities
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