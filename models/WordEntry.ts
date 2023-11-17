import mongoose, { model } from "mongoose";
import { DefinitionSchema, IDefinition } from "./Definition";

const Schema = mongoose.Schema;

export interface IWordEntry {
  _id: string;
  word: string;
  pronunciation: string;
  definitions: [IDefinition];
  description?: string;
  synonyms?: [string];
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
    select: false,
  }, // Description of the word in user's language
  synonyms: {
    type: [String],
    select: false,
  },
});

// Enforce uniqueness of the entry
WordEntrySchema.index({ word: 1, pronunciation: 1 }, { unique: true });

const WordEntry =
  mongoose.models.WordEntry || model<IWordEntry>("WordEntry", WordEntrySchema);

export default WordEntry;
