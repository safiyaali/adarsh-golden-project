class Game 
{
  constructor()
  {
    
  }

  getState()
  {
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){gameState = data.val();})
  }

  update(state)
  {
    database.ref('/').update({gameState: state});
  }

  async start()
  {
    if(gameState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists())
      {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  match1()
  {
    this.throwBall();
    if(allPlayers[0].score>allPlayers[1].score)
    {
      allPlayers[0].gameState = 2;
      allPlayers[1].gameState = 3;
      Array.splice(allPlayers[1]);
    }
    else if (allPlayers[1].score>allPlayers[0].score)
    {
      allPlayers[1].gameState = 2;
      allPlayers[0].gameState = 3;
      Array.splice(allPlayers[0]);
    }
  }

  match2()
  {
    this.throwBall();
    if(allPlayers[2].score>allPlayers[3].score)
    {
      allPlayers[2].gameState = 2;
      allPlayers[3].gameState = 3;
      Array.splice(allPlayers[3]);
    }
    else if (allPlayers[3].score>allPlayers[2].score)
    {
      allPlayers[3].gameState = 2;
      allPlayers[2].gameState = 3;
      Array.splice(allPlayers[2]);
    }
  }

  restart()
  {
    ball.x = displayWidth/2;
    ball.y = displayHeight/2;
  }

  throwBall()
  {
    for(i=0;i<5;i++)
    {
      if(keyCode===75)
      {
        rand1 = Math.random(5,10);
        rand2 = Math.random(5,-5);
        ball.velocityX = rand1;
        ball.velocityY = rand2;
      }
      if(goalKeeper.isTouching(ball))
      {
        ball.velocityX = 0;
        ball.velocityY = 0;
        player.score+=1;
        if(keyCode===32)
        {
        restart();
        }
      }
      else
      {
        if(keyCode===32)
        {
        restart();
        }
      }
    }
  }

  play()
  {
    form.hide();
    Player.getPlayerInfo();
    
    if(allPlayers!== undefined)
    {
      var index=0;
      background("bg",backgroundImage);
      var goalKeeper = createSprite(200,200);
      goalKeeper.addImage("gk",goalKeepingGloves);
      goalKeeper.x = world.mouseX;
      goalKeeper.y = world.mouseY;
      for (var plr in allPlayers){
        
      }
      this.match1();
      this.match2();
    }
    drawSprites();
  }

  finals()
  {
    this.throwBall();
    if(allPlayers[0].score>allPlayers[1].score)
    {
      allPlayers[0].gameState = 5;
      allPlayers[1].gameState = 4;
    }
    else if (allPlayers[1].score>allPlayers[0].score)
    {
      allPlayers[1].gameState = 5;
      allPlayers[0].gameState = 4;
    }
  }
}
