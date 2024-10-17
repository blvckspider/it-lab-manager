import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = ({ event, resolve }) => {
    const protectedRoutes = ['/dashboard'];

    event.locals.authenticated = event.cookies.get('it_lab_manager_token') ? true : false

    if(!event.locals.authenticated && protectedRoutes.some(route => event.url.pathname.startsWith(route))){
        throw redirect(302, '/login');
    }

    return resolve(event);
};