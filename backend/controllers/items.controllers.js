import Items from '../models/Items.js'
// function para obtener todos los items

export const getAllItems = async (req,res)=>{
    try{
        const items = await Items.find();
        res.status(200).json(items)
    }catch(error){
        console.log(error)
        res.status(500).json({Message: `No se encontraron los items ${error}`})
    }
}
// function para obtener item por su nombre o su id
export const getItemsByNameOrId = async (req,res)=>{
    try{
        const {nameOrId} = req.params;
        const itemByName = await Items.findOne({name:nameOrId});
        const itemById = !itemByName ? await Items.findById(nameOrId) : null;

        if(!itemById && !itemByName){
            return res.status(404).json({message:"Item no encontrado"})
        }
        res.status(200).json(itemByName || itemById);
    }catch(error){
        res.status(500).json({message: `Error: ${error}`})
    }
}
// function para crear item con los datos completos o obviando algunos
export const createItem = async (req,res)=>{
    try{
        const {id,name,image} = req.body;
        let item;
        if(image){
            item = new Items({
            id,
            name,
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
            item = new Items({
                id,
                name,
                tier,
                image:{
                    full: image.full
                }
            })
        }

        await item.save();
        res.status(200).json(item)
    }catch(error){
        console.log(error)
        res.status(500).json({message: `No se pudo crear el item: ${error}`})
    }
}
// funcion para actualizar un item por su id

export const updateItem = async (req,res)=>{
    try{
        const id = req.params.id;
        const itemUpdate =  req.body;
        const result = await Items.findByIdAndUpdate(id, itemUpdate) 
        res.status(200).json(result)
        console.log("Actualizado con exito")
    }catch(error){
        console.error("Error al actualizar el item: ", error);
        res.status(500).json({Error: `Internal server error:  ${error}`})
    }
}
// funcion para eliminar un item por su id
export const deleteItem = async (req,res)=>{
    try{
        const item = await Items.findByIdAndDelete(req.params.id);
        if (!item){
            res.status(404).json({message: "Item no encontrado"})
        }else {
            res.status(200).json({message:"Item eliminado con exito"})
        }

    }catch(error){
        res.status(500).json({Error: "Internal server error " + error}) 
    }
}


export default {
    getAllItems,
    getItemsByNameOrId,
    createItem,
    updateItem,
    deleteItem
}