import React from 'react'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const CreateBook = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios
    .post('http://localhost:4000/books', data)
    .then((response) => {
      setLoading(false)
      navigate('/')
    })
    .catch((error) => {
      setLoading(false)
      console.log(error)
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <lable className='text-xl mr-4 text-gray-500'>Title</lable>
          <input 
           type='text'
           className='border-2 border-gray-500 px-4 py-2 w-full'
           value={title}
           onChange={(e) => setTitle(e.target.value)}>
          </input>
          <lable className='text-xl mr-4 text-gray-500'>Author</lable>

          <input 
           type='text'
           className='border-2 border-gray-500 px-4 py-2 w-full'
           value={author}
           onChange={(e) => setAuthor(e.target.value)}>
          </input>
          <lable className='text-xl mr-4 text-gray-500'>PublishYear</lable>

          <input 
           type='text'
           className='border-2 border-gray-500 px-4 py-2 w-full'
           value={publishYear}
           onChange={(e) => setPublishYear(e.target.value)}>
          </input>

        </div>

        <button className='p-2 bg-sky-400 m-8' onClick={handleSaveBook}>Save</button>
      </div>
    </div>
  )
}

export default CreateBook