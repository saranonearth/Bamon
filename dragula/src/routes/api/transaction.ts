import bcrypt from 'bcryptjs'
import config from 'config'
import e, { Router, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import HttpStatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'

import auth from '../../middleware/auth'
import Payload from '../../types/Payload'
import Request from '../../types/Request'
import User, { IUser } from '../../models/User'
import Account from '../../models/Account'
import Pocket from '../../models/Pocket'
import Transaction from '../../models/Transaction'
import { Schema } from 'mongoose'
import { getFixedRate } from '../../util/helper'
import { parseCommandLine } from 'typescript'

//Constants
const MAX_FUND_LIMIT = 500
const FIXED_RATE = 0.08

//Legend

//--Transaaction life cycle---
// pending -> sucess/failure -> satisfied

//--Transaction types ---
// borrow, addFund, payabck, addPocker

const router: Router = Router()

// @route   GET api/transaction
// @desc    Get authenticated user given the token
// @access  Private
router.get('/', async (req: Request, res: Response) => {
  try {
    res.json({ msg: 'hey' })
  } catch (error) {
    console.error(error.message)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
  }
})

// @route   POST api/transaction/create-pocket
// @desc    Create a pocket of fund
// @access  Private
router.post('/create-pocket', auth, async (req: Request, res: Response) => {
  try {
    const { pocket_name, amount } = req.body
    const userId = req.userId

    //---------------------------
    // TODO: Fund transfer logics using fusion api
    //---------------------------

    const newPocket = new Pocket({
      pocket_name,
      amount,
      userId,
    })

    await newPocket.save()

    res
      .status(HttpStatusCodes.OK)
      .json({ status: 'success', msg: 'Pocket created', data: newPocket })
  } catch (error) {
    console.error(error.message)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
  }
})

// @route   POST api/transaction/bamin
// @desc    Borrow funds up to 500
// @access  Private
router.post('/bamin', auth, async (req: Request, res: Response) => {
  try {
    const { amount, pocketId } = req.body
    const userId = req.userId

    const user = await User.findById(userId)
    if (!user) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: `User not found`,
        data: null,
      })
    }

    const userAccount = await Account.findById({ _id: user.accountNo })
    if (!userAccount) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: `Account not found`,
        data: null,
      })
    }

    // check if amount to borrow is less than 500
    if (amount > MAX_FUND_LIMIT || amount < 0) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        status: 'fail',
        msg: 'Amount not within limit',
      })
    }

    //if the person has not already borrowed money
    if (!user.payBack) {
      // give him money
      // check if pocket has sufficient funds
      const pocket = await Pocket.findOne({ _id: pocketId })
      if (!pocket || (pocket && pocket.amount < amount)) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
          status: 'fail',
          message: `Pocket refused to support the transaction`,
          data: null,
        })
      }

      //---------------------------------------
      // TDOD: Fusion api fund tranfer logics
      //---------------------------------------

      pocket.amount -= amount
      await pocket.save()

      userAccount.fundAmount += amount
      await userAccount.save()

      const transaction = new Transaction({
        userId: new Schema.Types.ObjectId(userId),
        amount: amount,
        transactionType: 'borrow',
        status: 'success',
        accountId: userAccount._id,
        reference: pocketId,
      })
      await transaction.save()

      user.payBack = {
        transactionId: transaction._id,
        amount: amount,
        pocketId,
      }
      await user.save()

      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        status: 'sucess',
        message: 'Bamin success',
        data: transaction,
      })
    }

    res.status(HttpStatusCodes.BAD_REQUEST).json({
      status: 'fail',
      message: 'Not eligible to bamin',
      data: null,
    })
  } catch (error) {
    console.error(error.message)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
  }
})

// re pay money
// @route   POST api/transaction/re-pay
// @desc    Re-pay money
// @access  Private
router.post('/re-pay', auth, async (req: Request, res: Response) => {
  try {
    const { transactionId, amount } = req.body

    const user = await User.findOne({ _id: req.userId })
    const userAccount = await Account.findById({ _id: user.accountNo })

    if (!(user.payBack.transactionId.toString() === transactionId.toString())) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: `Invalid payback`,
        data: null,
      })
    }

    const rTransaction = await Transaction.findById({ _id: transactionId })

    //------------------------------------------
    //    TODO: Fusion API logics fund transfer
    //------------------------------------------

    const amountTobeReturned =
      rTransaction.amount + getFixedRate(rTransaction.amount)

    if (amountTobeReturned !== amount) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: `Amount not match`,
        data: null,
      })
    }

    const pocket = await Pocket.findById(user.payBack.pocketId)
    pocket.amount += rTransaction.amount
    await pocket.save()

    userAccount.fundAmount -= amountTobeReturned

    await userAccount.save()
  } catch (error) {
    console.error(error.message)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
  }
})

// get all pockets

// @route   POST api/transaction/add-fund
// @desc    Adds fund to user account
// @access  Private
router.post('/add-fund', auth, async (req: Request, res: Response) => {
  try {
    const { accountId, amount } = req.body
    const userId = req.userId

    //---------------------------------------
    // TDOD: Fusion api fund tranfer logics
    //---------------------------------------

    const userAccount = await Account.findOne({ _id: userId })

    if (!userAccount) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: `User account not found`,
        data: null,
      })
    }

    userAccount.fundAmount += amount

    const newTransaction = new Transaction({
      userId: req.userId,
      transactionType: 'addFund',
      status: 'success',
      accountId,
      amount,
    })

    await newTransaction.save()

    return res.status(HttpStatusCodes.OK).json({
      status: 'success',
      message: 'Funds added sucessfully',
      data: null,
    })
  } catch (error) {
    console.error(error.message)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
  }
})

export default router
