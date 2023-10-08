import Items from '../models/Items.js'
export const getAllItems = async (req,res)=>{
    try{
        const result = await Items.find()
        res.status(200).json(result)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

export default {
    getAllItems
}