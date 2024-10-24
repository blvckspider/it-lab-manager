import { queryDatabase } from '$lib/database';
import { json, type RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { username, email, password } = await request.json();

        const checkQuery = 'SELECT * FROM users WHERE username = ?';
        const existingUsers = await queryDatabase(checkQuery, email);

        if(existingUsers.length > 0){
            return json({ error: 'Nome utente già in uso' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

        const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        await queryDatabase(insertQuery, [username, email, hashedPassword]);

        return json({ message: 'Registrazione completata' }, { status: 201 });
    } catch (error) {
        console.error('Error handling registration:', error);
        return json({ error: 'Errore nella registrazione' }, { status: 400 });
    }
};