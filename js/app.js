// ======================================
// V0.6 - UMA COISINHA
// APP.JS
// ======================================



// ======================================
// CANVAS PRINCIPAL
// ======================================


const canvas =
document.getElementById("bg");


const ctx =
canvas.getContext("2d");



const particleCanvas =
document.getElementById("particles");


const particleCtx =
particleCanvas ?
particleCanvas.getContext("2d")
:null;



let particles = [];

let hearts = [];






// ======================================
// ESTADO DO APP
// ======================================


const app = {


    opened:false,


    typing:false,


    music:false,


    volume:true,


    page:1,


    letterFinished:false


};









// ======================================
// RESIZE
// ======================================


function resize(){


    canvas.width =
    window.innerWidth;


    canvas.height =
    window.innerHeight;




    if(particleCanvas){


        particleCanvas.width =
        window.innerWidth;


        particleCanvas.height =
        window.innerHeight;


    }



}



resize();



window.addEventListener(
"resize",
resize
);









// ======================================
// PARTICULAS
// ======================================



class Particle {


constructor(){

    this.reset();

}





reset(){


    this.x =
    Math.random()*canvas.width;



    this.y =
    Math.random()*canvas.height;



    this.size =
    Math.random()*2.5+1;



    this.speed =
    Math.random()*.6+.2;



    this.opacity =
    Math.random()*.35+.1;



    this.twinkle =
    Math.random()*.02;



    this.direction =
    Math.random() > .5 ? 1 : -1;


}







update(){



    this.y += this.speed;



    this.opacity +=
    this.twinkle * this.direction;





    if(
        this.opacity > .45 ||
        this.opacity < .05
    ){


        this.direction *= -1;


    }





    if(
        this.y >
        canvas.height + 20
    ){


        this.reset();


        this.y=-20;


    }



}







draw(){



ctx.fillStyle =

`rgba(
245,
245,
245,
${this.opacity}
)`;




ctx.beginPath();



ctx.arc(

this.x,

this.y,

this.size,

0,

Math.PI*2

);



ctx.fill();



}



}








for(
let i=0;
i<150;
i++
){


particles.push(
new Particle()
);


}









// ======================================
// ANIMAÇÃO DO FUNDO
// ======================================



function animateCanvas(){



ctx.clearRect(

0,

0,

canvas.width,

canvas.height

);





particles.forEach(
particle=>{


particle.update();


particle.draw();


});





requestAnimationFrame(
animateCanvas
);



}




animateCanvas();









// ======================================
// ELEMENTOS
// ======================================



const intro =
document.getElementById("intro");


const scene =
document.getElementById("scene");


const openBtn =
document.getElementById("open");


const textEl =
document.getElementById("text");


const sign =
document.querySelector(".sign");


const progress =
document.getElementById("progress");


const loader =
document.getElementById("loader");


const loaderProgress =
document.getElementById("loader-progress");



const musicBtn =
document.getElementById("music");


const volumeBtn =
document.getElementById("volume");


const restartBtn =
document.getElementById("restart");


const song =
document.getElementById("song");







// ======================================
// SEGURANÇA
// ======================================


function exists(element){


return element !== null;


}
// ======================================
// LOADER V0.6
// ======================================


window.addEventListener(
"load",
()=>{


    let progressValue = 0;



    const loading = setInterval(()=>{


        progressValue += Math.random()*12;



        if(progressValue >= 100){


            progressValue = 100;


            clearInterval(loading);



            setTimeout(()=>{


                if(loader){


                    loader.style.opacity="0";



                    setTimeout(()=>{


                        loader.remove();



                    },1000);


                }



            },500);



        }




        if(loaderProgress){


            loaderProgress.style.width =
            progressValue+"%";


        }




    },120);



});









// ======================================
// ABRIR CARTA
// ======================================


openBtn.addEventListener(
"click",
()=>{



    if(app.opened)
    return;



    app.opened=true;



    intro.style.opacity="0";





    setTimeout(()=>{



        // CORREÇÃO DO BUG DA CARTA SUMINDO


        intro.classList.add("hidden");



        scene.classList.remove("hidden");



        setTimeout(()=>{



            scene.classList.add("open");



            setTimeout(()=>{


                writeLetter();



            },700);



        },400);




    },1000);



});
 









// ======================================
// CARTA / TEXTO
// ======================================



function writeLetter(){



    if(app.typing)
    return;



    app.typing=true;





const fullText =

`Se você chegou até aqui...

é porque resolveu abrir essa pequena surpresa.

Essa carta ainda não está completa.

Talvez nunca esteja.

Mas cada linha,
cada detalhe
e cada pequeno pedaço disso
foi feito com carinho.

Algumas coisas simples
também podem ser especiais. ❤️`;






let index=0;



textEl.textContent="";



let speed=40;






const typing = setInterval(()=>{





    let char =
    fullText[index];





    textEl.textContent += char;





    index++;





    updateProgress(

        index,

        fullText.length

    );






    if(index >= fullText.length){



        clearInterval(typing);



        app.typing=false;


        app.letterFinished=true;





        setTimeout(()=>{



            sign.classList.add("show");



        },900);




    }





},speed);





}









// ======================================
// PROGRESSO
// ======================================



function updateProgress(
current,
total
){



if(!progress)
return;





const percent =

(current / total) * 100;





progress.style.width =

percent+"%";



}











// ======================================
// PAGINAS FUTURAS
// ======================================


const nextBtn =
document.getElementById("next");


const previousBtn =
document.getElementById("previous");



const pageNumber =
document.getElementById("page-number");







