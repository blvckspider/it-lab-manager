import { mysqlconnFn } from "$lib/database";
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const mysqlconn = await mysqlconnFn();

  const data = await request.json();
  const { name, quantity, note, laboratory, locker, shelf } = data;

  if (!name || quantity === undefined || !laboratory || locker === undefined || shelf === undefined){
    return new Response(JSON.stringify({ message: 'Valori inseriti non validi.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const query = "INSERT INTO materials (name, quantity, note, laboratory, locker, shelf) VALUES (?, ?, ?, ?, ?, ?);";
    await mysqlconn.query(query, [name, quantity, note, laboratory, locker, shelf]);

    return new Response(JSON.stringify({ message: 'Record inserted successfully!' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Errore durante l'inserimento del record:", error);
    
    return new Response(JSON.stringify({ message: 'Errore durante l\'inserimento del record.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
