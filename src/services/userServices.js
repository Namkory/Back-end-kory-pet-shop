import db from '../models/index'
import bcrypt from "bcrypt";

let hashUserPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    
      let hashPassword = await bcrypt.hashSync(password, salt);
      return hashPassword
    
};

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db.User.findOne({
          where: { email: userEmail },
        });
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (e) {
        reject(e);
      }
    });
  };

const handleCreateUser = (data) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            let userExist = await checkUserEmail(data.email);
            if(userExist == true) {
                resolve({
                    errCode: 1,
                    errMessage: "This user already exists",
                  });
            }else{
                const hasedPassowrd = await hashUserPassword(data.password);
                await db.User.create({
                    fullName: data.fullName,
                    email: data.email,
                    password: hasedPassowrd,
                    phone: data.phone,
                    address: data.address,
                    roleId: data.roleId
                })
                resolve({
                    errCode: 0,
                    errMessage: "create user successfully"
                })
            }

        } catch (e) {
            console.log(e);
          reject(e);
        }
    })
}

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["id","email", "password", "fullName", "roleId"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = "okla";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your email is't exist in your system!!!`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
}

const handleGetAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
      } catch (e) {
        reject(e);
      }
    })
}

const editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
        if(!data.id){
            resolve({
                errCode: 2,
                errMessage: "you missing required id parameters!!"
            })
        }
        let user = await db.User.findOne({
            where: {id: data.id},
            raw: false,
        })
        
        if(user) {
            user.fullName = data.fullName;
            user.email = data.email;
            user.phone = data.phone;
            user.address = data.address;
            user.roleId = data.roleId;

            await user.save();
            

            resolve({
              errCode: 0,
              errMessage: "User update successfully",
            });
        }else{
            resolve({
                error: 3,
                errorMessage: "the user does not exist",
            })
        }
        
    } catch (e) {
        console.log(e);
        reject(e);
    }
})
}

const handleDeleteUser = (userId) => {
      return new Promise(async(resolve, reject) => {
        try {
          let user = await db.User.findOne({
            where: { id: userId },
        })
        if(!user) {
            resolve({
                error: 2,
                errorMessage: "the user does not exist",
            })
        }else {
            await db.User.destroy({where: {id: userId}});
            resolve({
                error: 0,
                errorMessage: "the user has been deleted",
            })
        }
        } catch (e) {
          console.log(e);
            reject(e);
        }
      })
}

module.exports = {
    handleCreateUser,
    handleUserLogin,
    handleGetAllUser,
    handleDeleteUser,
    editUser
}