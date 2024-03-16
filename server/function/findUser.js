import db from '../db.js'

const findUser = async name => {
	try {
		const existingUser = await db.query('SELECT * FROM users WHERE name = $1', [
			name,
		])
		if (existingUser.rows.length > 0) {
			return { error: 'Пользователь с таким именем уже существует' }
		}
		return null
	} catch (error) {
		console.error('Ошибка поиска пользователя:', error)
		return { error: 'Внутренняя ошибка сервера' }
	}
}

export default findUser
