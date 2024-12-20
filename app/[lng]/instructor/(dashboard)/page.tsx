import StatisticsCard from '@/components/cards/statistics.card'
import Header from '../../../../components/shared/header'
import { MessageSquare, MonitorPlay } from 'lucide-react'
import { PiStudent } from 'react-icons/pi'
import { GrMoney } from 'react-icons/gr'
import ReviewCard from '@/components/cards/review.card'
import { getCourses } from '@/actions/course.action'
import { auth } from '@clerk/nextjs'
import InstructorCourseCard from '@/components/cards/instructor-course.card'
import { formatAndDivideNumber } from '@/lib/utils'
import { getReviews } from '@/actions/review.action'
import { getRole } from '@/actions/user.action'
import { redirect } from 'next/navigation'

async function Page() {
	const { userId } = auth()
	const user = await getRole(userId!)

	if (user.role !== 'instructor') return redirect('/')

	const result = await getCourses({ clerkId: userId! })
	const { reviews, totalReviews } = await getReviews({ clerkId: userId! })

	return (
		<>
			<Header title='Dashboard' description='Welcome to your dashboard' />

			<div className='mt-4 grid grid-cols-3 gap-4 max-md:grid-cols-1'>
				<StatisticsCard
					label='Total courses'
					value={result.totalCourses.toString()}
					Icon={MonitorPlay}
				/>
				<StatisticsCard
					label='Total students'
					value={formatAndDivideNumber(result.totalStudents)}
					Icon={PiStudent}
				/>
				<StatisticsCard
					label='Reviews'
					value={formatAndDivideNumber(totalReviews)}
					Icon={MessageSquare}
				/>
				<StatisticsCard
					label='Total Sales'
					value={result.totalEearnings.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
					Icon={GrMoney}
				/>
			</div>

			<Header
				title='Latest courses'
				description='Here are your latest courses'
			/>

			<div className='mt-4 grid grid-cols-3 gap-4 max-md:grid-cols-1'>
				{result.courses.map(course => (
					<InstructorCourseCard
						key={course.title}
						course={JSON.parse(JSON.stringify(course))}
					/>
				))}
			</div>

			<Header title='Reviews' description='Here are your latest reviews' />

			<div className='mt-4 grid grid-cols-3 gap-4 max-md:grid-cols-1'>
				{reviews.map(review => (
					<div className='rounded-md bg-background px-4 pb-4' key={review._id}>
						<ReviewCard review={JSON.parse(JSON.stringify(review))} />
					</div>
				))}
			</div>
		</>
	)
}

export default Page
