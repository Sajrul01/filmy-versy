import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import ReactStars from "react-stars";
import { moviesRef } from "../Firebase/Firebase";
import { Link } from "react-router-dom";

const Card = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((prv) => [...prv, {...(doc.data()), id: doc.id}])
      });

      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="flex flex-wrap justify-between p-3 mt-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          {" "}
          <Rings height={600} color="white" />
        </div>
      ) : (
        data.map((e, i) => {
          return (
            <Link to= {`/detail/${e.id}`}> <div
              key={i}
              className="bg-gray-900 shadow-lg p-2 hover:-translate-y-1 mt-3 transition-all duration-500"
            >
              <img className="h-60 md:h-72" src={e.image} />

              <h1>
                <span className="text-blue-500"> Name: </span> {e.title}
              </h1>
              <h1 className="flex items-center">
                {" "}
                <span className="text-blue-500"> Rating: </span>
                <ReactStars 
                size={20} 
                half={true} 
                value={e.rating/e.rated} 
                edit={false} 
                />
              </h1>
              <h1>
                <span className="text-blue-500">Year: </span> {e.year}
              </h1>
            </div>
            </Link>
            
          );
        })
      )}
    </div>
  );
};

export default Card;
