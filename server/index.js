import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import authRouter from './routers/auth.router.js'
import collectionRouter from './routers/collections.router.js'
import userRouter from './routers/user.router.js'
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
)
app.use('/image', express.static('image/'))
app.use('/api', collectionRouter)
app.use('/api', userRouter)
app.use('/api', authRouter)
app.listen(PORT, () => console.log(`server started on post ${PORT}`))
