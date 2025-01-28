const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Mendapatkan semua member
async function getAllMembers(req, res) {
    try {
        const members = await prisma.member.findMany();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
    }
}

// Mendapatkan member berdasarkan ID
async function getMemberById(req, res) {
    const { id } = req.params;

    try {
        const member = await prisma.member.findUnique({
            where: { member_id: parseInt(id) },
        });

        if (!member) {
            return res.status(404).json({ message: 'Member tidak ditemukan' });
        }

        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
    }
}

// Menambahkan member baru
async function createMember(req, res) {
    const { name, email, phone, address } = req.body;

    try {
        const newMember = await prisma.member.create({
            data: { name, email, phone, address },
        });

        res.status(201).json({ message: 'Member berhasil ditambahkan', newMember });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
    }
}

// Memperbarui data member
async function updateMember(req, res) {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    try {
        const updatedMember = await prisma.member.update({
            where: { member_id: parseInt(id) },
            data: { name, email, phone, address },
        });

        res.status(200).json({ message: 'Member berhasil diperbarui', updatedMember });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
    }
}

// Menghapus member
async function deleteMember(req, res) {
    const { id } = req.params;

    try {
        await prisma.member.delete({
            where: { member_id: parseInt(id) },
        });

        res.status(200).json({ message: 'Member berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
    }
}

module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
};
