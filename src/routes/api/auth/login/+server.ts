import { queryDatabase } from '$lib/database'; // import the database connection's function
import { json, type RequestHandler } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import cookie from 'cookie';

export const POST: RequestHandler = async ({ request }) => {
    try{
        const { username, password } = await request.json();

        const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
        const values = [username, password];
        const rows = await queryDatabase(query, values);

        if(rows.length > 0){
            const token = uuidv4();
            
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Solo su HTTPS in produzione
                maxAge: 3600, // Durata del cookie in secondi (1 ora)
                path: '/' // Visibile su tutto il sito
            };
            const serializedCookie = cookie.serialize('it_lab_manager_token', token, cookieOptions);

            return json({ token }, {
                headers: {'Set-Cookie': serializedCookie} // Imposta il cookie nella risposta
            });
        }

        return json({ error: 'Credenziali non valide' }, { status: 401 });
    }
    catch(error){
        console.error('Error handling request:', error);
        return json({ error: 'Errore nella richiesta' }, { status: 400 });
    }
};