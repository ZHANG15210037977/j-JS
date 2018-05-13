let public = (function () {

    function addNode(messageList, z_index) {//表单消息提示处理函数，参数为提示信息对象

        document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend",//增加提示Html Node
            `<div class="prompt-message clear-float prompt-message-hidden" style = "z-index:${z_index++}">
                <div class="prompt" style = "background-color:${messageList.bg_color}">${messageList.title}</div>
                <div class="message">${messageList.message}</div>
            </div>`)

        let nowNode = document.getElementsByTagName('body')[0].lastChild;//获取当前Node
        setTimeout(() => {
            nowNode.classList = "prompt-message clear-float";//逐渐出现
        }, 100)
        setTimeout(() => {
            nowNode.classList += " prompt-message-hidden";//逐渐隐藏
            setTimeout(() => {
                nowNode.parentNode.removeChild(nowNode);//去除当前Node
            }, 800)
        }, 3000)

    }

    function addUrl(url, name, value) {
        url += (url.indexOf("?") == -1 ? "?" : "&");
        uel += encodeURIComponent(name) + '=' + encodeURIComponent(value);
        return url;
    }

    function request(par) {

        let xhr = new XMLHttpRequest();//新建传输对象

        let rqObj = {
            url: null,//http地址
            data : null,//传输数据
            header : 'application/json',//post 反馈报头
            method : 'get',// 传输类型 ，默认get
            success : function () {},//成功回调函数
            fail : function () {}, //失败回调函数
            complete : function () {}, //无论成功失败都
            sync : true, //是否异步发送，默认异步
        }



        for (let key in par) {//遍历传入对象传参
            rqObj[key] = par[key];
        }

       
        if (rqObj.method == 'post') {
            //回调判断
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {

                    let res = {
                        data: JSON.parse(xhr.responseText),
                        statusCode: xhr.status,
                        resHeader: xhr.statusText
                    }

                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        rqObj.success(res);//成功回调函数
                    } else {
                        rqObj.fail(res);//失败回调函数
                    }
                    rqObj.complete(res);//全执行函数
                }
            }

            xhr.open(rqObj.method, rqObj.url, rqObj.sync);
            xhr.setRequestHeader("Cotent-Type", rqObj.header);
            let para = JSON.stringify(rqObj.data);

            xhr.send(para)

        } else {
            //date写入url
            for (let key in rqObj.data) {
                url = addUrl(rqObj.url, key, rqObj.data[key]);
            }

            //回调判断
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {

                    let res = {
                        data: JSON.parse(xhr.responseText),
                        statusCode: xhr.status,
                        resHeader: xhr.statusText
                    }

                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        rqObj.success(res);
                    } else {
                        rqObj.fail(res);
                    }
                    rqObj.complete(res);
                }
            }

            xhr.open(rqObj.method, rqObj.url, rqObj.sync);
            xhr.send(null);
        }



    }

    return {
        addNode,
        request
    }
})()