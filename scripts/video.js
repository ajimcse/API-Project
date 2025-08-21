function getTimeString(time) {
    let hour = parseInt(time / 3600);
    let reminingSecont = time % 3600;
    let minute = parseInt(reminingSecont / 60);
    reminingSecont = reminingSecont % 60;
    return `${hour} hour ${minute} minute ${reminingSecont} second ago`
}

const loadCatigers = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCatigers(data.categories))
        .catch(error => console.log(error))
}
const removeActiveClass =() =>{
   const buttons =document.getElementsByClassName('category-btn')
   for(let btn of buttons){
    btn.classList.remove('active')
   }
}

const loadVides = (searthText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searthText}`)
        .then(res => res.json())
        .then(data => loadVideos(data.videos))
        .catch(error => console.log(error))
}

const loadCategoryVideos = (id) => {

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const activeBtn=document.getElementById(`btn-${id}`)
           activeBtn.classList.add("active")
            loadVideos(data.category)
        })
        .catch(error => console.log(error))

}
const loadDetalis = (videoid) =>{
    console.log(videoid);
}

// videos section
const loadVideos = (videos) => {
    const loadVideosContainer = document.getElementById('loadVideo')

    loadVideosContainer.innerHTML = ""
    if (videos.length == 0) {
        loadVideosContainer.classList.remove('grid')
        loadVideosContainer.innerHTML = `
       <div class='min-h-[600px] w-full flex flex-col gap-5 justify-center items-center'>

       <img  src="/assets/Icon.png" alt="" />
       <h2 class='text-center text-2xl font-bold' >NO CONTEN HEAR IN THIS CATEGORY</h2>
       </div>
       `;
        return;
    }
    else {
        loadVideosContainer.classList.add('grid')
    }

    videos.forEach((video) => {
        // console.log(video);
        const card = document.createElement('div')
        card.classList = 'card card-compact '
        card.innerHTML = `
    <figure class='h-[200px] relative'>
    <img 
     src=${video.thumbnail} 
     class='h-full w-full object-cover'
     alt="Shoes" />
     ${video.others.posted_date?.length == 0 ?
                "" : `
        <span class='absolute right-2 text-xs  bottom-2 text-white bg-black rounded p-1'>${getTimeString(video.others.posted_date)}</span>
        ` }
     </figure>
    <div class="px-0 py-2 flex gap-2">
      <div>
      <img  class='w-10 h-10 rounded-full object-cover' src="${video.authors[0].profile_picture} " alt="" />
      </div>
       <h2 class='font-bold'>${video.title}</h2>
       <div class='flex  items-center gap-2'>
       <p class='text-gray-400'>${video.authors[0].profile_name}</p> 
       ${video.authors[0].verified == true ?
                '<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />'
                : ""
            }
      </div>
        
      </div>
      <p> <button onclick='loadDetalis('${video.video_id}')' class='btn btn-sm btn-error'> details </button></p>
  </div>
  
    ` 

        loadVideosContainer.appendChild(card)
    })
}

// button section
const displayCatigers = (categories) => {
    const categoriesContiner = document.getElementById('categories')
    categories.forEach((item) => {
        console.log(item);
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id='btn-${item.category_id}' onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
          ${item.category}
        </button>
        `
        categoriesContiner.appendChild(buttonContainer)
    })
}

document.getElementById('seacrh-input').addEventListener('keyup', (e) =>{
  loadVides(e.target.value)
})
loadCatigers();
loadVides();

