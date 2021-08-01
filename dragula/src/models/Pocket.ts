import { Document, Model, model, Schema } from 'mongoose'

export interface IPocket extends Document {
  pocket_name: string
  amount: number
  userId: Schema.Types.ObjectId
}

const transactioSchema: Schema = new Schema(
  {
    pocket_name: {
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
  },
  { timestamps: true },
)

const Pocket: Model<IPocket> = model('Pocket', transactioSchema)

export default Pocket
