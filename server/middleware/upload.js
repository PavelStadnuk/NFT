import moment from 'moment'
import multer from 'multer'
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'image/')
	},
	filename(req, file, cb) {
		const date = moment().format('DDMMYYYY-HHmmss_SSS')
		cb(null, `${date}-${file.originalname}`)
	},
})
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}
export default multer({ storage, fileFilter })
