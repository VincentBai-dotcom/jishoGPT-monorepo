import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

export const DefinitionSchema = new Schema({
  tags: [
    {
      type: String,
      require: true,
    },
  ],
  definition: [
    {
      type: String,
      require: true,
    },
  ],
});

export const Definition = model("Definition", DefinitionSchema);
