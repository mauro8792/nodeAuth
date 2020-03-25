module.exports = routes = ( app ) => {
    app.use("/api/users", require("./user"));
    app.use("/api/", require("./auth"));
}