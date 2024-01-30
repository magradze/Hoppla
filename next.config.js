/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'lh3.googleusercontent.com', 'via.placeholder.com', 'images.unsplash.com', 'avatars.githubusercontent.com', 'gravatar.com'],
    },
    i18n: {
        locales: ['ka', 'ru'],
        defaultLocale: 'ka',
    },
    typescript: {
        ignoreBuildErrors: false,
    },
}

module.exports = nextConfig
