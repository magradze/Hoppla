/** @type {import('next').NextConfig} */
const nextConfig = {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'localhost',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'via.placeholder.com',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'gravatar.com',
            pathname: '**',
        }
    ],
    i18n: {
        locales: ['ka', 'ru'],
        defaultLocale: 'ka',
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
