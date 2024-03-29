import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import { getCategories } from '../services'

const Header = () => {
	const [categories, setCategories] = useState([])

	useEffect(() => {
		getCategories().then((newCategories) => {
			setCategories(newCategories)
		})
	}, [])

	return (
		<div className='container px-10 mx-auto mb-8'>
			<div className='inline-block w-full py-8 border-b border-teal-400'>
				<div className='block md:float-left'>
					<Link href='/'>
						<span className='text-4xl font-bold text-white cursor-pointer hover:text-teal-500'>
							Audio Lab Blog
						</span>
					</Link>
				</div>
				<div className='hidden md:float-left md:contents'>
					{categories.map((category, index) => (
						<Link key={index} href={`/category/${category.slug}`}>
							<span className='mt-2 ml-4 font-semibold text-white align-middle cursor-pointer hover:text-teal-500 md:float-right'>
								{category.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default Header
