var testData = `<div class="item-container thumbnail">
                    <div class="summary">
                        <div class="summary-title"><span>我是标题</span>
                        </div>
                        <div class="summary-cnt">
                            <div class="img-wrap"><img class="summary-img" ></div>
                            <span>内容内容...
                            内容内容...内容内容...
                            内容内容...
                            内容内容...内容内容...
                            内容内容...内容内容...
                            内容内容...内容内容...
                            内容内容...内容内容...
                            内容内容...内容内容...内容内容...内容内容...内容内容...内容内容...内容内容...内容内容...内容内容...内容内容...内容内容...内容内容...
                            内容内容...内容内容...内容内容...内容内容...内容内容...内容内容...
                            内容内容...内容内容...内容内容...内容内容...
                            内容内容...内容内容...内容内容...内容内容...
                            </span>
                            
                        </div>
                    </div>
                    <div class="cnt-msg">
                        <div class="segment">
                            <span>标签： </span>
                            <ul class="tag">
                                <li>JS</li>
                                <li>JS</li>
                                <li>JS</li>
                            </ul>
                        </div>
                        <div class="segment">
                            <ul class="record">
                                <li class="reply"><span>留言(10)</span></li>
                                <li class="views"><span>点击(26)</span></li>
                            </ul>
                        </div>
                    </div>
                </div>`
;               
(function(){
    let i = 0,
        timer = null
    let lowEnough = ()=>{
        let pageHeight = $(document).height(),
            viewportHeight = $(window).height(),
            scrollHeight = $(window).scrollTop()
        return pageHeight - viewportHeight - scrollHeight
    }
    /**
     * 滚动到一定页面后加载新内容
     */
    let scrollLoad = ()=>{
        // lowHeight 当前视窗页面距离底部的距离
        let lowHeight = lowEnough()
        if(lowHeight < 100){
            // 请求新的数据，并插入页面
            $('.main-list').append(testData)
        }
    }
    $(window).on('scroll', function(){
        if($(window).scrollTop() > 204){
            $('.sider-container').addClass('l-fixed')
        } else(
            $('.sider-container').removeClass('l-fixed')
        )
        if(timer){
            clearTimeout(timer)
            timer = null
        }
        return timer = setTimeout(()=>{
            scrollLoad()
        },400)
    })
})()