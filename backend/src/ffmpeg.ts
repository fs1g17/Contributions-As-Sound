import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import ffprobePath from "@ffprobe-installer/ffprobe";

import { Note } from "../types/notes";

ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);

const noteToPathMap: { [key: string]: string } = {
  A: path.resolve(__dirname, "./notes/A_note.wav"),
  B: path.resolve(__dirname, "./notes/B_note.wav"),
  C: path.resolve(__dirname, "./notes/C_note.wav"),
  D: path.resolve(__dirname, "./notes/D_note.wav"),
  E: path.resolve(__dirname, "./notes/E_note.wav"),
  F: path.resolve(__dirname, "./notes/F_note.wav"),
  G: path.resolve(__dirname, "./notes/G_note.wav"),
};

export function mergeNotes(
  notes: Note[],
  fileName: string,
  callback: Function
) {
  const f = ffmpeg();
  notes.forEach((note) => f.input(noteToPathMap[note]));
  f.complexFilter([
    {
      filter: "amix",
      options: { inputs: notes.length, duration: "longest" },
    },
  ])
    .on("end", async function (output) {
      console.log(output, "files hav been merged and saved.");
      callback(null);
    })
    .on("error", async function (err) {
      console.log(err);
      callback(err);
    })
    .saveToFile(path.resolve(__dirname, `./notes/${fileName}.wav`));
}

export function concatFiles(fileNames: string[], callback: Function) {
  var f = ffmpeg();
  fileNames.forEach((fileName) =>
    f.input(path.resolve(__dirname, `./notes/${fileName}.wav`))
  );
  f.mergeToFile(
    path.resolve(__dirname, "./notes/output.wav"),
    path.resolve(__dirname, "./temp")
  )
    .on("end", function () {
      callback(null);
    })
    .on("error", function (err) {
      console.log(err);
      callback(err);
    });
}
