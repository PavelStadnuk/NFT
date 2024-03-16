import express from 'express'
import jwt from 'jsonwebtoken'
const app = express()

// Промежуточное ПО для проверки токена доступа
app.use((req, res, next) => {
	// Получаем токен из заголовка Authorization
	const token =
		req.headers.authorization && req.headers.authorization.split(' ')[1]

	if (!token) {
		return res.status(401).json({ error: 'Unauthorized' })
	}

	try {
		// Проверяем и верифицируем токен
		const decoded = jwt.verify(token, 'secret_key')
		// Добавляем декодированные данные к объекту запроса для дальнейшего использования
		req.userData = decoded
		next() // Продолжаем обработку запроса
	} catch (error) {
		return res.status(401).json({ error: 'Unauthorized' })
	}
})
