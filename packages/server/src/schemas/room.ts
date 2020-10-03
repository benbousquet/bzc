import { createSchema, Type } from "ts-mongoose";

const RoomSchema = createSchema(
  {
    name: Type.string({ required: true }),
    messages: Type.array().of({
      senderID: Type.string({ required: true }),
      body: Type.string({ required: true }),
      date: Type.date({ default: Date.now as any }),
    }),
  },
  { _id: true, timestamps: true }
);

export default RoomSchema;
