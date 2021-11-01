module.exports = class Auth {

    users = [
        { "name": "user1", "pw": "111", "hash": "dfgsdgf" },
        { "name": "user2", "pw": "222", "hash": "ofgjkgm" }
    ]

    async token(payload) {
        const user = this.users.find(u => u.name == payload.user)
        if (user && user.pw == payload.pass) {
            return {
                "accessToken": `${user.hash}.${user.name}.${Date.now()}`,
            }
        } else {
            return null
        }
    }

    async validate(authHeader) {
        if (!authHeader) return false;
        const parts = authHeader.split(".");
        if (parts.length != 3) return false;
        const hash = parts[0];
        const username = parts[1];
        const date = parts[2];
        const user = this.users.find(u => u.name == username)

        if (user && user.hash == hash && parseInt(date) > Date.now() - 1000 * 60 * 5) {
            return true;
        }
        return false;

    }
}