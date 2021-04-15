export class JwtUtils {
    static readonly JWT = require('jsonwebtoken');
    static readonly PRIVATE_KEY = require("fs").readFileSync(process.env.JWT_PRIV_KEY);
    static readonly PUBLIC_KEY = require("fs").readFileSync(process.env.JWT_PUBLIC_KEY);
    static readonly TOKEN_EXP_SEC = parseInt(process.env.TOKEN_EXP_SEC || "3600");
}