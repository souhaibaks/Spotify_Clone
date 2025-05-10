import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const { refresh_token } = await readBody(event)
    console.log('Received refresh token request')

    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      throw createError({
        statusCode: 500,
        message: 'Missing Spotify credentials',
      })
    }

    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', refresh_token)

    console.log('Requesting new tokens from Spotify...')
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
      console.error('Spotify token refresh failed:', error)
      throw createError({
        statusCode: response.status,
        message: 'Failed to refresh token',
      })
    }

    const data = await response.json()
    console.log('Successfully received new tokens from Spotify')
    return data
  } catch (error) {
    console.error('Error in refresh API:', error)
    throw error
  }
}) 