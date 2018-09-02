class Pagination{

    /*
        构造函数
        @param totalPage :number 总页数
        @param showPage  :number 当前页前后显示的页数
    */
    constructor(totalPage, showPage, callback){
        this.totalPage = totalPage
        this.showPage = showPage
        this.callback = callback

    }

    /*
        显示页数
        @ page :number 当前页码
    */
    showPages(page){
        let str = ""
        if(page <= this.showPage + 2){
            for(let i = 1; i <= this.showPage + page; i++){
                str += `${i} ` 
            }
            str += `... ${this.totalPage}`
        }else if(page > this.totalPage - this.showPage - 2){
            str += "1 ..."
            for(let i = page - this.showPage; i <= this.totalPage; i++){

                str += ` ${i}`
            }
            
        }else {
            str += "1 ..." 
            for(let i = page - this.showPage; i <= page + this.showPage; i++){
                str += ` ${i}`
            }
            str += ` ... ${this.totalPage}`
        }
        return str
    }
    render(element, current){
        let fragment = document.createDocumentFragment();
        let ul = document.createElement('ul')
        let li = document.createElement('li')
        let p = document.createElement('p')
        ul.className = 'pagination-wrap'
        li.className = 'pagination-item'
        let currShow = this.showPages(current)
        //console.log(currShow.split(' '))

        currShow.split(' ').map( v=>{
            if(/^\d/.test(v)){
                let _li = li.cloneNode()
                if(v == current){
                    _li.className += ' current-page'
                }
                _li.innerHTML = v
                
                ul.appendChild(_li)
                //console.log(v)
            }else {
                let _p = p.cloneNode()
                _p.innerHTML = v
                ul.appendChild(_p)
            }
        })
        fragment.appendChild(ul)
        if(element.innerHTML === ''){
            element.appendChild(fragment)
        } else {
            element.innerHTML = ''
            element.appendChild(fragment)
        }
        
        ul.addEventListener('click', ()=>{
            let e = event || window.event
            let target = e.target || e.srcElement
            if (target.nodeName.toLowerCase() === 'li') {

                this.callback()
                /*let url = `/a?page=${target.innerHTML}`

                this.ajax({
                    type: 'get',
                    url: url,
                    success: (data)=>{
                        p.innerHTML = data
                        console.log(data)
                    }
                })*/
                this.render(element, parseInt(target.innerHTML))
            }
        })
    }
    click(event){
        // 事件对象兼容
        let e = event || window.event
        let target = e.target || e.srcElement
        console.log(target)
        if(target.nodeName.toLowerCase() === 'li'){
            console.log('click')
            this.render(element, this.innerHTML)
        }

    }
    /*
        ajaxArgObj = {
            type: 'GET | POST',
            url: '',
            suceess: function () {},
        }
    */
    ajax(ajaxArgObj){
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    ajaxArgObj.success(xhr.responseText)
                }
            }
        }
        xhr.open(ajaxArgObj.type, ajaxArgObj.url, true)
        xhr.send(null)
    }
    printf(){
        for(let i = 1; i <= this.totalPage; i++){
            console.log(this.showPages(i))
        }
    }
}

//let pagination = new Pagination(30, 2)
//pagination.printf()
