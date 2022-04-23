class snake{
   status; 
   body = [];
   move_requested = 0;


   prepare = function(){
        for (let index = 0; index < this.body.length; index++) {
            document.getElementById(this.body[index]).style.backgroundColor = setColorSnake();
        }
   }

   prepareMove = function(obj = this) {
    document.addEventListener("keydown", function (event) {
        switch (event.keyCode) {
           case 37:{ //Left key is pressed
                obj.stop();
                if( obj.status == "TO_RIGHT"){
                    break;
                }
                else{
                    obj.status = "TO_LEFT";
                    obj.move_requested = window.requestAnimationFrame(function(){
                        obj.move_left();
                    });   
                }
                break;
           }
           case 38:{ //Up key is pressed.
                obj.stop();
                if( obj.status == "TO_DOWN"){
                    break;
                }
                else{
                    obj.status = "TO_TOP";
                    obj.move_requested = window.requestAnimationFrame(function(){
                        obj.move_up();
                    });
                }
                break;
           }
           case 39:{//Right key is pressed.
                obj.stop();
                if( obj.status == "TO_LEFT"){
                    break;
                }
                else{
                    obj.status = "TO_RIGHT";
                    obj.move_requested = window.requestAnimationFrame(function(){
                        obj.move_right();
                    });
                }
                break;
           }
           case 40:{// Down key is pressed
                obj.stop();
                if( obj.status == "TO_TOP"){
                    break;
                }
                else{
                    obj.status = "TO_DOWN";
                    obj.move_requested = window.requestAnimationFrame(function(){
                        obj.move_down();
                    });
                }
                break;
           }
        }
     }); 
   }
   move_down = function(obj = this) {
        let head  = obj.body[obj.body.length-1];
        let x1 = parseInt( getX(head));
        let y1 = parseInt( getY(head));
        y1++;
        if(y1 == max_rows)
            y1 = 0;
        this.changeLocation(x1,y1);
        setTimeout(function() {
            //code here executed after $speed milesecond
            if(obj.status === 'TO_DOWN'){ 
                obj.move_requested = window.requestAnimationFrame(function(){
                    obj.move_down();
                });
            }
            else{
                obj.stop();
            }
        }, getLevelGame());        
    } 
    move_right = function(obj = this) {
        let head  = obj.body[obj.body.length-1];
        let x1 = parseInt( getX(head));
        let y1 = parseInt( getY(head));
        x1++;
        if(x1 == max_colums)
            x1 = 0;
        this.changeLocation(x1,y1);
        setTimeout(function() {
            if(obj.status === 'TO_RIGHT'){ 
                obj.move_requested = window.requestAnimationFrame(function(){
                    obj.move_right();
                });
            }
            else{
                obj.stop();
            }
        }, getLevelGame());
    } 
    move_left = function(obj = this) {
        let head  = obj.body[obj.body.length-1];
        let x1 = parseInt( getX(head));
        let y1 = parseInt( getY(head));
        x1--;
        if(x1 < 0)
            x1 = max_colums-1;  
        this.changeLocation(x1,y1);
        setTimeout(function() {
            if(obj.status === 'TO_LEFT'){ 
                obj.move_requested = window.requestAnimationFrame(function(){
                    obj.move_left();
                });
            }
            else{
                obj.stop();
            }
        }, getLevelGame());
    }
    move_up = function(obj = this) {
        let head  = obj.body[obj.body.length-1];
        let x1 = parseInt( getX(head));
        let y1 = parseInt( getY(head));
        y1--;
        if(y1 < 0)
            y1 = max_rows-1;   
        this.changeLocation(x1,y1);
        setTimeout(function() {
            if(obj.status === 'TO_TOP'){
                obj.move_requested = window.requestAnimationFrame(function(){
                    obj.move_up();
                }); 
            }
            else{
                obj.stop();
            }
        }, getLevelGame());
        
    }
    stop = function() {
        window.cancelAnimationFrame(this.move_requested);
    }
    stepToFront = function(x,y) {
        colorCell(x,y,setColorSnake());
        this.body.push(`cell_${x}_${y}`);
    }
    
    leaveFromBehind = function() {
        let tail_x = getX(this.body[0]);
        let tail_y = getY(this.body[0]);
        colorCell(tail_x, tail_y, setColorGameArea());
        this.body.shift();
    }

    changeLocation = function(x,y, obj = this) {
        if(obj.body.includes(`cell_${x}_${y}`)){
            swal("Good Luck !", ` your score is ${points} points `, "error");
            onloadGame();
        }
        else{
            this.stepToFront(x,y);
            let found_apple = document.getElementById(`cell_${x}_${y}`).getAttribute('data-found-apple');
            if(found_apple == 'N'){
                this.leaveFromBehind();
            }
            else{
                document.getElementById(`cell_${x}_${y}`).innerHTML = `&nbsp`;
                document.getElementById(`cell_${x}_${y}`).setAttribute('data-found-apple','N');
                points+= 2;
                document.getElementById("points").innerHTML = points;
                randomApple(obj.body);
            }
            if(points == 500  || points == 550 || points == 600 ){
                swal("Great Game", ` your score is ${points} points `, "success");
            }
        }
    }
    
}
   


