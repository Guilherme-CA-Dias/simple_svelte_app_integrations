import type { RequestHandler } from '@sveltejs/kit';
import { generateToken } from '$lib/auth';

export const GET: RequestHandler = async ({ url }) => {
    try {
        const id = url.searchParams.get('id');
        const name = url.searchParams.get('name');

        if (!id || !name) {
            return new Response(
                JSON.stringify({ error: 'Missing id or name parameter' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const token = generateToken(id, name);

        return new Response(
            JSON.stringify({ token }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error generating token:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to generate token' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
