const User = require('./UserModel');
const bcrypt = require('bcryptjs');

class UserRepository {
    async initDb() {
        let adminUser = await User.findOne({email: 'admin@jwt.org'});
        if (!adminUser) {
            adminUser = {
                given_name: "Abbas",
                family_name: "Ibn Firnas",
                email: "admin@jwt.org",
                password: "secret",
                role: "Admin"
            };
            await this.addUser(adminUser);
        }
    }

    getUsers() {
        return User.find({}).select('-__v, -password');
    }

    getUsersCount() {
        return User.countDocuments({});
    }

    getUser(userId) {
        return User.findById(userId);
    }

    async getOpenIdUser(oid, oidProvider) {
        //Do not return the column __v
        const user = await User.findOne({ sub: oid, oidProvider: oidProvider }).select('-__v');
        return user ? user.toObject() : user;
    }

    async login(email, password) {
        console.log("email: ", email, "password: ", password);
        let user = await User.findOne({email: email});
        console.log("login.user: ", user);

        //Compare the received password with the encrypted one stored in the database
        let match = false;
        if (user) {
            /* The salt is incorporated into the hashed password.
            The compare function simply pulls the salt out of the hash and
            then uses it to hash the password and perform the comparison. */
            match = await bcrypt.compare(password, user.password);
        }

        if (match) {
            user = user.toObject();
            delete user.password;
            return user;
        } else {
            throw "Username and/or password invalid.";
        }
    }

    async addUser(user) {
        //if the user has password then encrypt it before storage
        if (user.password) {
            // Number of rounds to use when generating a salt
            // Salt = a random value added to the password before hashing
            const saltRounds = 10;
            //Hash and salt the password before storing it in the DB
            user.password = await bcrypt.hash(user.password, saltRounds);
        }

        user = await User.create(user);
        user = user.toObject();
        delete user.__v;
        delete user.password;
        return user;
    }

    updateUser(user) {
        const userId = user._id;
        delete user._id;
        return User.updateOne({_id: userId}, user);
    }

    deleteUser(_id) {
        return User.deleteOne({ _id });
        //return User.findByIdAndRemove(userId);
    }
}

module.exports = new UserRepository();