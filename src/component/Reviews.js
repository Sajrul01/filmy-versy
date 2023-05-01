import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef , db} from '../Firebase/Firebase';
import { addDoc, doc, updateDoc , query, where, getDocs} from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';


const Reviews = ({id,prevRating, userRated}) => {
    const useAppstate = useContext(Appstate);
    const navigate = useNavigate();
    const [rating , setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reviewsLoading , setReviewsLoading] = useState(false);
    const [form, setForm] = useState("");
    const [data, setData] = useState([]);
    const [newAdded, setNewAdded] = useState(0);

    const sendReview = async () => {
      setLoading(true);
        try{
            if(useAppstate.login){
            await addDoc(reviewsRef,{
                movieid: id,
                name: useAppstate.userName,
                rating: rating,
                thought: form,
                timestamp:new Date().getTime()
            })

            const ref = doc (db, "movies" , id);
            await updateDoc(ref,{
              rating: prevRating + rating,
              rated: userRated + 1


            })
            setRating(0);
            setForm("");
            setNewAdded(newAdded + 1);
            swal({
                title: "Review Sent",
                icon: "success",
                buttons: false,
                timer: 3000,
              })
            }else{
              navigate('/login')
            }
        }catch(error){
            swal({
                title: "error.message",
                icon: "error",
                buttons: false,
                timer: 3000,
              })

        }
        setLoading(false);
    }
   
    useEffect(() => {
      async function getData() {
        setReviewsLoading(true);
        setData([]);
        let quer = query (reviewsRef, where('movieid', '==' , id))
        const querySnapshot = await getDocs(quer);

        querySnapshot.forEach((doc) => {
          setData((prev) => [...prev, doc.data()])

        })

        setReviewsLoading(false);

      }
      getData();
    },[newAdded])


  return (
    <div className='mt-4  border-t-2 border-gray-700 w-full'>
        <ReactStars 
            size={30} 
            half={true} 
            value={rating}
            onChange={(rate) => setRating(rate)}
                
        />
        
        <input
          value={form}
          onChange={(e) => setForm(e.target.value)}
          placeholder= 'Share Your thoughts...'
          className='w-full p-2 outline-none header text-black'     
        /> 
        
        
        <button onClick={sendReview} className='bg-green-600 flex justify-center h-10 w-full p-2'>
            {loading ? <TailSpin height={20} color='red'/> : 'Share'}
        </button>
         
         {reviewsLoading ?
             <div className='mt-5 flex justify-center '><ThreeDots height={10} color='white'/></div>
  
             :

          <div className='mt-2 '> 
            {data.map((e,i) => {
                return(
                  <div className='bg-gray-900 mt-2 p-2 w-full ' key={i}> 
                     <div className='flex items-center'>
                        <p className='text-blue-500'> {e.name}</p>
                        <p className='text-pink-600 ml-2 text-xs'>({new Date (e.timestamp).toLocaleString()})</p>
                     </div>
                     <ReactStars 
                       size={30} 
                       half={true} 
                       value={e.rating}
                       edit={false}
                
                      />
                   
                    <p className='text-yellow-600'>{e.thought}</p>
                  </div>
                  
          
                )
            })}

          </div>

         }
            
        </div>
  )
}

export default Reviews
