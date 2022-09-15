import React, { useState } from "react";
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from '../firebase-config'
import { useNavigate } from "react-router-dom";

function PostPg({authState}) {
   //Using Navigate to navigate away from this page to Home once post is uploaded
   let navigate = useNavigate();
   //Creating States for all the fields
   const [title, setTitle] = useState("");
   const [file, setFile] = useState("");
   const [postInfo, setPostInfo] = useState("");
   const [storagesrc, setStorageSrc] = useState("");
   const likes = 0;
   const mostrecentliker = "";
   const [percent, setPercent] = useState(0); //For storage upload %

   //Reference the collection "posts" you just created in the console
   const postsCollectionRef = collection(db, "posts")

   //Create a function to add a Document to the posts collection
   const postToCloud = async () => {
       await addDoc(postsCollectionRef, {
           title,
           postInfo,
           author: {name: auth.currentUser.displayName, id: auth.currentUser.uid},
           storagesrc,
           likes,
           mostrecentliker
       });
       navigate("/");
   };

   //Create a helper function to target file
   function getFile(event) {
       setFile(event.target.files[0]);
   }

   //Create a function to add a static image to Cloud Storage
   function uploadToCloud() {
       const storageRef = ref(storage,`/postImg/${file.name}`) //This reference to where files will save
       const uploadTask = uploadBytesResumable(storageRef, file);
       uploadTask.on(
           "state_changed",
           (snapshot) => {
               const curPercent = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
               setPercent(curPercent); //This is what shows the percent uploaded
           },
           (err) => console.log(err),
           () => {
               getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                   setStorageSrc(url) //This sets the storagesrc as the url to this picture!
               });
           }
       );
   }

   return (
       <div className="PostPg">
           <div className="FieldInput">
               <label>Title</label>
               <input
                   placeholder="Title..."
                   onChange={(event) => {
                       setTitle(event.target.value);
                   }}
               />
           </div>
           <div className="FieldInput">
               <label>Info:</label>
               <textarea
                   placeholder="Info..."
                   onChange={(event) => {
                       setPostInfo(event.target.value);
                   }}
               />
           </div>
           <input type="file" onChange={getFile} accept="" />
           <button onClick={uploadToCloud}>Upload Picture</button>
           <div> Upload Progress: {percent}% </div>
           <button onClick={postToCloud}> Submit Post </button>
       </div>
   );
 }
 export default PostPg;