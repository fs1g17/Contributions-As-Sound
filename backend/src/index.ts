import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getUsersContributions } from "./github";
import convertContributionsToNotes from "./notes";
import { concatFiles, mergeNotes } from "./ffmpeg";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const githubPat = process.env.GITHUB_PAT || "";

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/contributions", async (req: Request, res: Response) => {
  const username = req.query.username;

  try {
    const data = await getUsersContributions(githubPat, username + "");
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/notes", async (req: Request, res: Response) => {
  const username = req.query.username;

  try {
    const data = await getUsersContributions(githubPat, username + "");
    const notes = convertContributionsToNotes(data);
    res.send({ notes });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/combine", async (req: Request, res: Response) => {
  mergeNotes(["A", "G"], req.query.fileName + "", (err: any) => {
    if (err === null) {
      res.send("DONE");
      return;
    }

    res.status(500).send("ERROR");
  });
});

app.get("/concat", async (req: Request, res: Response) => {
  concatFiles(["week1", "week2"], function (err: any) {
    if (err === null) {
      res.send("DONE");
      return;
    }

    res.status(500).send("ERROR");
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
