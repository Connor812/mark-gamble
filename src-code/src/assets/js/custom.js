
	;(function(){
  function id(v){return document.getElementById(v); }
  function loadbar() {
    var ovrl = id("overlay"),
        prog = id("progress"),
        stat = id("progstat"),
        img = document.images,
        c = 0;
        tot = img.length;

    function imgLoaded(){
      c += 1;
      var perc = ((100/tot*c) << 0) +"%";
      prog.style.width = perc;
      stat.innerHTML = "Loading "+ perc;
      if(c===tot) return doneLoading();
    }
    function doneLoading(){
      ovrl.style.opacity = 0;
      setTimeout(function(){ 
        ovrl.style.display = "none";
      }, 1200);
    }
    for(var i=0; i<tot; i++) {
      var tImg     = new Image();
      tImg.onload  = imgLoaded;
      tImg.onerror = imgLoaded;
      tImg.src     = img[i].src;
    }    
  }
  document.addEventListener('DOMContentLoaded', loadbar, false);
}());
    window.sr = ScrollReveal();
    
        sr.reveal('#navbar', {
              duration: 1000,
              origin:'bottom'
              })
sr.reveal('#jumbo', {
    duration: 3000,
    distance: '5px'
    })
        
    sr.reveal('#loader', {
        origin: 'left',
        distance:'150px',
        easing: 'ease',
        duration: 3000,
    delay: 800,
    })
        
         sr.reveal('#tectrac', {
        origin: 'left',
        distance:'150px',
        easing: 'ease',
        duration: 3000,
    delay: 400,
    })
         sr.reveal('#strip', {
        origin: 'bottom',
        distance:'15px',
        easing: 'ease',
        duration: 1000,
    delay: 400,
    })
        sr.reveal('#line1, #line2, #line3' ,{
          origin: 'bottom',
            duration: 2000,
            delay: 600,
        } )
        
         sr.reveal('#text1, #text2, #text3, #text4, #text5 ' ,{
          origin: 'bottom',
            duration: 2000,
            delay: 600,
        } )
    
    
    
   
        $('.carousel').carousel({
  interval: 4000,
        wrap: false,
        pause: false,
})
   