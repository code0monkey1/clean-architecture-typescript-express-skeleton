import { Document, Schema, model } from 'mongoose';
export interface IUser extends Document {
  name: string;
  email: string;
  confirm_email: string;
  password: string;
  confirm_password: string;
}

const userSchema = new Schema(
  {
    name: String,
    email: String,
    confirm_email: String,
    password: String,
    confirm_password: String,
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);

export default User;
