/**
 * This script is responsible for handling the front-end functionality of the Montpelier Search Engine.
 * It retrieves activity data from a server and displays it on the webpage.
 * 
 * @requires jQuery
 */

/**
 * Flag to indicate if an activity is selected.
 * @type {boolean}
 */
let isSelectActivity = false;

/**
 * The base URL of the server.
 * @type {string}
 */
const BASE_URL = "http://127.0.0.1:8001/";

/**
 * An array to store all the activities retrieved from the server.
 * @type {Array}
 */
let activityList = [];

/**
 * An array to store the names of the activities.
 * @type {Array}
 */
let activityNameList = [];

/**
 * The container element to display the activity results.
 * @type {HTMLElement}
 */
const activity_container = document.getElementById('results-list');

/**
 * Function to be executed when the window is loaded.
 * It retrieves all activities from the server and displays them.
 */
window.onload = getAllActivities();

/**
 * Retrieves all activities from the server and updates the activity list.
 */
function getAllActivities(){
    $.get(BASE_URL, (data)=>{
        const activities = [];
        data.forEach((activity)=>{
            activities.push(activity);
        });
        activityList = activities;
        displayActivity(activityList);
    });
}

/**
 * Retrieves activities by category from the server and updates the activity list.
 * 
 * @param {string} category - The category of activities to retrieve.
 */
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

/**
 * Event listener for the search button click event.
 * It retrieves activities by title from the server and updates the activity list.
 * 
 * @param {Event} e - The click event object.
 */
$('#search-btn').on('click', (e)=>{
    e.preventDefault();
    const title_width_space = $('#search-activity').val();
    const title = title_width_space.replace(/\s+/g, '');
    $.get(`${BASE_URL}title/${title}`, (data)=>{
        const activity = data
        activityList = [];
        activityList.push(activity);
        displayActivity(activityList);
    });
});

/**
 * Displays the activities in the activity container.
 * 
 * @param {Array} activityList - The list of activities to display.
 */
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
    });
}

/**
 * Updates the activity name list based on the activity list.
 */
function updateNameList(){
    let nameList = [];
    activityList.forEach((activity)=>{
        nameList.push(activity.title);
    });
    activityNameList = nameList;
}

/**
 * Event listener for the keyup event on the search activity input field.
 * It displays the real-time search results based on the input value.
 */
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
});

/**
 * Selects matching words between the activity title and the input value.
 * 
 * @param {string} activity - The activity title.
 * @param {string} inputValue - The input value to match against.
 * @returns {string} - The matching words.
 */
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


