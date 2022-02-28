import express from 'express'
import mongoose from 'mongoose'
import {signIn, signUp} from "../controllers/user.js"
const router = express.Router()

router.post('/signin', signIn )
router.post('/signup',signUp )

export default router;