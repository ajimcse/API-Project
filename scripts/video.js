function getTimeString(time){
   let hour= parseInt(time /3600);
   let reminingSecont=time % 3600;
   let minute=parseInt(reminingSecont /60);
   reminingSecont =reminingSecont % 60;
   return `${hour} hour ${minute} minute ${reminingSecont} second ago`
}



const loadCatigers = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCatigers(data.categories))
        .catch(error => console.log(error))
}


const loadVides = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => loadVideos(data.videos))
        .catch(error => console.log(error))
}

const loadVideos = (videos) => {
    const loadVideosContainer = document.getElementById('loadVideo')
    console.log(videos);
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement('div')
        card.classList = 'card card-compact '
        card.innerHTML = `
    <figure class='h-[200px] relative'>
    <img 
     src=${video.thumbnail} 
     class='h-full w-full object-cover'
     alt="Shoes" />
     ${
        video.others.posted_date?.length ==0?
         ""
        :`
        <span class='absolute right-2 bottom-2 text-white bg-black rounded p-1'>${getTimeString(video.others.posted_date)}</span>
        `
     }
     
     </figure>
    
  <div class="px-0 py-2 flex gap-2">
      <div>
      <img  class='w-10 h-10 rounded-full object-cover' src="${video.authors[0].profile_picture} " alt="" />
      </div>
      <h2 class='font-bold'>${video.title}</h2>
      
      <div class='flex  items-center gap-2'>
  
      <p class='text-gray-400'>${video.authors[0].profile_name}</p> 
       ${
        video.authors[0].verified == true ? 
        '<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />'
        :""

       }
      </div>
    
     
      <div>
      </div>
  </div>
    `
        loadVideosContainer.appendChild(card)
    })
}


const displayCatigers = (categories) => {
    const categoriesContiner = document.getElementById('categories')

    categories.forEach((item) => {
        console.log(item);
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category
        categoriesContiner.appendChild(button)

    })


}
loadCatigers();
loadVides();











//  for(const ittm of categories){
//     //   console.log(ittm.category);
//     const  button =document.createElement('button');
//     button.classList='button';
//     button.innerText =ittm.category;
//     categoriesContiner.appendChild(button)

//     }

// const loadVideos = (videos) => {
//     const loadVideosContainer = document.getElementById('loadVideo')
//     for (const video of videos) {
//         console.log(video);
//         const card = document.createElement('div');
//         card.classList = 'card card-compact '
//         card.innerHTML = `

//   <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
//   <div class="card-body">
//     <h2 class="card-title">Shoes!</h2>
//     <p>If a dog chews shoes whose shoes does he choose?</p>
//     <div class="card-actions justify-end">
//       <button class="btn btn-primary">Buy Now</button>
//     </div>
//   </div>


//         `

//     }
// loadVideosContainer.appendChild(card)


// }

// {
//   "status": true,
//   "message": "successfully fetched all the videos",
//   "videos": [
//     {
//       "category_id": "1001",
//       "video_id": "aaaa",
//       "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//       "title": "Shape of You",
//       "authors": [
//         {
//           "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//           "profile_name": "Olivia Mitchell",
//           "verified": ""
//         }
//       ],
//       "others": {
//         "views": "100K",
//         "posted_date": "16278"
//       },
//       "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
//     },