const session = require("../db/models/session");

const deleteSession = async(req,res)=>{
    const {sessionId} = req.params;
    const user = req.user;
    try{
await session.destroy({where:{
    id:sessionId
}})

    }catch(err){
        console.error(err);
        return res.status(404).json({message:"Couldnt delete it"});
    }
    return res.redirect('/dashboard');

}
module.exports=deleteSession;