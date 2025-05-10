import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const { code } = await readBody(event)
    console.log('Received code in callback API:', code)

    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI

    if (!clientId || !clientSecret || !redirectUri) {
      throw createError({
        statusCode: 500,
        message: 'Missing Spotify credentials',
      })
    }

    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', redirectUri)

    console.log('Exchanging code for tokens with Spotify...')
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: params,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Spotify token exchange failed:', error)
      throw createError({
        statusCode: response.status,
        message: 'Failed to exchange code for tokens',
      })
    }

    const data = await response.json()
    console.log('Successfully received tokens from Spotify')
    return data
  } catch (error) {
    console.error('Error in callback API:', error)
    throw error
  }
}) 