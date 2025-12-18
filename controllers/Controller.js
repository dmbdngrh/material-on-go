const { User } = require('../models/index'); 
class Controller{
    static landingPage(req, res){
        try {
            res.render('landing');
        } catch (error) {
            res.send(error)
        }
    }

    static showLogin(req, res){
        try {
            const {error, email} = req.query;
            res.render('login', {error, email});
        } catch (error) {
            res.send(error);
        }
    }

    static async login(req, res){
        try {
            const {email, password} = req.body;
            const user = await User.findOne({where:{ email:email }});
            if(!user){
                const error = 'E-mail not found';
                return res.redirect(`/login?error=${error}`);
            }
            if(!await user.checkPassword(password)){
                const error = 'Wrong password';
                return res.redirect(`/login?error=${error}&email=${email}`);
            }
            
            req.session.user = {id: user.id, email: user.email, role:user.role};
            res.redirect(`/dashboard`);
        } catch (error) {
            res.send(error)
        }
    }

    static async logout(req, res){
        try {
            req.session.destroy();
            res.redirect('/');
        } catch (error) {    
            res.send(error);
        }
    }

    static showRegister(req, res){
        try {
            const { error, email } = req.query;
            res.render('register', {error, email});
        } catch (error) {
            res.send(error);
        }
    }

    static async register(req, res){
        try {
            const {email, password} = req.body;
            await User.create({email, password});
        } catch (error) {
            res.send(error);
        }
    }

    static async dashboard(req, res){
        try {
            console.log(req.session.user.role);
            
            const role = 'partner'
            switch (req.session.user.role) {
            // switch (role){
                case 'admin':
                    res.render('dashboard/admin');
                    break;
                case 'user':
                    res.render('dashboard/user');
                    break;
                case 'partner':
                    res.render('dashboard/partner');
                    break;
                default:
                    throw new Error("No such role");
            }
        } catch (error) {
            res.send(error);
        }
    } 
}

module.exports = Controller;