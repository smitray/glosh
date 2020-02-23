import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    default: null
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    default: 'new'
  },
  accType: {
    type: String,
    default: 'student'
  }
});

accountSchema.plugin(uniqueValidator);
accountSchema.plugin(timestamp);

export default mongoose.models.accountModel || mongoose.model('accountModel', accountSchema);
