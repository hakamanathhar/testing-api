const Countries = require("../../models/Countries")

module.exports = {
    index: async (req, res) => {
        try {
            
            const countries = await Countries.find({
                $or: [{name: 'Indonesia'},{name:'Malaysia'}]
            })
        
            return res.status(200).json({
                status: true,
                data: {
                    countries
                }
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: 'Failed!'
            })
        }
    }
}