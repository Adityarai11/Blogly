import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/blogCard";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
   {blogs && blogs.map((blog) => (
    <BlogCard 
      key={blog._id} 
      title={blog.title} 
      content={blog.content} 
      image={blog.image} 
      username={blog.user.username} 
    />
))}


    </div>
  )
    
};

export default Blogs;
