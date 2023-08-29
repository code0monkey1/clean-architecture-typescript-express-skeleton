import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    confirm_email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirm_password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);

export default User;
