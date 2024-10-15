import { mysqlconnFn } from "$lib/database";

export async function load({ params }) {
  const mysqlconn = await mysqlconnFn();
  const objectId = params.edit;

  try {
    let results = await mysqlconn
      .query("SELECT * FROM materials WHERE id = ?;", [objectId])
      .then(function ([rows, fields]: any){ return rows; });

    if(results.length === 0){ console.log(`Nessun record trovato con id = ${objectId}`); }
    return { results };
  }
  catch(error){
    console.error("Error: " + error);
    return error;
  }
}