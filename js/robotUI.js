function RobotUI() {

    let base_image = new Image();
    base_image.src = 'img/AppBackground.png';

    //canvas size frère
    let canvasSize = null;

    //taille du tel ma gueule
    let phoneHeight;
    let phoneWidth;

    //position du telephone
    let phoneX;
    let phoneY;

    //position de l'écran
    let screenX;
    let screenY;

    //dimensesion de lécran
    let screenWidth;
    let screenHeight;

    //bodure du tel
    let phoneBorder;

    let isPhoneDispalyedBig = false;

    //number of snake killed
    let kill = 0;

    let activities = {"GamePaused" : 1, "GameOver" : 2}

    let isGamePaused = false;
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------

    this.incNumberOfKill = function () {
        kill++;
    };

    this.getRect = function () {
        return {x: phoneX, y: phoneY, width: phoneWidth, height: phoneHeight};
    };

    this.onHover = function () {
    };

    this.onClick = function (x, y) {
        if (!isPhoneDispalyedBig) {
            isPhoneDispalyedBig = true;
            isGamePaused = true;
        }
        else{
            if(isGamePaused){
                if(x>screenX +250 && x<screenX+650 && y >screenY+150 && y<screenY+250){
                    // alert("button resume");
                    isPhoneDispalyedBig = false;
                    isGamePaused = false;
                    game.unpause();
                }
                else if(x>screenX +250 && x<screenX+650 && y >screenY+300 && y<screenY+400){
                    // alert("button restart");
                    isPhoneDispalyedBig = false;
                    isGamePaused = false;
                    location.reload();
                }
            }
            else{ //game over
                //button replay
                if(x>screenX +250 && x<screenX+650 && y >screenY+300 && y<screenY+400){
                    // alert("button replay");
                    isPhoneDispalyedBig = false;
                    location.reload();
                }
            }
        }
    };

    this.onClickOutside = function (x, y) {
    };
    this.onKeyboard = function (key) {

    };
    this.update = function (delta) {
        // ...
    };
    this.render = function (delta) {
        if(game.isOver){
            isPhoneDispalyedBig=true;
            renderUi();
        }
        else if (!isPhoneDispalyedBig ) {
            renderShowUiButton();
        } else {
            renderUi();
        }
    };

    function renderUi() {
        let ctx = game.getContext();

        if (canvasSize == null) {
            canvasSize = game.getCanvasSize();
        }

        setDimensions();

        let cornerRadius = 30;

        //draw phone
        ctx.roundRect(phoneX, phoneY, phoneWidth, phoneHeight, cornerRadius);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fill();

        //draw screen
        if(isGamePaused){
            renderAppGamePaused();
        }else if (game.isOver){
            renderAppGameOver();
        }
        else{
            alert("Oupps Erreure");
        }


        //draw phone button
        ctx.beginPath();
        ctx.arc(phoneX + phoneBorder * 2 + screenWidth, phoneY + (phoneHeight / 2), 35, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
        ctx.fill();
    }

    function renderShowUiButton() {
        let ctx = game.getContext();

        if (canvasSize == null) {
            canvasSize = game.getCanvasSize();
        }

        setDimensions();

        let cornerRadius = 15;

        //draw phone
        ctx.roundRect(phoneX, phoneY, phoneWidth, phoneHeight, cornerRadius);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fill();

        //draw screen
        renderAppNumberOfKill();

        //draw phone home button
        ctx.beginPath();
        ctx.arc(phoneX + (phoneWidth / 2), phoneY + phoneBorder * 2 + screenHeight, 7.5, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
        ctx.fill();
    }


    function setDimensions() {
        if (isPhoneDispalyedBig) {
            phoneHeight = 600;
            phoneWidth = 1016;

            phoneX = (canvasSize.width - phoneWidth) / 2;
            phoneY = (canvasSize.height - phoneHeight) / 2;

            phoneBorder = 50;

            screenWidth = phoneWidth - (phoneBorder * 3);
            screenHeight = phoneHeight - (phoneBorder * 2);
        } else {
            phoneWidth = 105;
            phoneHeight = 150;

            phoneX = canvasSize.width - 20 - phoneWidth;
            phoneY = canvasSize.height - 20 - phoneHeight;

            phoneBorder = 13.5;

            screenWidth = phoneWidth - (phoneBorder * 2);
            screenHeight = phoneHeight - (phoneBorder * 3);
        }

        screenX = phoneX + phoneBorder;
        screenY = phoneY + phoneBorder;
    }


    function renderAppGamePaused() {
        let ctx = game.getContext();

        // background
        ctx.drawImage(base_image, screenX, screenY, screenWidth,screenHeight);

        //titre
        ctx.font = '50px serif';
        ctx.fillStyle = 'Black';
        ctx.fillText('Jeu en Pause', screenX + 320, screenY + 100);

        let buttonHeight = 100;
        let buttonWidth = 400;
        let buttonXOffset = 250;

        //button resume white background
        ctx.roundRect(screenX + buttonXOffset, screenY + 150, buttonWidth, buttonHeight, 25);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
        //button back border
        ctx.roundRect(screenX + buttonXOffset, screenY + 150, buttonWidth, buttonHeight, 25);
        ctx.strokeStyle = 'Black';
        ctx.stroke();
        //button resume text
        ctx.fillStyle = 'Black';
        ctx.fillText('Continuer', screenX + buttonXOffset+ 125, screenY + 210);

        //button Restart white background
        ctx.roundRect(screenX + buttonXOffset, screenY + 300, buttonWidth, buttonHeight, 25);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
        //button resume border
        ctx.roundRect(screenX + buttonXOffset, screenY + 300, buttonWidth, buttonHeight, 25);
        ctx.strokeStyle = 'Black';
        ctx.stroke();
        //button restart text
        ctx.fillStyle = 'Black';
        ctx.fillText('Recommencer', screenX + buttonXOffset+125, screenY + 360);

        //pause the game
        game.pause();
    }

    function renderAppGameOver() {
        let ctx = game.getContext();

        ctx.drawImage(base_image, screenX, screenY, screenWidth,screenHeight);

        //titre
        ctx.font = '50px serif';
        ctx.fillStyle = 'Black';
        ctx.fillText('Game Over', screenX + 340, screenY + 100);

        let buttonHeight = 100;
        let buttonWidth = 400;
        let buttonXOffset = 250;

        let bestScore = localStorage.getItem("bestScore");
        if(bestScore === null){
            bestScore = kill;
        }

        if(bestScore <= kill){
            localStorage.setItem("bestScore", kill);
        }

        //bestScore display
        ctx.font = '30px serif';
        ctx.fillStyle = 'Black';
        ctx.fillText('Best score : '+bestScore, screenX + screenWidth-250, screenY + 50);

        //score text
        ctx.font = '50px serif';
        ctx.fillStyle = 'Black';
        ctx.fillText('Score : '+kill, screenX + buttonXOffset+ 125, screenY + 210);

        //button Replay white background
        ctx.roundRect(screenX + buttonXOffset, screenY + 300, buttonWidth, buttonHeight, 25);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
        //button resume border
        ctx.roundRect(screenX + buttonXOffset, screenY + 300, buttonWidth, buttonHeight, 25);
        ctx.strokeStyle = 'Black';
        ctx.stroke();
        //button restart text
        ctx.fillStyle = 'Black';
        ctx.fillText('Rejouer', screenX + buttonXOffset+125, screenY + 360);

        //pause the game
        game.pause();
    }

    function renderAppNumberOfKill() {
        let ctx = game.getContext();

        ctx.roundRect(phoneX + phoneBorder, phoneY + phoneBorder, screenWidth, screenHeight, 7.5);
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fill();

        ctx.font = '30px serif';
        ctx.fillStyle = 'red';
        ctx.fillText('KILL', screenX + 5, screenY + 30);

        ctx.font = '50px serif';
        ctx.fillStyle = 'red';

        let numberOfKillOffset = 25;
        if (kill > 9) {
            numberOfKillOffset -= 10;
        }
        ctx.fillText(kill, screenX + numberOfKillOffset, screenY + 80);
    }
}


//display rounded rectangle on canvas
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
    return this;
}
