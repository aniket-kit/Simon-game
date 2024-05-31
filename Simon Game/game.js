let gamePattern=[]
let buttonColours=['red','blue','green','yellow']
let level=0
let started=false

$(document).on('keypress',function () {
    if(!started){
        // $('#level-title').text('level '+level)
        nextSequence()
        started=true
    }
})

function playSound(name) {
    let audio=new Audio('sounds/'+name+'.mp3')
    audio.play()
}

function nextSequence(){
    userClickedPattern=[]
    let randomNumber=Math.floor(Math.random()*4)
    let randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100)
    // let audio=new Audio('sounds/'+randomChosenColour+'.mp3')
    // audio.play()
    playSound(randomChosenColour)
    level+=1
    $('#level-title').text('level '+level)
}

let userClickedPattern=[]
$('.btn').on('click',function(){
    let userChosenColour=$(this).attr('id')
    userClickedPattern.push(userChosenColour)
    // let audio2=new Audio('sounds/'+userChosenColour+'.mp3')
    // audio2.play()
    animatePress(userChosenColour)
    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})

function animatePress(currentColour) {
    $('#'+currentColour).addClass('pressed')
    setTimeout(function () {
        $('#'+currentColour).removeClass('pressed')
    },100)
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log('sucess')
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence()
            },1000)
        }
    }else{
        console.log('wrong');
        playSound('wrong')
        $("body").addClass('game-over')
        setTimeout(function () {
            $('body').removeClass('game-over')
        },200)
        $('level-title').text('game over,press any to restart')
        startOver()
    }
}
function startOver() {
    level=0
    gamePattern=[]
    started=false
}