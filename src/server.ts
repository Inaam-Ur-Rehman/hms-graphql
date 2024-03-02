import express from "express";
import { expressMiddleware } from "@apollo/server/express4";

import createApolloServer from "./graphql";

(async () => {
  const app = express();

  const PORT = process.env.PORT || 8000;

  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Server is up and running!",
    });
  });

  const server = await createApolloServer();
  app.use("/graphql", express.json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
