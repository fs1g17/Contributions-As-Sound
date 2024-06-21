import ffmpeg from "fluent-ffmpeg";
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
import { Note } from "../types/notes";
ffmpeg.setFfmpegPath(ffmpegPath);
import path from "path";

const noteToPathMap: { [key: string]: string } = {
  A: path.resolve(__dirname, "./notes/A_note.wav"),
  B: path.resolve(__dirname, "./notes/B_note.wav"),
  C: path.resolve(__dirname, "./notes/C_note.wav"),
  D: path.resolve(__dirname, "./notes/D_note.wav"),
  E: path.resolve(__dirname, "./notes/E_note.wav"),
  F: path.resolve(__dirname, "./notes/F_note.wav"),
  G: path.resolve(__dirname, "./notes/G_note.wav"),
}

export function mergeNotes(notes: Note[], callback: Function) {
  ffmpeg()
  .input(noteToPathMap[notes[0]])
  .input(noteToPathMap[notes[1]])
  .complexFilter([{
    filter: 'amix', options: { inputs: 2, duration: 'longest'}
  }])
  .on('end', async function (output) {
    console.log(output, 'files hav been merged and saved.')
    callback()
  })
  .saveToFile(path.resolve(__dirname, "./notes/poop.wav"))
}
