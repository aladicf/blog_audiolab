import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'

import { graphCMSImageLoader } from '../util'
import { getSimilarPosts, getRecentPosts } from '../services'

const PostWidget = ({ categories, slug }) => {
	const [relatedPosts, setRelatedPosts] = useState([])

	useEffect(() => {
		if (slug) {
			getSimilarPosts(categories, slug).then((result) => {
				setRelatedPosts(result)
			})
		} else {
			getRecentPosts().then((result) => {
				setRelatedPosts(result)
			})
		}
	}, [slug])

	return (
		<div className='p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg'>
			<h3 className='pb-4 mb-8 text-xl font-semibold border-b'>
				{slug ? 'Related Posts' : 'Recent Posts'}
			</h3>
			{relatedPosts.map((post, index) => (
				<div key={index} className='flex items-center w-full mb-4'>
					<div className='flex-none w-16'>
						<Image
							loader={graphCMSImageLoader}
							alt={post.title}
							height='70px'
							width='70px'
							className='align-middle rounded-full'
							src={post.featuredImage.url}
							priority
						/>
					</div>
					<div className='flex-grow ml-4 hover:text-teal-600'>
						<p className='text-gray-500 font-xs'>
							{moment(post.createdAt).format('DD MMMM, YYYY')}
						</p>
						<Link href={`/post/${post.slug}`} className='text-md' key={index}>
							{post.title}
						</Link>
					</div>
				</div>
			))}
		</div>
	)
}

export default PostWidget
