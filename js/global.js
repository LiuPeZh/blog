(function(){
    //判断字数
    var gblen = function(str, max){
        var len = 0
        for(var i = 0; i < str.length; i++){
            if(str.charCodeAt(i) !== 10){
                if(str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94){
                    len +=2
                } else {
                    len++
                }
                if(len > max){
                    return i
                }
            }
        }
        return i
    }
    var ellipsis = function(){
        var html = $('.item-container .summary-cnt span').html()
        console.log(html)
        var _index = gblen(html, 240)
        console.log(_index)
        html = html.slice(0, _index-8) + `···<a href="./post.html">阅读全文</a>`
        $('.item-container .summary-cnt span').html(html)
        
    }
    window.ellipsis = ellipsis
    $(window).on('scroll', function(){
        if($(window).scrollTop() > 204){
            //$('#back-top').css('visibility', 'visible')
            $('#back-top').fadeIn()
        }else{
            //$('#back-top').css('visibility', 'hidden')
            $('#back-top').fadeOut()
        }
        
    })

    $(function(){
        
        $(window).on('scroll', function(){
            if($(window).scrollTop() > 204){
                $('.sider-container').addClass('l-fixed')
            } else(
                $('.sider-container').removeClass('l-fixed')
            )
        })
        // 首次载入时加载当前视口的图片
        $().ready(function(){
            $('.summary-img').each(function(){
                if($(this).offset().top < $(window).height()){
                    $(this).attr('src', $(this).attr('data-img-src'))
                }
            })
        })
        // 图片懒加载
        $(window).on('scroll', function(){
            
            $('.summary-img').each(function(){
                if($(this).offset().top > $(window).scrollTop() + $(window).height()){
                    $(this).attr('src', $(this).attr('data-img-src'))
                }
            })
        })
        // 回到顶部

        $('#back-top').click(function(){
            console.log('asda')
            $('html').animate({scrollTop: 0}, 600)
        })


        $('.nav-list.dropdown').mouseenter(function () { 
            $('.nav-dropdown').addClass('drop')
            $(this).find('.arrow').removeClass('i-arrow-top-o').addClass('i-arrow-down-o')
            console.log('11')
        }).mouseleave(function () { 
            $('.nav-dropdown').removeClass('drop')
            $(this).find('.arrow').removeClass('i-arrow-down-o').addClass('i-arrow-top-o')
        })


        // 发表评论
        $('.reply-input .pub-reply').on('click', function(event){
            
            var text = $(this).siblings().eq(1).val()

            if(!text){
                $(this).parent().find('.reply-error p').text('请输入内容---')
            } else {
                /*
                $.post('/pubReply', {text: text}, function(data){
                    $('.reply li').clone()
                })
                */

                var $reply = $('.reply li').eq(0).clone()
                $reply.find('reply-ip p').eq(0).text('126.*.*.4')
                $reply.find('reply-ip p').eq(1).text(new Date())
                $reply.find('.reply-cnt p').text(text)
                $reply.find('.praise .praise-num').text(0)
                $('.reply').append($reply)
            }
            event.stopPropagation()

        })
        // 给评论点赞
        $('.reply').on('click', '.praise', function(){
            /* 
            $.post('/praise', function(data){
                $(this).find('.praise-num').text(data.praiseNum)
            }, 'json').error(function(params){
                $(this).append(`<div class="error-msg">网络错误</div>`)
                setTimeout(() => {
                    $(this).children('.error-msg').remove()
                }, 600);  
            })
            */
            // 该语句为测试语句， 生产环境中使用上述的ajax方法
            $(this).find('.praise-num').text(parseInt($(this).find('.praise-num').text()) + 1)
            
        })
    })

})()
