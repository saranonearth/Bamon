import { Document, Model, model, Schema } from 'mongoose'

export interface IAccount extends Document {
  userId: Schema.Types.ObjectId
  fundAmount: number
}

const accountSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    fundAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

const Account: Model<IAccount> = model('Account', accountSchema)

export default Account
