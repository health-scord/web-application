const defaults = {
  SERVER_URI: "68.183.100.145",
  DATA_SERVICE_URI: `data-service`,
  DATA_SERVICE_PORT: `9000`
};

let config = {
  serverUri: process.env.SERVER_URI
    ? process.env.SERVER_URI
    : defaults.SERVER_URI,
  dataServiceUri: process.env.DATA_SERVICE_URI
    ? process.env.DATA_SERVICE_URI
    : defaults.DATA_SERVICE_URI,
  dataServicePort: process.env.DATA_SERVICE_PORT
    ? process.env.DATA_SERVICE_PORT
    : defaults.DATA_SERVICE_PORT
};

module.exports = config;
