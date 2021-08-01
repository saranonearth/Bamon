import bcrypt from 'bcryptjs'
import config from 'config'
import { Router, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import HttpStatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'

import auth from '../../middleware/auth'
import Payload from '../../types/Payload'
import Request from '../../types/Request'
import User, { IUser } from '../../models/User'
import Account from '../../models/Account'

const router: Router = Router()

// @route   GET api/auth
// @desc    Get authenticated user given the token
// @access  Private
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const user: IUser = await User.findById(req.userId)
      .select('-password')
      .populate('accountNo')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
  }
})

// @route   POST api/auth
// @desc    Login user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
      let user: IUser = await User.findOne({ email })

      if (!user) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        })
      }

      const payload: Payload = {
        userId: user.id,
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: config.get('jwtExpiration') },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        },
      )
    } catch (err) {
      console.error(err.message)
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
    }
  },
)

// @route   POST api/auth/signup
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
  '/signup',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters',
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() })
    }

    const { email, password, name } = req.body
    try {
      let user: IUser = await User.findOne({ email })

      if (user) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: 'User already exists',
            },
          ],
        })
      }

      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(password, salt)

      // Build user object based on IUser
      const userFields = {
        email,
        password: hashed,
        name,
      }

      user = new User(userFields)

      await user.save()

      //-----------------
      // TODO: Logic to create fund account using fusion api
      //-----------------

      const newAccount = new Account({
        userId: user.id,
      })

      await newAccount.save()

      user.accountNo = newAccount._id
      await user.save()

      const payload: Payload = {
        userId: user.id,
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: config.get('jwtExpiration') },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        },
      )
    } catch (err) {
      console.error(err.message)
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
    }
  },
)

export default router
