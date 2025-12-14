const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WatchHive API",
      version: "1.0.0",
      description: "API de monitoring des ruches avec PostgreSQL",
    },
  },
  apis: ["./routes/*.js"], // <- Chemin vers tous tes fichiers de routes
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
