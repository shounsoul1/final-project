import Champions from "../models/Champions.js";

export const getAllChampions = async (req,res)=>{
    try{
        const champs = await Champions.find();
        res.status(200).json(champs)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

export default{
    getAllChampions
}