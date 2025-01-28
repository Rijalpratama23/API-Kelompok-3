const express = require('express');
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/bukuController');
const { authenticateToken } = require('../middlewares/authMiddleware');

console.log('Imported functions:', {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
});
if (!authenticateToken) {
    console.error('Error: Middleware authenticateToken is undefined');
    process.exit(1); // Hentikan proses jika middleware tidak valid
}
const router = express.Router();

router.get('/', getAllBooks); // Tanpa authenticateToken
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;