let isSelectActivity = false;
const BASE_URL = "http://127.0.0.1:8081/";
let activityList = [];
let activityNameList = []
const activity_container = document.getElementById('results-list');

window.onload = getAllActivities();


function getAllActivities(){
    $.get(BASE_URL, (data)=>{
        const activities = []
        data.forEach((activity)=>{
            activities.push(activity);
        });
        activityList = activities;
        displayActivity(activityList);
    });
    
}

function getActivityListByCategory(category){
    $.get(`${BASE_URL}categories/${category}`, (data)=>{
        const activities = []
        data.forEach((activity)=>{
            activities.push(activity);
        });
        activityList = activities;

        displayActivity(activityList);
    });
}

$('#search-btn').on('click', (e)=>{
e.preventDefault();
const title_width_space = $('#search-activity').val();
const title = title_width_space.replace(/\s+/g, '');
$.get(`${BASE_URL}title/${title}`, (data)=>{
    const activity = data
    activityList = [];
    activityList.push(activity);
    displayActivity(activityList);
});})


function displayActivity(activityList){
    activity_container.innerHTML = '';
    
    activityList.forEach((activity)=>{
        let li_activity = document.createElement('li');
        let title = document.createElement('h2');
        let description = document.createElement('p');
        let img = document.createElement('img');
        let link = document.createElement('a');

        title.textContent = activity.title;
        description.textContent = activity.description;
        img.src = activity.img;
        link.href = activity.link;
        link.textContent = activity.link;

        li_activity.appendChild(title);
        li_activity.appendChild(description);
        li_activity.appendChild(img);
        li_activity.appendChild(link);

        activity_container.appendChild(li_activity);
        updateNameList();
    })
}


function updateNameList(){
    let nameList = [];
    activityList.forEach((activity)=>{
        nameList.push(activity.title);
    })
    activityNameList = nameList;
}


// ----------- barre de recherche ----------------------

$('#search-activity').on('keyup', ()=>{
    let stop = false;
    activityNameList.forEach((activity)=>{
        let val = selectWords(activity, $('#search-activity').val());
        if(!stop){
            if(val !== ''){
                $('#display-real-time').text(activity);
                stop = true;
            }
                
            if(val === ''){
                $('#display-real-time').text('');
            }
        }   
           
    });
   
})


function selectWords(activity, inputValue){

    let value = '';

    if(inputValue.length > activity.length){
        return '';
    }

    if(inputValue.length < 3){
        value = '';
    }else{
        for(let i = 0; i< inputValue.length; i++){
            if(inputValue.charAt(i) === activity.charAt(i)){
                value += inputValue.charAt(i);
            }else{
                value = '';
            }
        }    
    }
    return value;
}