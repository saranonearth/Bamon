import { Document, Model, model, Schema } from 'mongoose'

export interface ITransaction extends Document {
  transactionType: string
  amount: number
  userId: Schema.Types.ObjectId
  accountId: Schema.Types.ObjectId
  reference: string
  status: string
}

const transactioSchema: Schema = new Schema(
  {
    transactionType: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      red: 'User',
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
    },
    status: {
      type: String,
    },
    reference: {
      type: String,
    },
  },
  { timestamps: true },
)

const Transaction: Model<ITransaction> = model('Transaction', transactioSchema)

export default Transaction
