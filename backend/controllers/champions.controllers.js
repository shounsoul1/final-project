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

export const getChampionByNameOrId = async (req,res)=>{
    try{
        const {nameOrId} = req.params;
        const championByName = await Champions.findOne({name:nameOrId});
        const championById = !championByName ? await Champions.findById(nameOrId) : null;

        if(!championById && !championByName){
            return res.status(404).json({message:"Campeon no encontrado"})
        }
        res.status(200).json(championByName || championById);
    }catch(error){
        res.status(500).json("Error"+error)
    }
}

export const createChampion = async (req,res)=>{
    try{
        const {id,name,tier,image} = req.body;
        let champion;
        if(image){
            champion = new Champions({
            id,
            name,
            tier,
            image:{
                provisional: image.provisional,
                sprite: image.sprite,
                full: image.full,
                x: image.x,
                y: image.y,
                w: image.w,
                h: image.h
                }
        });
        }else{
            champion = new Champions({
                id,
                name,
                tier
            })
        }

        await champion.save();
        res.status(200).json(champion)
    }catch(error){
        console.log(error)
        res.status(500).json({message: `No se pudo crear ${error}`})
    }
}

export const updateChampion = async (req,res)=>{
    try{
        console.log("Entrando en la función updateChampion");
        const id = req.params.id;
        const championUpdate =  req.body;
        console.log("ID recibida:", id);
        console.log("Actualizaciones del campeón:", championUpdate);

        const result = await Champions.findByIdAndUpdate(id, championUpdate) 
        console.log("Resultado de la actualización:", result);
        res.status(200).json(result)
        console.log("Actualizado con exito")
    }catch(error){
        console.error("Error al actualizar el campeón:", error);
        res.status(500).json({Error: "Internal server error " + error})
    }
}

export const deleteChampion = (req,res)=>{
    try{

    }catch(error){
        res.status(500).json(error)
    }
}

export default{
    getAllChampions,
    getChampionByNameOrId,
    createChampion,
    updateChampion
}