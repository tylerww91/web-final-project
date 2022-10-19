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
    return await client.from('conversion').select('*').order('title');
}

export async function getPosts() {
    return await client.from('conv-posts').select('*').order('created_at', { ascending: false });
}

export async function getPost(id) {
    return await client
        .from('conv-posts')
        .select(`*, comments(*)`)
        .eq('id', id)
        .order('created_at', { foreignTable: 'comments', ascending: false })
        .single();
}

export async function createComment(comment) {
    return await client.from('comments').insert(comment).single();
}

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });
    if (response.error) {
        return null;
    }
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    return url;
}

export async function updateProfile(profile) {
    return await client.from('profiles').upsert(profile).single().eq('user_id', profile.user_id);
}

export async function getProfile(id) {
    return await client.from('profiles').select('*').eq('id', id).maybeSingle();
}
// check this
export async function getProfilePosts(id) {
    return await client
        .from('conv-posts')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', id);
}

export function onMessage(postId, handleMessage) {
    client.from(`comments:post_id=eq.${postId}`).on('INSERT', handleMessage).subscribe();
}

export async function getComment(id) {
    return await client.from('comments').select('*').eq('id', id).single();
}
