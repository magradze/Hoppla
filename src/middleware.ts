import {withAuth} from "next-auth/middleware"
import {NextResponse} from "next/server";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    async function middleware(req) {
        try {
            const token = req.nextauth.token
            // console.log(token)

            if (token?.phone === null || token?.address === null || token?.birthday === null) {
                return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/new-user`)
            }
        } catch (e) {
            console.log(e)
        }
    },
    {
        callbacks: {
            authorized: ({token}) => token?.role === "USER",
        },
        pages: {
            signIn: "/auth/signin",
            error: "/auth/error",
            newUser: "/auth/new-user",
            verifyRequest: "/auth/verify-request",
            signOut: "/auth/signout",
        }
    },
)

// export const config = {
//     matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// }

export const config = {
    api: {
        bodyParser: false,
    },
    matcher: [
        '/ride/add',
        '/dashboard',
        '/dashboard/profile',
        // '/auth/new-user'
    ]
}