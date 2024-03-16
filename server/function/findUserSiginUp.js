import db from '../db.js'
const findUser1 = async name => {
	const existingUser = await db.query('SELECT * FROM users WHERE name = $1', [
		name,
	])
	return existingUser
}

export default findUser1
