// bcrypt.js
import bcrypt from 'bcryptjs'

const comparePasswords = async (inputPassword, hashedPassword) => {
	try {
		return await bcrypt.compare(inputPassword, hashedPassword)
	} catch (error) {
		console.error('Ошибка сравнения паролей:', error)
		return false
	}
}

export default comparePasswords
