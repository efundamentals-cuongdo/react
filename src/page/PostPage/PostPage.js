import './PostPage.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Link
  } from "react-router-dom";
const PostPage = () => {
    const [isLoading, setLoading] = useState(true)
    const [posts, setPost] = useState([])
    const [error, setError] = useState('')
    const [searchText, setSearchText] = useState('')
    const [idRemove, setIDRemove] = useState(0)
    const SORT = {
        NONE: "none",
        ASC: "asc",
        DES: "des"
    }
    const [sort, setSort] = useState(SORT.NONE)
    let isCancel = false
    useEffect(() => {
        setLoading(true)
        axios({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts'
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
    }, [])
    const handleSearchChange = evt => {
        setSearchText(evt.target.value)
        console.log(searchText)
    }
    const handleSortChang = evt => {
        setSort(evt.target.value)
        console.log('sort:' + sort)
        console.log('option:' + evt.target.value)
    }
    const postFiltered = posts.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()))
    const getPostSorted = () => {
        switch (sort) {
            case SORT.NONE:
                return postFiltered;
            case SORT.ASC:
                return postFiltered.sort((post1, post2) => {
                    if (post1.title.toLowerCase() < post2.title.toLowerCase()) return -1;
                    if (post1.title.toLowerCase() > post2.title.toLowerCase()) return 1;
                    return 0
                });
            case SORT.DES:
                return postFiltered.sort((post1, post2) => {
                    if (post1.title.toLowerCase() > post2.title.toLowerCase()) return -1;
                    if (post1.title.toLowerCase() < post2.title.toLowerCase()) return 1;
                    return 0
                });
            default:
                return null
        }
    }
    const sortedPosts = getPostSorted()
    console.log(idRemove)
    const handleRemovePost = (id) => {
        console.log(id)
        const newState = [...posts]
        let index = newState.map(e => { return e.id; }).indexOf(id);
        newState.splice(index, 1);
        setPost(newState)
    
    }
    if (isLoading) return (<div>Loading</div>)
    if (error) return (<div style={{ color: 'red' }}>{error}</div>)
    return (
        <div>
            <input type='text'
                placeholder='search by title'
                value={searchText}
                onChange={handleSearchChange}
            />
            sort by:
            <select onChange={handleSortChang}>
                <option value={SORT.NONE}>none</option>
                <option value={SORT.ASC}>asc</option>
                <option value={SORT.DES}>des</option>
            </select>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPosts.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                    <td><Link to={{pathname: `/post/${post.id}`}}>detail</Link></td>
                            <td><button onClick={()=>handleRemovePost(post.id)}>remove</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default PostPage;