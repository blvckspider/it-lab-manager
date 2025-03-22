import { queryDatabase } from '$lib/database'; // import the database connection's function
import { json, type RequestHandler } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'; // import bcrypt
import cookie from 'cookie';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { username, password } = await request.json();

        const query = 'SELECT * FROM users WHERE username = ?';
        const values = [username];
        const rows = await queryDatabase(query, values);

        if (rows.length > 0) {
            const user = rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = uuidv4();

                const cookieOptions = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // solo su HTTPS in production
                    maxAge: 7200, // durata del cookie in secondi
                    path: '/' // visibile su tutto il sito
                };
                const serializedCookie = cookie.serialize('it_lab_manager_token', token, cookieOptions);

                return json({ token }, {
                    headers: { 'Set-Cookie': serializedCookie }
                });
            }
        }

        return json({ error: 'Credenziali non valide' }, { status: 401 });
    } catch (error) {
        console.error('Error handling request:', error);
        return json({ error: 'Errore nella richiesta' }, { status: 400 });
    }
};