import { mysqlconnFn } from "$lib/database";

export function load({ params }: any) {
    const slug = params.edit;
    
    return { slug };

    
}