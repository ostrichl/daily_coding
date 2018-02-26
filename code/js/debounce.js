

//如果一个时间被触发，并且触发的时间很短，防抖函数使对应的事件处理函数只执行一次
function debounce(fn, delay) {
    //持久化一个定时器
    let timer = null

    //闭包函数可以访问timer
    return function (argument) {
        //通过 this 和 arguments 获得函数的作用域和参数
        let context = this
        let args = arguments
        //如果事件被触发，清除timer重新开始计时
        clearTimeout(timer)
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)
    }
}

function foo () {
    console.log('scrolling!')
}

document.addEventListener('scoll', debounce(foo, 50))