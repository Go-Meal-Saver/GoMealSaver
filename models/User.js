import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === 'credentials';
      },
    },
    image: {
      type: String,
      default: '/assets/images/profile.png',
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'meals',
      },
    ],
    provider: {
      type: String,
      enum: ['credentials', 'google'],
      default: 'credentials',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User;
