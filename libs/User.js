import fs from "fs";

class User {
    static databaseUser = `./database/users.json`;
    
    static getUsers = () => {

        if (!fs.existsSync(databaseUser)) {
            fs.writeFileSync(databaseUser, "[]");
            console.log("File " + databaseUser + " created");
        }

        return JSON.parse(fs.readFileSync("./database/users.json", "utf8"));
    };

    static getUserById = (id) => {
        const user = getUsers().find((u) => u.id === id);
        return user;
    };

    static getUserByUsername = (username) => {
        const user = getUsers().find((u) => u.username === username);
        return user;
    };
}

export default User;
