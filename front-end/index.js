let isSelectActivity = false


$('#search-activity').on('keyup', ()=>{
    let stop = false;
    activityList.forEach((activity)=>{
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

let activityList = ['surf', 'visite', 'bateau', 'visitons']

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