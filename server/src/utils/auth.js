import jwt from "jsonwebtoken";

//Long expiration time on JWT as I have not yet implemented token refresh on activity 
const expiration = process.env.NODE_ENV === "production" ? "1h" : "8h";

export const authMiddleware = ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;
    const secret = process.env.TOKEN_SECRET;


    if (req.headers.authorization) {
        token = token.split(" ").pop().trim();
    }

    if (!token) {
        return req;
    }

    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
    } catch {
        console.log("Invalid Token");
    }

    return req;
}

export const signToken = ({ email, username, _id }) => {
    const secret = process.env.TOKEN_SECRET;
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

