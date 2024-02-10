module.exports = {
  service: {
    output: {
      mode: "tags-split",
      target: "../api/service.ts",
      baseUrl: "https://api.gametools.network/",
      schemas: "../api/model",
      client: "react-query",
      mock: false,
    },
    input: {
      target: "./openapi.json",
    },
  },
};
