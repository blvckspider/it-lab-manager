import { mysqlconnFn } from "$lib/database";
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const mysqlconn = await mysqlconnFn();

  const data = await request.json();
  const { name, quantity, note, location } = data;

  if (!name || quantity === undefined || !location) {
    return new Response(JSON.stringify({ message: 'Nome, quantità e posizione sono richiesti.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const query = "INSERT INTO materials (name, quantity, note, location) VALUES (?, ?, ?, ?);";
    await mysqlconn.query(query, [name, quantity, note, location]);

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
