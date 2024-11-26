import { ChildProps } from '@/types'
import Navbar from './_components/navbar'
import Footer from './_components/footer'
import RefreshModal from '@/components/modals/refresh.modal'

function Layout({ children }: ChildProps) {
	return (
		<div>
			<Navbar />
			<main>{children}</main>
			<Footer />
			<RefreshModal/>
		</div>
	)
}

export default Layout
