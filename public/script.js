import * as THREE from "../three.js"

 //Global Game Variables and Objects
      let renderer = null
      let scene = null
      let camera = null
      let canvas = null
      
      let xSpeed = 0.5;
      let ySpeed = 0.5;
    
      let score1 = 0;
      let score2 = 0; 
      let gameScore = 3;
      
      let ballSpeedx = 7;
      let ballSpeedy = 2;
      
      let ball = null
      let field = null
      let paddleOne = null
      const courtLength = 1000
      const courtWidth = 2000
      
      let ballMaterial;
      
      draw();
    
      function draw() {
        //RENDERER
        canvas = document.getElementById("canvas");
        renderer = new THREE.WebGLRenderer({ canvas: canvas });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
        
        

        //CAMERA
        camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);

        //SCENE
        scene = new THREE.Scene();

        //LIGHTS
        var light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);
        
        var light1 = new THREE.PointLight(0xffffff, 0.5);
        scene.add(light1);
      
        drawGame();

        //RENDER LOOP
        requestAnimationFrame(render);
        
        function render() {
          renderer.render(scene, camera);
          requestAnimationFrame(render);
          
          document.addEventListener("keydown", paddleOneMovement, false);
          document.addEventListener("keydown", paddleTwoMovement, false);
          ballMovement();
          collisionManagement()
        }
        
      }
      
      //Draw game objects and add them to the scene
      function drawGame() {
        
        //Draw Ball
        let ballGeometry = new THREE.SphereGeometry(30, 100, 100);
        ballMaterial = new THREE.MeshLambertMaterial({color: 0xF0D467});
        
        //Draw Paddle
        let paddleGeometry = new THREE.BoxGeometry(50, 200, 50);
        let paddleOneMaterial = new THREE.MeshLambertMaterial({color: 0x6773F0});
        let paddleTwoMaterial = new THREE.MeshLambertMaterial({color: 0x68D98A});
        
        //Draw red part of the table
        let fieldGeometry = new THREE.PlaneGeometry(courtWidth*0.95, courtLength, 10, 10);
        let fieldMaterial = new THREE.MeshLambertMaterial({color: 0xFF4045});
        
        //Draw the grey outer layer
        let tableGeometry = new THREE.BoxGeometry(courtWidth*1.03, courtLength*1.15, 100);
        let tableMaterial = new THREE.MeshLambertMaterial({color: 0x2B2B2B});
        
        
        paddleOne = new THREE.Mesh(paddleGeometry, paddleOneMaterial);
        paddleTwo = new THREE.Mesh(paddleGeometry, paddleTwoMaterial);
        ball = new THREE.Mesh(ballGeometry, ballMaterial);
        field = new THREE.Mesh(fieldGeometry, fieldMaterial);
        table = new THREE.Mesh(tableGeometry, tableMaterial);
        
        //Set the starting position for each game object when a new game begins
        ball.position.set(0, 0, -950);
        paddleOne.position.set(-courtWidth/2 + 50, 0, -950);
        paddleTwo.position.set(courtWidth/2 - 50, 0, -950);
        field.position.set(0, 0, -995);
        table.position.z = -1050;
        
        //Add the game objects to the scene
        scene.add(ball);
        scene.add(paddleOne);
        scene.add(paddleTwo)
        scene.add(field);
        scene.add(table);
        
        
      }
      
      //Keyboard inputs for paddle 1 based on key codes
      function paddleOneMovement(event) {
          
        let keyCode = event.which;
          
        if(keyCode === 87) {
          
          if(paddleOne.position.y <= courtLength/2.7) { 
            paddleOne.position.y += ySpeed * 75;
          }
          
        }
        else if(keyCode === 83) {
          if(paddleOne.position.y >= -courtLength/2.7) {
            paddleOne.position.y -= ySpeed * 75;
          }    
        }
        else if(keyCode === 32) {//Added play instructions in this function 
          window.alert("Hello, Welcome to 3D pong. Player 1 use w and s to move your paddle. Player 2 use up and down arrow keys to move. Use the left and right arrow keys to change the speed of the ball. Enjoy! (Game still has a lot of work needed")
        }
        else if(keyCode === 39) {//Use arrow keys to change the speed/direction of the ball
          ballSpeedx += 0.5
          ballSpeedy += 0.5
        }
        else if(keyCode === 37) {
          ballSpeedx -= 0.5
          ballSpeedy -= 0.5
        }
        
      }
      
      //Keyboard inputs for paddle 2 based on key codes     
      function paddleTwoMovement(event) {
          
        let keyCode = event.which;
          
        if(keyCode === 38) {
          
          if(paddleTwo.position.y <= courtLength/2.7) { 
            paddleTwo.position.y += 150 * ySpeed;
          }
          
        }
        else if(keyCode === 40) {
          if(paddleTwo.position.y >= -courtLength/2.7) {
            paddleTwo.position.y -= 150 * ySpeed;
          }
        }
        
        
        
      }
      
      /*Ball physics that determines how the ball collides with the edges
      and what happens when the ball flies off either end
      */
      function ballMovement() {
        
        //Start the ball moving.
        ball.position.y += ballSpeedy
        ball.position.x += ballSpeedx
        
        //Collision logic with the edges of the court
        if(ball.position.y >= courtLength/2) {
           ballSpeedy = -ballSpeedy 
        }
        
        if(ball.position.y <= -courtLength/2) {
           ballSpeedy = -ballSpeedy 
        }
   
        //Logic for when the ball flies off either end and also update the score
        if(ball.position.x <= paddleOne.position.x - 250) {
          
          ball.position.x = 0
          ball.position.x = 0
          
          score1++;
          
          document.getElementById("score2").innerHTML = score1;   
          
          if(score1 >= gameScore) {
            ballSpeedy = 0;
            ballSpeedx = 0;
            
            window.alert("Player 2 wins. Reload the page to restart the game.")
          }
          
        }
        
        if(ball.position.x >= paddleTwo.position.x + 250) {
          
          ball.position.x = 0
          ball.position.x = 0
          
          score2++;
          
          document.getElementById("score1").innerHTML = score2; 
          
          if(score2 >= gameScore) {
            ballSpeedy = 0;
            ballSpeedx = 0;
            
            window.alert("Player 1 wins. Reload the page to restart the game.")
          }
          
        }
    
      }
      
      //Collision logic between the ball and the paddles
      function collisionManagement() {
        
        if(ball.position.x >= paddleTwo.position.x - 30 && ball.position.y <= (paddleTwo.position.y + 40) && ball.position.y >= (paddleTwo.position.y - 40)) {
          ballSpeedy = -ballSpeedy
          ballSpeedx = -ballSpeedx
        }
        
        if(ball.position.x <= paddleOne.position.x + 30 && ball.position.y <= (paddleOne.position.y + 40) && ball.position.y >= (paddleOne.position.y - 40)) {
          ballSpeedy = -ballSpeedy
          ballSpeedx = -ballSpeedx
        }
        
      }
      
 

