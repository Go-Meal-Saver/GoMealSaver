import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
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

export default mongoose.models.User || mongoose.model('User', UserSchema);
