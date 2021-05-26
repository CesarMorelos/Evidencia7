var ancho=1300;
var alto=800;



var game = new Phaser.Game(ancho,alto,Phaser.AUTO,'');//{preload:preload,create:create,update:update,render:render});
      
    game.bloque=0;
    game.tema=0;
    
    game.PhaserWebComponents;
    game.nameData=[];// nombres de las armaduras dragonBones
    //-------------------Menu------------
    game.state.add('Menu', Technotip.Menu);
    
    game.state.add('Preactividad', Technotip.Preactividad);
    
    
    //---------Actividades----------------------- 
    game.state.start('Menu');
    

/*

function preload(){
   
}

function create(){
    
}

function update(){
   
    
     ancho=window.innerWidth * window.devicePixelRatio;
     alto=window.innerHeight * window.devicePixelRatio;
    game.scale.setGameSize(nacho, alto);
    
}

function render(){
    
    
}
*/