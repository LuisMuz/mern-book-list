import React, {useEffect, useState} from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {useNavigate, useParams} from 'react-router-dom';


const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [])

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/books/${id}`)
            .then((response) => {
                console.log(response);
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('Error deleting book');
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton/>
            <h1 className='text-3xl my-4'>Delete Books</h1>
            {loading ? (<Spinner/>) : ('')}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>{title}</span>
                </div>
                <div className='my-4'>
                    <button
                        onClick={handleDeleteBook}
                        className='bg-red-500 text-white rounded-md p-2'
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteBook;