import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {MdOutlineAddBox} from 'react-icons/md';
import Spinner from '../components/Spinner';
import BooksCards from '../components/home/BooksCards';
import BooksTable from '../components/home/BooksTable';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books list</h1>
                <div className='flex'>
                    <div className='flex justify-center items-center gap-x-4'>
                        <button
                            onClick={() => setShowType('table')}
                            className={`border-2 border-sky-400 p-2 rounded-md ${showType === 'table' ? 'bg-sky-400 text-white' : ''}`}
                        >
                            Table
                        </button>
                        <button
                            onClick={() => setShowType('cards')}
                            className={`border-2 border-sky-400 p-2 rounded-md ${showType === 'cards' ? 'bg-sky-400 text-white' : ''}`}
                        >
                            Cards
                        </button>
                    </div>
                    <div className='px-4'></div>
                    <Link to='/books/create'>
                        <MdOutlineAddBox className='text-sky-800 text-4xl'/>
                    </Link>
                </div>
            </div>
            {loading ? (<Spinner/>) : 
                (
                    showType === 'table' ? 
                    <BooksTable books={books}/> : 
                    <BooksCards books={books}/>
                )
            }
        </div>
    );
}

export default Home;