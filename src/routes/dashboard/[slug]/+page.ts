import { queryDatabase } from '$lib/database';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
    try{
        if(!params.slug){ throw new Error('Slug is required'); }
        const data = await queryDatabase('SELECT * FROM materials WHERE id = ?', [params.slug]);

        return {
            props: {
                slug: params.slug,
                data: data.length > 0 ? data[0] : null,
            },
        };
    }
    catch(error){
        console.error('Error in load function:', error);

        return {
            props: {
                slug: params.slug,
                data: null,
            },
        };
    }
};
