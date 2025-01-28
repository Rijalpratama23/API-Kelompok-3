const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fungsi untuk membuat buku baru
const createBook = async (req, res) => {
    const { title, author, publisher, year_published, stock, isbn } = req.body;

    try {
        const newBook = await prisma.buku.create({
            data: {
                title,
                author,
                publisher,
                year_published,
                stock,
                isbn,
            },
        });

        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create book' });
    }
};
console.log('createBook function is defined:', typeof createBook);
// Fungsi untuk mendapatkan semua buku
const getAllBooks = async (req, res) => {
    try {
        const books = await prisma.buku.findMany();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve books' });
    }
};

// Fungsi untuk mendapatkan buku berdasarkan ID
const getBookById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const book = await prisma.buku.findUnique({
            where: { id: parseInt(id) },
        });

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve book' });
    }
};

// Fungsi untuk memperbarui buku berdasarkan ID
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, publisher, year_published, stock, isbn } = req.body;

    try {
        const updatedBook = await prisma.buku.update({
            where: { id: parseInt(id) },
            data: { title, author, publisher, year_published, stock, isbn },
        });

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update book' });
    }
};

// Fungsi untuk menghapus buku berdasarkan ID
const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await prisma.buku.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete book' });
    }
};


module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};

console.log('Exported functions:', {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
});