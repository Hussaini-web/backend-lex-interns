import express from "express";
import { getAllInterns ,getInternById,updateIntern,deleteIntern}  from "../controller/interns";


export default (router: express.Router) => {
    router.get('/interns', getAllInterns);
    router.get('/interns/:id', getInternById);
    router.put('/interns/:id', updateIntern);
    router.delete('/interns/:id', deleteIntern);
}