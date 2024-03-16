import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'
class AuthController {
	async sigIn(req, res) {
		try {
			const { name, password } = req.body
			const existingUser = await db.query(
				'SELECT * FROM users WHERE name = $1',
				[name]
			)

			if (existingUser.rows.length === 0) {
				return res.status(400).json({ error: 'User not found' })
			}

			const isPasswordValid = await bcrypt.compare(
				password,
				existingUser.rows[0].password
			)

			if (!isPasswordValid) {
				return res.status(400).json({ error: 'Invalid password' })
			}
			// Генерація JWT токена
			const token = jwt.sign(
				{ userId: existingUser.rows[0].id },
				'JWT_SECRET',
				{
					expiresIn: '1h',
				}
			)
			console.log({ token, user: existingUser.rows[0] })
			res.json({ token, user: existingUser.rows[0] })
			// res.json({ message: 'Sign in successful', user: existingUser.rows[0] })
			// console.log('User signed in:', existingUser.rows[0])
		} catch (error) {
			console.error('Error signing in:', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	}
}
export default new AuthController()
