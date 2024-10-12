import { queryDatabase } from "$lib/database"; // import the database connection's function
import { redirect } from '@sveltejs/kit';
import cookie from 'cookie';

export async function load({ request }: any){

  const cookies = cookie.parse(request.headers.get('cookie') || '');
  if(!cookies.it_lab_manager_token){ throw redirect(302, '/login'); } // if token doesn't exist

  try{
    const results = await queryDatabase("SELECT * FROM materials;", []);
    return { data: results };
  }
  catch(error){
    console.error('Error loading materials:', error);
    return { error: 'Unable to load materials' };
  }

}