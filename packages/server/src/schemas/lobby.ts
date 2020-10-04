import { createSchema, Type } from "ts-mongoose";

const LobbySchema = createSchema(
  {
    code: Type.string({ required: true }),
    scores: Type.array().of({
      username: Type.string({ required: true }),
      value: Type.number({ required: true })
    }),
    message: Type.string({ required: true }),
    winner: Type.string()
  },
  { _id: true, timestamps: true }
);

export default LobbySchema;
