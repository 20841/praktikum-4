import type { Metadata } from 'next'
import { Roboto, Space_Grotesk as SpaceGrotesk } from 'next/font/google'
import './globals.css'
import { ChildProps } from '@/types'
import { ThemeProvider } from '@/components/providers/theme.provider'
import { languages } from '@/i18n/settings'
import { dir } from 'i18next'
import { ClerkProvider } from '@clerk/nextjs'
import { localization } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import NextTopLoader from 'nextjs-toploader'


const roboto = Roboto({
	subsets: ['latin', 'cyrillic'],
	weight: ['100', '300', '400', '500', '700', '900'],
	variable: '--font-roboto',
})

const spaceGrotesk = SpaceGrotesk({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-space-grotesk',
})

export async function generateStaticParams() {
	return languages.map(lng => ({ lng }))
}

export const metadata: Metadata = {
	metadataBase: new URL('https://praktikum-4.vercel.app/uz'),
	title: 'Khaydarov praktikum | Dasturlash kurslari',
	description:
		"Khaydarov Praktikum Next.js dasturlash kurslari, amaliyotlar, startup loyihalar va asosiysi sifatli ta'limdir.",
	authors: [{ name: 'Samar Badriddinov', url: 'https://praktikum-4.vercel.app/en' }],
	icons: { icon: '/logo.svg' },
	openGraph: {
		title: 'Khaydarov praktikum | Dasturlash kurslari',
		description:
			"Khaydarov Praktikum Next.js dasturlash kurslari, amaliyotlar, startup loyihalar va asosiysi sifatli ta'limdir.",
		type: 'website',
		url: 'https://praktikum-4.vercel.app/uz',
		locale: 'uz_UZ',
		// images: 'https://avatars.githubusercontent.com/u/149902818?v=4',
		images: 'https://pedsovet.org/v3/upload/ckeditor/6/images/2017-07-17/1500289040_web-2389250_960_720.jpg',
		countryName: 'Uzbekistan',
		siteName: 'Khaydarov',
		emails: 'mirzohaydarov69@gmail.com',
	},
	keywords:
		"Praktikum, Praktikum Khaydarov, NextJS, NextJS to'liq kurs, NextJS kurs, NextJS dasturlash, Startup, Startup loyiha, Startup Khaydarov, Khaydarov, Khaydarov praktikum, Khaydarov dasturlash, Khaydarov startup, Khaydarov kurs, Khaydarov kurslari, Khaydarov dasturlash kurslari, Khaydarov startup kurslari, Khaydarov startup loyihalari, Khaydarov startup loyiha, Khaydarov startup loyihasi, Khaydarov startup loyihasi dasturlash",
}

interface Props extends ChildProps {
	params: { lng: string }
}

function RootLayout({ children, params: { lng } }: Props) {
	const local = localization(lng)

	return (
		<ClerkProvider localization={local}>
			<html lang={lng} dir={dir(lng)} suppressHydrationWarning>
				<body
					className={`${roboto.variable} ${spaceGrotesk.variable} custom-scrollbar overflow-x-hidden`}
					suppressHydrationWarning
				>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
					<NextTopLoader
							color='#3182CE'
							initialPosition={0.5}
							crawlSpeed={200}
							height={2}
							crawl={true}
							showSpinner={false}
							easing='ease'
							speed={200}
							shadow='0 0 10px #3182CE,0 0 5px #3182CE'
						/>
						<Toaster position='top-center' />
						<div>{children}</div>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}

export default RootLayout
