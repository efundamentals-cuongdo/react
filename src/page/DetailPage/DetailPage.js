import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router';
const DetailPage = () => {
    let {id} = useParams();
    const [isLoading, setLoading] = useState(true)
    const [post, setPost] = useState({
        id: null,
        title: null,
        body: null
    })
    const [error, setError] = useState('')

    console.log(id)
    let isCancel = false
    useEffect(() => {
        setLoading(true)
        axios({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/posts/${id}`
        }).then(({ data }) => {
            if (!isCancel) {
                setLoading(false)
                setPost(data)
            }

        }).catch(error => {
            setError(error.message || 'some errors occurred')
        })
        return () => {
            console.log('cleanup function running')
            isCancel = true
        }
    }, [id])
    if (isLoading) return (<div>Loading</div>)
    if (error) return (<div style={{ color: 'red' }}>{error}</div>)
    return (
        <div className="app-container">
            <div>ID:{post.id}</div>
            <div>Title:{post.title}</div>
            <div>Body:{post.body}</div>
        </div>
    )
};

export default DetailPage;