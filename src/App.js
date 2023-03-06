import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([])
  useEffect(()=> {
    const params = {
      method: "flickr.photos.search",
      api_key: "fee7e9dbed4d5ec906fac4a3bca155e4",
      text: searchText,
      sort: "",
      per_page: 80,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }
const parameters = new URLSearchParams(params);
const url = `https://api.flickr.com/services/rest/?${parameters}`
axios.get(url).then((resp)=> {
  console.log(resp.data)
  const arr = resp.data.photos.photo.map((imgData)=> {
    return fetchFlickrImageUrl(imgData, 'q');
  });
  setImageData(arr);
}).catch(()=> {

}).finally(()=> {

})

}, [searchText])
const fetchFlickrImageUrl = (photo, size)=> {

let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
if(size) {
  url += `_${size}`
}
url += '.jpg'
return url
}
return (
<>
<input onChange={(e)=> {searchData.current = e.target.value} }/>
<button onClick={()=> {setSearchText(searchData.current)}}>Search</button>
<section>
  <button onClick={()=> {setSearchText("mountains")}}>Mountains</button>
  <button onClick={()=> {setSearchText("beaches")}}>Beaches</button>
  <button onClick={()=> {setSearchText("birds")}}>Birds</button>
  <button onClick={()=> {setSearchText("food")}}>Food</button>
</section>
<section className='image-container'>
  
    {imageData.map((imageurl, key)=> {
      return (
        <article className='flickr-image'>
          <img src={imageurl} key={key}/>
        </article>
      )
      
    })}
  
</section>
</>
);
}

export default App;
