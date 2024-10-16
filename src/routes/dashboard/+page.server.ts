import { queryDatabase } from "$lib/database"; // import the database connection's function
import { redirect } from '@sveltejs/kit';

export async function load({ request }: any){

  const response = await fetch('/api/auth/checkToken');
  const data = await response.json();
  if(data.redirect){ throw redirect(302, data.redirect); }
  
  try{
    const results = await queryDatabase("SELECT * FROM materials;", []);
    return { data: results };
  }
  catch(error){
    console.error('Error loading materials:', error);
    return { error: 'Unable to load materials' };
  }

}