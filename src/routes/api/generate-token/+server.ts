import type { RequestHandler } from '@sveltejs/kit';
import { generateToken } from '$lib/auth';

export const GET: RequestHandler = async ({ url }) => {
    try {
        const id = url.searchParams.get('id');
        const name = url.searchParams.get('name');

        if (!id || !name) {
            console.error('Missing parameters:', { id, name });
            return new Response(
                JSON.stringify({ error: 'Missing id or name parameter' }),
                { 
                    status: 400, 
                    headers: { 'Content-Type': 'application/json' } 
                }
            );
        }

        try {
            const token = generateToken(id, name);
            console.log('Token generated successfully');
            
            return new Response(
                JSON.stringify({ token }),
                { 
                    status: 200, 
                    headers: { 'Content-Type': 'application/json' } 
                }
            );
        } catch (tokenError) {
            console.error('Token generation failed:', tokenError);
            throw tokenError;
        }
    } catch (error) {
        console.error('Server error:', error);
        
        return new Response(
            JSON.stringify({ 
                error: 'Failed to generate token',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            { 
                status: 500, 
                headers: { 'Content-Type': 'application/json' } 
            }
        );
    }
};
