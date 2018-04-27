let register = (function () {
    let register_code = null;
    let z_index = 2000;
    let max = 60;


    //提示信息对象数组
    let messageList = [{
        message: '请输入正确的手机号码',
        title: '×',
        bg_color: '#FF4949'
    },
    {
        message: '请输入6位数以上密码',
        title: '×',
        bg_color: '#FF4949'
    },
    {
        message: '请确认密码',
        title: '×',
        bg_color: '#FF4949'
    },
    {
        message: '验证码发送成功',
        title: '√',
        bg_color: '#13CE66'
    },
    {
        message: '输入密码不一致',
        title: '×',
        bg_color: '#FF4949'
    },
    {//表单返回信息提示
        message: 'xxx',
        title: '×',
        bg_color: '#FF4949'
    }, {
        message: '请输入六位验证码',
        title: '×',
        bg_color: '#FF4949'
    }, {
        message: '输入验证码有误',
        title: '×',
        bg_color: '#FF4949'
    },
    {
        message: '注册成功，即将返回登录页面',
        title: '√',
        bg_color: '#13CE66'
    }]

    function addNode(messageList) {//表单消息提示处理函数，参数为提示信息对象

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

    function check_data(inputeListe) {//表单数据监测函数，参数为input标签的 NodeList对象

        //手机号判断
        if ((inputeListe[0].value + '').length < 11 || inputeListe[0].value === '') {
            addNode(messageList[0]);
            return false;
        }

        //密码判断
        if (inputeListe[1].value.length < 6 || inputeListe[1].value === '') {
            addNode(messageList[1]);
            return false;
        }

        //判断是否确认密码
        if (inputeListe[2].value === '') {
            addNode(messageList[2]);
            return false;
        }

        //判断密码输入是否一致判断
        if (inputeListe[1].value !== inputeListe[2].value && inputeListe[1].value !== '' && inputeListe[2].value !== '') {
            addNode(messageList[4]);
            return false;
        }

        return true;

    }


    function insertTimeout(event) {//60s计时函数

        if (max !== 0) {
            event.target.innerText = `${max}s后重新获取`;
            max--;
        } else {
            event.target.onclick = register.get_code;
            event.target.onclick.arguments = event;
            event.target.innerText = '获取验证码';
            event.target.style.backgroundColor = '#46b036';
            max = 60;
            return;
        }

        setTimeout(() => {

            insertTimeout(event);

        }, 1000);

    }

    function get_code(event) {//获取验证码函数
        let inputeListe = document.getElementsByTagName('input');


        if (check_data(inputeListe)) {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        let res = JSON.parse(xhr.responseText.substring(1));
                        if (res.status == 1) {
                            addNode(messageList[3]);
                            register_code = res.data.code;
                            //这部分逻辑不完整  因为后台接口不全 
                            event.target.onclick = null;
                            event.target.innerText = `60秒后重新获取`;
                            event.target.style.backgroundColor = '#999999';
                            setTimeout(insertTimeout(event), 1000);

                        } else {
                            messageList[5].message = res.info;
                            addNode(messageList[5]);
                            register_code = '123456';//后台默认返回‘123456’
                        }
                    } else {
                        messageList[5].message = '请求出错，返回状态码为:' + xhr.status
                        addNode(messageList[5]);
                    }

                }

            }

            xhr.open("post", "http://yjhapi.agxx.club/iweb/Sendsms/send", true);
            xhr.setRequestHeader("Cotent-Type", "application/json");
            let para = JSON.stringify({
                mobile: inputeListe[0].value
            });

            console.log(para);
            xhr.send(para);

        }





    }

    function register_user() {

        let inputeListe = document.getElementsByTagName('input');

        let key1 = check_data(inputeListe);
        let key2 = true;

        if (inputeListe[3].value == '') {
            addNode(messageList[6]);
            key2 = false;
        }

        if (inputeListe[3].value != '' && inputeListe[3].value != register_code) {
            addNode(messageList[7]);
            key2 = false;
        }

        if (key1 && key2) {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    let res = JSON.parse(xhr.responseText.substring(1));
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        if (res.status == 1) {
                            addNode(messageList[8]);
                            setTimeout(() => {
                                window.location.href = "file:///E:/project/src/index.html";
                            }, 1000)
                        } else {
                            messageList[5].message = res.info;
                            addNode(messageList[5]);
                        }
                    } else {
                        messageList[5].message = '请求出错，返回状态码为:' + xhr.status
                        addNode(messageList[5]);
                    }

                }
            }

            xhr.open("post", "http://yjhapi.agxx.club/iweb/regist/index", true);
            xhr.setRequestHeader("Cotent-Type", "application/json");
            let para = JSON.stringify({
                mobile: inputeListe[0].value,
                pwd: inputeListe[1].value,
                sms_code: inputeListe[3].value
            });

            console.log(para);
            xhr.send(para);
        }
    }
    return {
        get_code,
        register_user
    }
})()

