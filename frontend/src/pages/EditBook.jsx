import React from 'react'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { useState , useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const EditBook = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    setLoading(true)
    axios
    .get(`http://localhost:4000/books/${id}`)
    .then((response) => {
      setTitle(response.data.title)
      setAuthor(response.data.author)
      setPublishYear(response.data.publishYear)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
      alert("An error occured please check the console.")
      setLoading(false)
    })
  },[])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios
    .put(`http://localhost:4000/books/${id}`, data)
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
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
           type='text'
           className='border-2 border-gray-500 px-4 py-2 w-full'
           value={title}
           onChange={(e) => setTitle(e.target.value)}>
          </input>
          <label className='text-xl mr-4 text-gray-500'>Author</label>

          <input 
           type='text'
           className='border-2 border-gray-500 px-4 py-2 w-full'
           value={author}
           onChange={(e) => setAuthor(e.target.value)}>
          </input>
          <label className='text-xl mr-4 text-gray-500'>PublishYear</label>

          <input 
           type='text'
           className='border-2 border-gray-500 px-4 py-2 w-full'
           value={publishYear}
           onChange={(e) => setPublishYear(e.target.value)}>
          </input>

        </div>

        <button className='p-2 bg-sky-400 m-8' onClick={handleEditBook}>Save</button>
      </div>
    </div>
  )
}

export default EditBook