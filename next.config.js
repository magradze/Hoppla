/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'lh3.googleusercontent.com', 'via.placeholder.com'],
    },
    i18n: {
        locales: ['ka', 'ru'],
        defaultLocale: 'ka',
    },
}

module.exports = nextConfig
