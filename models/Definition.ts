import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

export interface IDefinition {
  tags: [string];
  definition: [string];
}

export const DefinitionSchema = new Schema<IDefinition>({
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
