import mongoose, { model } from "mongoose";
import { DefinitionSchema } from "./Definition";
const Schema = mongoose.Schema;
const WordEntrySchema = new Schema({
  word: {
    type: String,
    required: true,
  },
  pronunciation: {
    type: String,
    required: true,
  },
  definitions: [DefinitionSchema],
  description: {
    type: String,
  }, // Description of the word in user's language
});

// Enforce uniqueness of the entry
WordEntrySchema.index({ word: 1, pronunciation: 1 }, { unique: true });

const WordEntry = model("WordEntry", WordEntrySchema);

export default WordEntry;