import Champions from "../models/Champions.js";

// function para obtener todos los campeones

export const getAllChampions = async (req,res)=>{
    try{
        const champs = await Champions.find();
        res.status(200).json(champs)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}
// function para obtener campeon por su nombre o su id
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
// function para crear campeon con todos los datos o nada mas los principales
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
// funcion para actualizar un campeon por su id

export const updateChampion = async (req,res)=>{
    try{
        const id = req.params.id;
        const championUpdate =  req.body;
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
// funcion para eliminar un campeon por su id
export const deleteChampion = async (req,res)=>{
    try{
        const champion = await Champions.findByIdAndDelete(req.params.id);
        if (!champion){
            res.status(404).json({message: "Campeon no encontrado"})
        }else {
            res.status(200).json({message:"Campeon eliminado con exito"})
        }

    }catch(error){
        res.status(500).json({Error: "Internal server error " + error}) 
    }
}

export default{
    getAllChampions,
    getChampionByNameOrId,
    createChampion,
    updateChampion,
    deleteChampion
}