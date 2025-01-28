const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Registrasi pengguna
async function register(req, res) {
    const { user_id,username, password, role } = req.body;

    try {
        // Validasi input
        if ( !user_id|| !username || !password || !role) {
            return res.status(400).json({ message: 'Semua field wajib diisi' });
        }

        // Cek apakah username sudah digunakan
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username sudah digunakan' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan pengguna baru ke database
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role,
            },
        });

        res.status(201).json({ message: 'Pengguna berhasil didaftarkan', user });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
    }
}

// Login pengguna
async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Validasi input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username dan password wajib diisi' });
        }

        // Cek apakah pengguna ada
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password salah' });
        }

        // Buat token JWT
        const token = jwt.sign(
            { id: user.user_id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login berhasil', token });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
    }
}

module.exports = { register, login };
