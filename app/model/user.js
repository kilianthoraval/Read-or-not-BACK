// Création d'un nouvel utilisateur
class User {
    constructor(obj)
    {
        this.email = obj.email;
        this.password = obj.password;
    }    
}

module.exports = User;