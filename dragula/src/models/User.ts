import { Document, Model, model, Schema } from 'mongoose'

export interface Payback {
  pocketId: Schema.Types.ObjectId
  amount: number
  transactionId: Schema.Types.ObjectId
}

export interface IUser extends Document {
  email: string
  password: string
  name: string
  accountNo: Schema.Types.ObjectId
  payBack: Payback
  bamedout: number
}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    accountNo: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
    },
    bamedout: {
      type: Number,
      default: 0,
    },
    payBack: {
      pocketId: {
        type: Schema.Types.ObjectId,
        ref: 'Pocket',
      },
      amount: {
        type: Number,
      },
      transactionId: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    },
  },
  { timestamps: true },
)

const User: Model<IUser> = model('User', userSchema)

export default User
