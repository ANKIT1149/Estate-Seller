import Listening from "../Models/Listening.module.js"

export const createListening = async (req, res, next) => {
     try {
        const listening = await Listening.create(req.body);
        res.status(201).json('Listening created Successfully')
     } catch (error) {
        next(error)
     }
}