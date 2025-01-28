const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Mendapatkan semua transaksi
async function getAllTransactions(req, res) {
    try {
        const transactions = await prisma.transaksi.findMany({
            include: {
                member: true,
                buku: true,
                user: true,
            },
        });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
    }
}

// Mendapatkan transaksi berdasarkan ID
async function getTransactionById(req, res) {
    const { id } = req.params;

    try {
        const transaction = await prisma.transaksi.findUnique({
            where: { transaksi_id: parseInt(id) },
            include: {
                member: true,
                buku: true,
                user: true,
            },
        });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
    }
}

// Membuat transaksi baru
async function createTransaction(req, res) {
    const { transaksi_id,borrow_date, return_date, status, member_id, buku_id, user_id } = req.body;

    try {
        const newTransaction = await prisma.transaksi.create({
            data: { transaksi_id,borrow_date, return_date, status, member_id, buku_id, user_id },
        });

        res.status(201).json({ message: 'Transaksi berhasil dibuat', newTransaction });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
    }
}

// Memperbarui data transaksi
async function updateTransaction(req, res) {
    const { id } = req.params;
    const { borrow_date, return_date, status, member_id, buku_id, user_id } = req.body;

    try {
        const updatedTransaction = await prisma.transaksi.update({
            where: { transaksi_id: parseInt(id) },
            data: { borrow_date, return_date, status, member_id, buku_id, user_id },
        });

        res.status(200).json({ message: 'Transaksi berhasil diperbarui', updatedTransaction });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
    }
}

// Menghapus transaksi
async function deleteTransaction(req, res) {
    const { id } = req.params;

    try {
        await prisma.transaksi.delete({
            where: { transaksi_id: parseInt(id) },
        });

        res.status(200).json({ message: 'Transaksi berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
    }
}

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};