function changePage(page){



app.page = page;



if(pageNumber){


pageNumber.textContent =

`${page} / 1`;


}



}







if(nextBtn){



nextBtn.addEventListener(
"click",
()=>{


if(app.page < 1){


changePage(
app.page+1
);


}



});



}






if(previousBtn){



previousBtn.addEventListener(
"click",
()=>{


if(app.page > 1){


changePage(
app.page-1
);


}



});



}









// ======================================
// MUSICA
// ======================================



let musicVolume = 0.35;





if(song){


song.volume=0;



}







function fadeMusic(target){



if(!song)
return;




let current =
song.volume;



let step =
target > current
? .02
: -.02;





const fade =
setInterval(()=>{



current += step;



song.volume =
current;





if(
(step > 0 && current >= target)
||
(step < 0 && current <= target)
){



song.volume=target;


clearInterval(fade);


}



},80);



}









if(musicBtn){



musicBtn.addEventListener(
"click",
()=>{



if(!app.music){



song.play();



fadeMusic(
musicVolume
);



musicBtn.textContent="⏸";



app.music=true;



}



else{



fadeMusic(0);



setTimeout(()=>{


song.pause();


},800);



musicBtn.textContent="🎵";



app.music=false;



}





});



}









// ======================================
// VOLUME
// ======================================



if(volumeBtn){



volumeBtn.addEventListener(
"click",
()=>{



app.volume =
!app.volume;





if(app.volume){



song.volume =
musicVolume;



volumeBtn.textContent="🔊";



}

else{



song.volume=0;



volumeBtn.textContent="🔇";


}





});



}









// ======================================
// RESTART
// ======================================



if(restartBtn){



restartBtn.addEventListener(
"click",
()=>{


restartBtn.style.transform =
"rotate(360deg)";



setTimeout(()=>{


location.reload();



},400);



});



}
// ======================================
// CORAÇÃO / EASTER EGG V0.6
// ======================================


const mainHeart =
document.querySelector(".heart");




if(mainHeart){



mainHeart.addEventListener(
"click",
()=>{



console.log(
"%c❤️ Uma pequena surpresa...",
"font-size:25px;color:#c9a96e;"
);



createHeartBurst();



});





mainHeart.addEventListener(
"mouseenter",
()=>{


mainHeart.style.transform =
"scale(1.08)";



});






mainHeart.addEventListener(
"mouseleave",
()=>{


mainHeart.style.transform =
"scale(1)";



});



}









// ======================================
// CORAÇÕES FLUTUANTES MELHORADOS
// ======================================



function createHeart(){



const heart =
document.createElement("div");



heart.innerHTML="❤️";



heart.className =
"floating-heart";





heart.style.left =

Math.random()*100+"vw";





heart.style.fontSize =

(
Math.random()*25+20
)
+"px";





heart.style.animationDuration =

(
Math.random()*2+3
)
+"s";





document.body.appendChild(
heart
);






setTimeout(()=>{


heart.remove();



},5000);



}









function createHeartBurst(){



const amount = 8;




for(
let i=0;
i<amount;
i++
){



setTimeout(()=>{


createHeart();



},i*120);



}



}











// ======================================
// EFEITO DE CURSOR
// ======================================



const cursorEffect =
document.getElementById(
"cursor-effect"
);







if(cursorEffect){



document.addEventListener(
"mousemove",
(e)=>{


cursorEffect.style.left =
e.clientX+"px";



cursorEffect.style.top =
e.clientY+"px";



});



}











// ======================================
// CLIQUE NO FUNDO
// ======================================



document.addEventListener(
"click",
(e)=>{



if(
e.target.tagName === "BUTTON"
||
e.target.classList.contains("heart")
)
return;





createSpark(
e.clientX,
e.clientY
);



});











// ======================================
// PEQUENAS FAÍSCAS
// ======================================



function createSpark(
x,
y
){



const spark =
document.createElement("span");



spark.innerHTML="✦";



spark.style.position="fixed";



spark.style.left =
x+"px";



spark.style.top =
y+"px";



spark.style.zIndex="80";



spark.style.pointerEvents="none";



spark.style.color="#c9a96e";



spark.style.fontSize="20px";



spark.style.animation=
"sparkOut .8s ease forwards";





document.body.appendChild(
spark
);





setTimeout(()=>{


spark.remove();



},800);



}









// ======================================
// ANIMAÇÕES EXTRAS
// ======================================



const extraStyle =
document.createElement("style");



extraStyle.innerHTML = `



.floating-heart {


position:fixed;


bottom:-50px;


z-index:50;


pointer-events:none;


animation:
floatHeart linear forwards;


}



@keyframes floatHeart {



from {



transform:

translateY(0)

rotate(0deg);



opacity:1;



}



to {



transform:

translateY(-120vh)

rotate(360deg);



opacity:0;



}



}






@keyframes sparkOut {



from {



transform:

scale(.5)

rotate(0deg);



opacity:1;



}



to {



transform:

scale(2)

rotate(180deg);



opacity:0;



}



}




#cursor-effect {



position:fixed;


width:20px;


height:20px;


border-radius:50%;


pointer-events:none;


transform:
translate(-50%,-50%);



background:

rgba(201,169,110,.15);



z-index:90;



}




`;




document.head.appendChild(
extraStyle
);









// ======================================
// PREVENIR SELEÇÃO
// ======================================



document.addEventListener(
"dragstart",
(e)=>{


if(
e.target.classList.contains("heart")
){


e.preventDefault();



}



});









// ======================================
// DEBUG V0.6
// ======================================



console.log(
"%c✨ Uma coisinha v0.6 carregada",
"font-size:18px;color:#c9a96e;"
);