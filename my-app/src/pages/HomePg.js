import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { db, auth } from '../firebase-config';

function HomePg({authState}) {
   const [posts, setPosts] = useState([]);

   // This function runs when the page is loaded to fetch the data. 
   // It stores the data into the posts state (type list).
   useEffect(()=> {
       const getData = async () => {
           const data = await getDocs(collection(db, "posts"));
           setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
       };
       getData();
   });

   //Delete your own posts function
   const deletePost = async (id) => {
       const thisSpecificDoc = doc(db, "posts", id);
       await deleteDoc(thisSpecificDoc);
   }

   //Like your friends post = It adds one like and also takes note of your email
   const likePost = async (id, emails) => {
       const thisSpecificDoc = doc(db, "posts", id);
       await updateDoc(thisSpecificDoc,{likes: increment(1), mostrecentliker:emails});
   }

   return (
       <div className="HomePg">
       {posts.map((post)=> {
           return (
           <div className="post" key={post.id}>
               <div className="like">
                   {auth.currentUser != null &&
                       <div> {post.author.id !== auth.currentUser.uid &&
                           <button onClick={() => {likePost(post.id, auth.currentUser.email)}}> &#10084; </button> }
                           <div> {post.likes} </div>
                       </div>
                   } 
               </div>
               <div className="delete">
                   {auth.currentUser != null &&
                       <div> {post.author.id === auth.currentUser.uid &&
                           <button onClick={() => {deletePost(post.id)}}> Delete </button>}
                       </div>
                   } 
               </div>
               <h3>{post.author.name} writes about {post.title}</h3>
               <div className="textContainer">
                   {post.postInfo}
               </div>
               {(post.storagesrc !== null && post.storagesrc !== undefined && post.storagesrc !== "") &&
                   <div className="box">
                       <img src={post.storagesrc} alt="" ></img>
                   </div>
               }
           </div>
           )
       })}
       </div>
   );
}
 export default HomePg;