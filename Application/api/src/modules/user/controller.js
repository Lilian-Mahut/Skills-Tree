import UserServices from './service';

const UserController = {
    register: (req, res) => {
        UserServices.register(req.body)
            .then(response =>
                res.status(response.status).cookie('token', response.token, { maxAge: 900000, httpOnly: true }).send(true)
            )
            .catch(err => res.status(err.status).send(err));
    },

    authenticate: (req, res) => {
        UserServices.authenticate(req.body)
            .then(response =>
                res.status(response.status).cookie('token', response.token, { maxAge: 900000, httpOnly: true }).send(true)
            )
            .catch(err => res.status(err.status).send(false));
    },

    isAuth: (req, res) => {
        let token = req.cookies.token
        if (token) {
            UserServices.isAuth(token)
                .then(response => {
                    if (response.payload.token)
                        res.cookie('token', response.payload.token, { maxAge: 900000, httpOnly: true })
                    res.status(response.status).send(response)
                })
                .catch(err => res.status(err.status).send(err));
        }
        else res.status(200).send({ status: 200, payload: { success: false, message: 'Vous devez être connecté pour accéder à cette section' } })
    }
}

export default UserController;
