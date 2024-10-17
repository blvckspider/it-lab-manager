import { queryDatabase } from "$lib/database"; // import the database connection's function

export async function load(){

  try{
    const results = await queryDatabase("SELECT * FROM materials;", []);
    return { data: results };
  }
  catch(error){
    console.error('Error loading materials:', error);
    return { error: 'Unable to load materials' };
  }

}