
function preload() {
    window.addEventListener('load',()=>{
        setTimeout(() => {
            const preload = document.querySelector('.preload');
            preload.classList.add('preload-finish');
            document.querySelector('#onload').style.opacity = 1 ;
            onloadGame();     
        }, preload_time);  
    });
}

function onloadGame(){
    let new_snake = null;
    $(`#play-btn`).click(function () {
        getBestResult("DB/best_result.json");
        resetPlayerPoints();
        setGameTime();
        setColorGameArea();
        setColorSnake();
        setGameArea();
        new_snake = new snake();
        new_snake.body = ['cell_1_15','cell_2_15','cell_3_15'];
        new_snake.prepare();
        new_snake.prepareMove();
        randomApple(new_snake.body);
        if($(`#audio-btn`).hasClass('fa-volume-up'))
           controlByBackgroundTune("RUN");
    });
    $(`#setting-btn`).click(function() {
        if(new_snake !== null){
            new_snake.stop();
            new_snake.body = [];
            new_snake = null
            points = 0;
        }
    });
    $(`#setting-btn`).click();
    audio_background.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    $(`#audio-btn`).click(function () {
        controlByBackgroundTune();
    });
    $(`#main-sound-btn`).click(function () {
        controlByBackgroundTune();
    });
}

function getBestResult(file) {
    let x = new XMLHttpRequest();
    x.open('GET',file);
    x.onload = function(){
       let data = JSON.parse(x.responseText);
       best_result = data.result;
       document.getElementById(`best_result`).innerHTML = best_result +' Points';
    }
    x.send();
}

function setBestResult(url) {
}

function setGameTime() {
    timer = 0;
    window.requestAnimationFrame(getGameTime);
}


function controlByBackgroundTune(action) {
    if(audio_background.paused || action == 'RUN') {
        audio_background.play();
        $(`#audio-btn`).removeClass('fa-volume-off');
        $(`#audio-btn`).addClass('fa-volume-up');
        $(`#main-sound-btn`).removeClass('fa-volume-off');
        $(`#main-sound-btn`).addClass('fa-volume-up');
    }
    else{
        audio_background.pause();
        $(`#audio-btn`).removeClass('fa-volume-up');
        $(`#audio-btn`).addClass('fa-volume-off');
        $(`#main-sound-btn`).removeClass('fa-volume-up');
        $(`#main-sound-btn`).addClass('fa-volume-off');
    }
}
function randomApple(body_snake) {
    let found = false;
    let position = null;
    let x = -1;
    let y = -1;
    do{
        x = Math.floor(Math.random()* max_colums);
        y = Math.floor(Math.random()* max_rows);
    }while (body_snake.includes(`cell_${x}_${y}`));
    let apple = document.createElement("img");
    apple.setAttribute('src', 'image/apple_3.jpg');
    apple.setAttribute('alt', 'apple-photo');
    apple.setAttribute('height', '30px');
    apple.setAttribute('width', '30px');
    document.getElementById(`cell_${x}_${y}`).appendChild(apple); 
    document.getElementById(`cell_${x}_${y}`).setAttribute('data-found-apple','Y');
}

function getX(str){
    let result = [];
    if(typeof str == 'string')
        result = str.split("_");
    return ((result.length >1)? result[1] : '');
}

function getY(str){
    let result = [];
    if(typeof str == 'string')
        result = str.split("_");
    return ((result.length >2)? result[2] : '');
}

function colorCell(x,y,color){
    document.getElementById(`cell_${x}_${y}`).style.backgroundColor = color;
}

function setGameArea() {
      
    var myTableDiv = document.getElementById(play_area_container);
      
    var table = document.createElement('TABLE');
    table.border='1';
    table.rules ='none';
    table.style.backgroundColor = color_game_area;

    
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
      
    for (var y=0; y<max_rows; y++){
       var tr = document.createElement('TR');
       tr.style.height = tr_height+'px';
       tableBody.appendChild(tr);
       for (var x=0; x<max_colums; x++){
           var td = document.createElement('TD');
           td.style.width = td_width+'px';
           td.style.border = 0;
           td.style.borderColor = color_game_area;
           td.style.borderRadius = '25%';    
           td.innerHTML = `&nbsp;`
           td.setAttribute('data-x',x);
           td.setAttribute('data-y',y);
           td.setAttribute('data-found-apple','N');
           td.id = `cell_${x}_${y}`;
           tr.appendChild(td);
       }
    }
    myTableDiv.innerHTML = '';
    myTableDiv.appendChild(table);
    return table;
    
}

function getGameTime(currentTime) {
    timer_temp = timer;
    m = timer_temp / 60;
    s = timer_temp % 60;
    document.getElementById(`timer`).innerHTML = Math.floor(m)+":"+s;
    document.getElementById(`points`).innerHTML = points;
    window.requestAnimationFrame(getGameTime);
    const secound_since_last_render = (Date.now() - last_render_time) / 1000;
    if(secound_since_last_render < 1)
          return;
    timer++;
    last_render_time = Date.now();
}

function getLevelGame(){
    let radios = document.getElementsByName('game_level');
    let speed = 0;
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            if(radios[i].value == 'easy'){
                speed = 1000;
            }
            else if(radios[i].value == 'medium'){
                speed = 500;
            }
            else if(radios[i].value == 'hard'){
                speed = 200;
            }
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    return speed;
}

function setColorGameArea() {
   let color =  document.getElementById(`color_game_area`).value;
   color_game_area = color;
   return color_game_area;
}

function setColorSnake(params) {
    let color =  document.getElementById(`color_snake`).value;
    color_snake = color;
    return color_snake;
}


function resetPlayerPoints() {
    points = 0;
    document.getElementById(`points`).value = points;
}

