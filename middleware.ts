import { authMiddleware } from '@clerk/nextjs'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
	locales: ['en', 'ru', 'uz', 'tr'],
	defaultLocale: 'en',
})

export default authMiddleware({
	beforeAuth: req => intlMiddleware(req),
	publicRoutes: [
		'/:lng',
		'/:lng/courses',
		'/:lng/course/:slug',
		'/:lng/blogs',
		'/:lng/blogs/:slug',
		'/:lng/contacts',
		'/:lng/instructors',
		'/:lng/instructors/:instructorId',
		'/:lng/shopping/cart',
	],
	ignoredRoutes: ['/en/api/webhook'],
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
