import userServices from '../services/userServices'

const createUser = async (req, res) => {
    let response = await userServices.handleCreateUser(req.body)
    return res.status(200).json(response)
}

const handleUserLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Invalid email or password'
        })
    }
    let userData = await userServices.handleUserLogin(email, password);
    
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    })
}

const getAllUsers = async (req, res) => {
    let id = req.query.id
    
    if(!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing Required parameters',
            users: []
        })
    }

    let users = await userServices.handleGetAllUser(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: "ok",
        users
    })
}

const editUser = async (req, res) => {
    let data = req.body;
    let response = await userServices.editUser(data);

    return res.status(200).json(response)
}

const deleteUser = async (req, res) => {
    let id = req.query.id
    if(!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing Required parameters',
            users: []
        })
    }

    let response = await userServices.handleDeleteUser(id) 

    return res.status(200).json(response)
}

module.exports = {
    createUser,
    handleUserLogin,
    getAllUsers,
    deleteUser,
    editUser
}