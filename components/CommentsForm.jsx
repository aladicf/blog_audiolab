import React, { useState, useEffect, useRef } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
	const [error, setError] = useState(false)
	const [localStorage, setLocalStorage] = useState(null)
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)

	const commentElement = useRef()
	const nameElement = useRef()
	const emailElement = useRef()
	const storeDataElement = useRef()

	useEffect(() => {
		nameElement.current.value = window.localStorage.getItem('name')
		emailElement.current.value = window.localStorage.getItem('email')
	}, [])

	const handleCommentSubmit = (e) => {
		setError(false)

		const { value: comment } = commentElement.current
		const { value: name } = nameElement.current
		const { value: email } = emailElement.current
		const { checked: storeData } = storeDataElement.current

		if (!comment || !name || !email) {
			setError(true)
			return
		}
		const commentObj = {
			name,
			email,
			comment,
			slug,
		}
		if (storeData) {
			window.localStorage.setItem('name', name)
			window.localStorage.setItem('email', email)
		} else {
			window.localStorage.removeItem('name')
			window.localStorage.removeItem('email')
		}
		submitComment(commentObj).then((res) => {
			setShowSuccessMessage(true)
			setTimeout(() => {
				setShowSuccessMessage(false)
			}, 5000)
		})
	}

	return (
		<div className='p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg'>
			<h3 className='pb-4 mb-8 text-xl font-semibold border-b'>
				Leave a comment
			</h3>
			<div className='grid grid-cols-1 gap-4 mb-4'>
				<textarea
					className='w-full p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200'
					ref={commentElement}
					placeholder='Comment'
					name='comment'
				/>
			</div>
			<div className='grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2'>
				<input
					type='text'
					name='name'
					ref={nameElement}
					placeholder='Name'
					className='w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200'
				/>
			</div>
			<div className='grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2'>
				<input
					type='text'
					name='email'
					ref={emailElement}
					placeholder='Email'
					className='w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200'
				/>
			</div>
			<div className='grid grid-cols-1 gap-4 mb-4'>
				<div>
					<input
						type='checkbox'
						id='storeData'
						name='storeData'
						value='true'
						ref={storeDataElement}
					/>
					<label
						className='ml-2 text-gray-500 cursor-pointer'
						htmlFor='storeData'
					>
						{' '}
						Save my name and email in this browser for the next time I comment.
					</label>
				</div>
			</div>
			{error && (
				<p className='text-xs text-red-600'>All fields are required.</p>
			)}
			<div className='mt-8'>
				<button
					type='button'
					onClick={handleCommentSubmit}
					className='inline-block px-8 py-3 text-lg text-white transition duration-500 bg-teal-600 rounded-full cursor-pointer ease hover:bg-teal-400'
				>
					Post Comment
				</button>
				{showSuccessMessage && (
					<span className='float-right mt-3 text-xl font-semibold text-green-500'>
						Comment submitted for review.
					</span>
				)}
			</div>
		</div>
	)
}

export default CommentsForm
