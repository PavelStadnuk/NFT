import db from '../db.js'
class CollectionController {
	async createCollection(req, res) {
		try {
			const { name, user_id } = req.body
			const nftpictures = req.files.map(file =>
				file.path.replace('image\\', 'http://localhost:5000/image/')
			)
			const newCollection = await db.query(
				'INSERT INTO collections (name, nftpicture, user_id) VALUES ($1, $2, $3) RETURNING *',
				[name, nftpictures, user_id]
			)
			res.json(newCollection.rows[0])
			console.log(req.files) // Виведення в консоль інформації про всі завантажені файли
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: 'Помилка сервера' })
		}
	}

	async getCollection(req, res) {
		const userId = req.params.user_id
		const collections = await db.query(
			'SELECT * FROM collections WHERE user_id=$1',
			[userId]
		)
		res.json(collections.rows)
	}
	async getCollections(req, res) {
		try {
			const collection = await db.query('SELECT * FROM collections')
			res.json(collection.rows)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: 'Помилка сервера' })
		}
	}
}

export default new CollectionController()
