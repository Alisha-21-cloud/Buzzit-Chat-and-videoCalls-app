export async function signup(req,res) {
    req.res.send("Signup Route");
}

export async function login(req,res) {
    req.res.send("Login Route");
}

export function logout(req,res) {
    req.res.send("Logout Route");
}