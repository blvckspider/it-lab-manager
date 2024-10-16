import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
    const response = await fetch('/api/auth/checkToken');
    const data = await response.json();

    if(data.redirect){ throw redirect(302, data.redirect); }
}