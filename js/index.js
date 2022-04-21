snake = [];
max_colums = 20;
max_rows = 20;
let last_render_time = Date.now();
const speed = 1;
points = 0;
timer = 0;
audio_background = new Audio('audio/Summer-Tropical-House-HEAVEN.mp3');
preload();

function preload() {
   
    window.addEventListener('load',()=>{
        setTimeout(() => {
            const preload = document.querySelector('.preload');
            preload.classList.add('preload-finish');
            document.querySelector('#onload').style.opacity = 1 ;
            init();     
        }, 4000);  
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

function setBestResult(file) {
    let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", file);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({"result" : "220"}));
}

function init(){
    setBestResult("DB/best_result.json");
    getBestResult("DB/best_result.json");
    window.requestAnimationFrame(main);
    addTable('play_area',max_colums,max_rows,25,25); 
    snake = ['cell_1_15','cell_2_15','cell_3_15'];
    for (let index = 0; index < snake.length; index++) {
        document.getElementById(snake[index]).style.backgroundColor="black";    
    }
    randomApple();
    $(`#setting-btn`).click();
    $(`#play-btn`).click(function () {
        if($(`#audio-btn`).hasClass('fa-volume-up'))
           controlByBackgroundTune("RUN");
    });
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
    document.addEventListener("keydown", function (event,currentTime) {
        switch (event.keyCode) {
           case 37:{
                movement.stop();
                let head  = snake[snake.length-1];
                let x1 = parseInt( getX(head));
                let y1 = parseInt( getY(head));
                window.requestAnimationFrame(function(){
                    movement.toTop(x1,y1,0,y1);
                });   
                console.log("Left key is pressed.");
                break;
           }
           case 38:{
                movement.stop();
                let head  = snake[snake.length-1];
                let x1 = parseInt( getX(head));
                let y1 = parseInt( getY(head));
                window.requestAnimationFrame(function(){
                    movement.toTop(x1,y1,x1,0);
                });
                console.log("Up key is pressed.");
                break;
           }
           case 39:{
                movement.stop();
                let head  = snake[snake.length-1];
                let x1 = parseInt( getX(head));
                let y1 = parseInt( getY(head));
                window.requestAnimationFrame(function(){
                    movement.toTop(x1,y1,max_colums,y1);
                });
                console.log("Right key is pressed.");
                break;
           }
           case 40:{
                movement.stop();
                let head  = snake[snake.length-1];
                let x1 = parseInt( getX(head));
                let y1 = parseInt( getY(head));
                window.requestAnimationFrame(function(){
                    movement.toButtom(x1,y1,x1,max_rows);
                });
                console.log("Down key is pressed.");
                break;
           }
        }
     }); 
    
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
function randomApple() {
    let found = false;
    let position = null;
    let x = -1;
    let y = -1;
    do{
        x = Math.floor(Math.random()* max_colums);
        y = Math.floor(Math.random()* max_rows);
    }while (snake.includes(`cell_${x}_${y}`));
    let apple = document.createElement("img");
    apple.setAttribute('src', 'image/apple_3.jpg');
    apple.setAttribute('alt', 'apple-photo');
    apple.setAttribute('height', '30px');
    apple.setAttribute('width', '30px');
    document.getElementById(`cell_${x}_${y}`).appendChild(apple); 
    document.getElementById(`cell_${x}_${y}`).setAttribute('data-found-apple','Y');
}

function getX(str){
    let result = str.split("_");
    return result[1];
}

function getY(str){
    let result = str.split("_");
    return result[2];
}

function colorCell(x,y,color){
    document.getElementById(`cell_${x}_${y}`).style.backgroundColor = color;
}

var movement = {

    movement_requested : 0,

    toRight: function(x1,y1,x2,y2) {
        x1++;
        if(x1 < x2){   
            // console.log("from = "+ timer)
            popPushSnake(x1,y1);
            // console.log("to = "+ timer)
            // const secound_since_last_render = (Date.now() - last_render_time)/1000;
            // console.log("sec = "+ secound_since_last_render)
           

            // if(secound_since_last_render < 0.5/speed)  
            //       return;
            // last_render_time = Date.now();    
            this.movement_requested = window.requestAnimationFrame(function(){
                movement.toRight(x1,y1,x2,y2);
            });

           
        }
    }, 
    toLeft: function(x1,y1,x2,y2) {
        x1--;
        if(x1 >= x2){   
            popPushSnake(x1,y1);
            // const secound_since_last_render = (Date.now() - last_render_time) / 1000;
            // if(secound_since_last_render < 1/speed)  
            //       return;
            // last_render_time = Date.now();     
        }
        movement_requested = window.requestAnimationFrame(function(){
            movement.toLeft(x1,y1,x2,y2);
        });
    }, 
    toTop: function(x1,y1,x2,y2) {
        y1--;
        if(y1 >= y2){   
            popPushSnake(x1,y1);
            // const secound_since_last_render = (Date.now() - last_render_time) / 1000;
            // if(secound_since_last_render < 1/speed)  
            //       return;
            // last_render_time = Date.now();     
        }
        movement_requested = window.requestAnimationFrame(function(){
            movement.toTop(x1,y1,x2,y2);
        });
    }, 
    toButtom: function(x1,y1,x2,y2) {
        y1++;
        if(y1 < y2){   
            popPushSnake(x1,y1);
            // const secound_since_last_render = (Date.now() - last_render_time) / 1000;
            // if(secound_since_last_render < 1/speed)  
            //       return;
            // last_render_time = Date.now();     
        }
        movement_requested = window.requestAnimationFrame(function(){
            movement.toButtom(x1,y1,x2,y2);
        });
    }, 
    stop:function() {
        window.cancelAnimationFrame(this.movement_requested);
    }

}

function pushSnake(x,y) {
        colorCell(x,y,'black');
        snake.push(`cell_${x}_${y}`);
    // console.log('push = '+`cell_${x}_${y}`); 
}

function popSnake() {
        let tail_x = getX(snake[0]);
        let tail_y = getY(snake[0]);
        colorCell(tail_x, tail_y, 'green');
        snake.shift();
    // console.log('pop = '+`cell_${tail_x}_${tail_y}`);
}

function popPushSnake(x,y) {
    if(snake.includes(`cell_${x}_${y}`)){
        swal("Good Luck !", ` your score is ${points} points `, "error");
        points=0;
        document.getElementById(`points`).innerHTML = points;
        init();
    }
    else{
        pushSnake(x,y);
        let found_apple = document.getElementById(`cell_${x}_${y}`).getAttribute('data-found-apple');
        if(found_apple == 'N'){
            popSnake();
        }
        else{
            document.getElementById(`cell_${x}_${y}`).innerHTML = `&nbsp`;
            document.getElementById(`cell_${x}_${y}`).setAttribute('data-found-apple','N');
            points+= 2;
            document.getElementById("points").innerHTML = points;
            randomApple();
        }
    }
    if(points == 500  || points == 550 || points == 600 ){
        swal("Great Game", ` your score is ${points} points `, "success");
    }
}

function addTable(id_container,rows_number,colums_number,td_width,tr_height) {
      
    var myTableDiv = document.getElementById(id_container);
      
    var table = document.createElement('TABLE');
    table.border='1';
    table.rules ='none';
    table.style.backgroundColor =`green`;

    
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
      
    for (var y=0; y<rows_number; y++){
       var tr = document.createElement('TR');
       tr.style.height = tr_height+'px';
       tableBody.appendChild(tr);
       for (var x=0; x<colums_number; x++){
           var td = document.createElement('TD');
           td.style.width =td_width+'px';
           td.style.borderColor = "green";
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





function main(currentTime) {
    timer_temp = timer;
    m = timer_temp / 60;
    s = timer_temp % 60;


    document.getElementById(`timer`).innerHTML = Math.floor(m)+":"+s;
    window.requestAnimationFrame(main);
    
    // console.log("cu "+ Date.now())
    const secound_since_last_render = (Date.now() - last_render_time) / 1000;
    // console.log("secound_since_last_render : "+secound_since_last_render)
    if(secound_since_last_render < 1)
          return;
    console.log("render");
    timer++;
    last_render_time = Date.now();

}


