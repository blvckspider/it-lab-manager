import { mysqlconnFn } from "$lib/database";
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const mysqlconn = await mysqlconnFn();

  const data = await request.json();
  const { id, name, quantity, note, laboratory, locker, shelf } = data;

  try{
    const query = "UPDATE materials SET name = ?, quantity = ?, note = ?, laboratory = ?, locker = ?, shelf = ? WHERE id = ?;";
    await mysqlconn.query(query, [name, quantity, note, laboratory, locker, shelf, id]);

    return new Response(JSON.stringify({ message: 'Record aggiornato con successo!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  catch(error){
    console.error("Error while updating record:", error);
    
    return new Response(JSON.stringify({ message: 'Error while updating record.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
