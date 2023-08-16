import { Document, Schema, model } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  created: Date;
  updated: Date;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const User = model<IUser>('User', userSchema);

export default User;
