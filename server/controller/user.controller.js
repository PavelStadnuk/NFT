import db from '../db.js'
import findUser from '../function/findUser.js'
import hashedPasswordFunction from '../function/hashedPassword.js'
class UserController {
	async createUser(req, res) {
		try {
			const { name, totalSales, password } = req.body
			const avatar = req.file
				? req.file.path.replace('image\\', 'http://localhost:5000/image/')
				: null
			const userExists = await findUser(name)
			if (userExists) {
				return res
					.status(400)
					.json({ error: 'User with that name already exists' })
			}

			const hashedPassword = await hashedPasswordFunction(password)

			const newPerson = await db.query(
				'INSERT INTO users(name, avatar, totalSales, password) VALUES($1, $2, $3, $4) RETURNING *',
				[name, avatar, totalSales, hashedPassword]
			)

			res.json(newPerson.rows[0])
			console.log('User created:', newPerson.rows[0])
		} catch (error) {
			console.error('Error creating user:', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	}
	async getUser(req, res) {
		const users = await db.query('SELECT * FROM users')
		res.json(users.rows)
	}
	async getOneUser(req, res) {
		const id = req.params.id
		const user = await db.query('SELECT * FROM users WHERE id=$1', [id])
		res.json(user.rows[0])
	}
	async updateUser(req, res) {
		const { id, name } = req.body
		const user = await db.query(
			'UPDATE users set name=$2 WHERE id=$1 RETURNING *',
			[id, name]
		)
		res.json(user.rows[0])
	}
	async deleteUser(req, res) {
		const id = req.params.id
		const user = await db.query('DELETE FROM users WHERE id=$1', [id])
		res.json(user.rows[0])
	}
}
export default new UserController()
