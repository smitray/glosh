import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  locationId: {
    type: mongoose.Types.ObjectId
  },
  dob: {
    type: Date,
    default: new Date()
  },
  accountId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(timestamp);

export default mongoose.models.userModel || mongoose.model('userModel', userSchema);
