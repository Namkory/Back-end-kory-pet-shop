import db from "../models/index";

let getHomePage = async (rep, res) => {
   try {
    let data = await db.User.findAll()
    console.log('check data', data);
    return res.send("hello from kory shop")
   } catch (e) {
    console.log(e);
   }
}

module.exports = {
    getHomePage
}