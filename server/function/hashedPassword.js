import bcrypt from 'bcryptjs'
const hashedPasswordFunction = async password => {
	const saltRounds = 10
	const hashedPassword = await bcrypt.hash(password, saltRounds)
	return hashedPassword
}
export default hashedPasswordFunction
