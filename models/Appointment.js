import mongoose from 'mongoose';

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  range: {
    start: {
      index: {
        type: Number,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
    end: {
      index: {
        type: Number,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
  },
  price: {
    type: Number,
    required: true,
  },
  checkout: String,
  status: {
    type: String,
    default: 'cart',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
