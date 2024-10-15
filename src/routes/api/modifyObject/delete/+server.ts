import { mysqlconnFn } from "$lib/database";
import type { RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ request }) => {
    const mysqlconn = await mysqlconnFn();
    const { id } = await request.json();

    try{
        const query = "DELETE FROM materials WHERE id = ?;";
        await mysqlconn.query(query, [id]);

        return new Response(JSON.stringify({ message: 'Record deleted!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch(error){
        return new Response(JSON.stringify({ message: 'Errore while deleting record.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};