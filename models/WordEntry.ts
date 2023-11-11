import mongoose, { model } from "mongoose";
import { DefinitionSchema, IDefinition } from "./Definition";

const Schema = mongoose.Schema;

export interface IWordEntry {
  word: string;
  pronunciation: string;
  definitions: [IDefinition];
  description?: string;
}

const WordEntrySchema = new Schema<IWordEntry>({
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

const WordEntry =
  mongoose.models.WordEntry || model<IWordEntry>("WordEntry", WordEntrySchema);

export default WordEntry;
