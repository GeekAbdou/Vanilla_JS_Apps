setInterval(()=>{
    date = new Date();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();

    hroration = 30*hour + min/2;
    mroration = 6*min;
    sroration = 6*sec;
    
    console.log(sec);

    h.style.transform = `rotate(${hroration}deg)`
    m.style.transform = `rotate(${mroration}deg)`
    s.style.transform = `rotate(${sroration}deg)`

/*     document.getElementsById('h').style.transform = "rotate(hroration)deg";
    document.getElementsById("m").style.transform = "rotate(mroration)deg";
    document.getElementsById("s").style.transform = "rotate(sroration)deg"; */
},1000);