import { redirect, json } from '@sveltejs/kit';
import cookie from 'cookie';

export function GET({ request }) {
    const cookies = cookie.parse(request.headers.get('cookie') || '');

    // to be implemented: check for token validity
    if(!cookies.it_lab_manager_token){
        return json({ redirect: '/login' }, { status: 302 });
    }
    else{
        return json({ redirect: '/dashboard' }, { status: 302 });
    }

}