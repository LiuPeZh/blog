(function(){

    let htmlWdith = document.documentElement.clientWidth || document.body.clientWidth

    //获取html的dom
    let htmlDom = document.getElementsByTagName('html')[0]


    if(htmlWidth > 450){
    //设置html的font-size
        htmlDom.style.fontSize = htmlWdith / 10 + 'px'
    }
    

    window.addEventListener('resize', ()=>{
        
        let htmlWdith = document.documentElement.clientWidth || document.body.clientWidth
        if(htmlWidth > 450){
            

            htmlDom.style.fontSize = htmlWdith / 10 + 'px'
        }

    })


})
