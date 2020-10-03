import { createSchema, Type } from "ts-mongoose";

const UserSchema = createSchema(
  {
    displayName: Type.string({ required: true }),
    password: Type.string({ required: true }),
    rooms: Type.array().of({
      roomID: Type.string(),
    }),
  },
  { _id: true, timestamps: true }
);

export default UserSchema;
