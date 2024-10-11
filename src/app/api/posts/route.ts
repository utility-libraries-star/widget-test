import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // 1 час TTL для кэша

async function getToken() {
  const cachedToken = cache.get<string>('token');

  if (cachedToken) {
    return cachedToken;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&fb_exchange_token=${process.env.INITIAL_TOKEN}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch access token');
    }

    const { access_token } = data;
    cache.set('token', access_token);

    return access_token;
  } catch (error: unknown) {
    throw new Error(
      (error as ErrorEvent).message || 'Error fetching access token'
    );
  }
}

async function getPageToken(page: string, token: string) {
  const cachedPageToken = cache.get<string>(`pageToken_${page}`);

  if (cachedPageToken) {
    return cachedPageToken;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${page}?fields=access_token&access_token=${token}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch page token');
    }

    const pageToken = data.access_token;
    cache.set(`pageToken_${page}`, pageToken);

    return pageToken;
  } catch (error) {
    throw new Error(
      (error as ErrorEvent).message || 'Error fetching page token'
    );
  }
}

async function getPosts(token: string) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/me/posts?fields=shares,message,id,full_picture,created_time,from,reactions.type%28LIKE%29.limit%280%29.summary%281%29.as%28reactions%29,permalink_url,attachments{media,target,description,media_type,title,type,unshimmed_url,url,subattachments},comments.limit%280%29.summary%281%29.as%28comments_count%29,reactions.type%28LIKE%29.limit%280%29.summary%281%29.as%28reactions_like%29,reactions.type%28LOVE%29.limit%280%29.summary%281%29.as%28reactions_love%29,reactions.type%28WOW%29.limit%280%29.summary%281%29.as%28reactions_wow%29,reactions.type%28HAHA%29.limit%280%29.summary%281%29.as%28reactions_haha%29,reactions.type%28SAD%29.limit%280%29.summary%281%29.as%28reactions_sad%29,reactions.type%28ANGRY%29.limit%280%29.summary%281%29.as%28reactions_angry%29,reactions.type%28THANKFUL%29.limit%280%29.summary%281%29.as%28reactions_thankful%29&locale=en&limit=10&access_token=${token}`
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error?.message || 'Failed to fetch posts');
    }

    return await response.json();
  } catch (error: unknown) {
    throw new Error((error as ErrorEvent).message || 'Error fetching posts');
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');

  if (!page) {
    return new Response(
      JSON.stringify({ message: 'Invalid search params: "page" is required' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  try {
    const token = await getToken();
    const pageToken = await getPageToken(page, token);
    const posts = await getPosts(pageToken);

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({ error: (error as ErrorEvent).message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
