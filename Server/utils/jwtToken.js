exports.sendToken = (user, res, statusCode) => {
    const COOKIE_EXPIRE = 5;
    const token = user.getJWTToken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        sameSite: "none",
        secure: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    });
};
