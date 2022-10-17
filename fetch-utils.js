const SUPABASE_URL = 'https://drkkyuikgzbfklwfrbyl.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRya2t5dWlrZ3piZmtsd2ZyYnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU3NjMzNjcsImV4cCI6MTk4MTMzOTM2N30.sEC9ZgoKA79vEWnOWaV78eAkUga3CpgmzzkyKC84Xr8';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createPost(post) {
    return await client.from('conv-posts').insert(post).single();
}

export async function getItems() {
    console.log('firing');

    return await client.from('conversion').select('*').order('title');
}

export async function getPosts() {
    return await client.from('conv-posts').select('*').order('created_at', { ascending: false });
}

export async function getPost(id) {
    return await client.from('conv-posts').select('*').eq('id', id).single();
}
