const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

const port = 5000;
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
const url = "https://www.jetbrains.com/help/idea/2023.1/HelpTOC.json";
const loadContent = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const server = async () => {
  const db = await loadContent();

  apiRouter.get("/content", async (req, res) => {
    const { query } = req.query;

    try {
      if (query) {
        const filter = Object.values(db.entities.pages).reduce(
          (acc, page) => {
            if (
              page.title.toLowerCase().includes(`${query}`.trim().toLowerCase())
            ) {
              acc.entities.pages[[page.id]] = page;

              let id = page.id;
              while (id !== "ij") {
                const parentId = db.entities.pages[id]?.parentId;
                if (acc.entities.pages[parentId]) break;
                const parentPage = db.entities.pages[parentId];

                acc.entities.pages[id] = {
                  ...acc.entities.pages[id],
                  isActive: true,
                };

                acc.entities.pages[parentId] = parentPage;
                if (parentId === "ij") acc.topLevelIds.push(id);
                id = parentId;
              }
            }
            return acc;
          },
          { entities: { pages: {} }, topLevelIds: [] }
        );

        res.send(filter);
      } else res.send(db);
    } catch (e) {
      console.log(e);
    }
  });

  apiRouter.get("/content/pages/:pageId", async (req, res) => {
    try {
      const pageId = req.params.pageId;
      res.send(db.entities.pages[pageId]);
    } catch (e) {
      console.log(e);
    }
  });
};

server();
app.use("/", apiRouter);
// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
