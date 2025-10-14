import express from "express";
import { deletecorper, updatecorper,getcorperById, getAllcorpers, }  from "../controller/corpers";


export default (router: express.Router) => {
    router.get('/corpers', getAllcorpers);
    router.get('/corpers/:id', getcorperById);
    router.put('/corpers/:id', updatecorper);
    router.delete('/corpers/:id', deletecorper);
}