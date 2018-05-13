let register = (function () {
    
    let register_code = null;
    let z_index = 2000;
    //短信验证码计时
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
        message: '验证码发送成功,验证码是:',
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

    

    function check_data(inputeListe) {//表单数据监测函数，参数为input标签的 NodeList对象

        //手机号判断
        if ((inputeListe[0].value + '').length < 11 || inputeListe[0].value === '') {
            public.addNode(messageList[0],z_index++);
            return false;
        }

        //密码判断
        if (inputeListe[1].value.length < 6 || inputeListe[1].value === '') {
            public.addNode(messageList[1],z_index++);
            return false;
        }

        //判断是否确认密码
        if (inputeListe[2].value === '') {
            public.addNode(messageList[2],z_index++);
            return false;
        }

        //判断密码输入是否一致判断
        if (inputeListe[1].value !== inputeListe[2].value && inputeListe[1].value !== '' && inputeListe[2].value !== '') {
            public.addNode(messageList[4],z_index++);
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
                        let res = JSON.parse(xhr.responseText);
                        if (res.status == 1) {
                            messageList[3].message += res.data.code;
                            public.addNode(messageList[3],z_index++);
                            register_code = res.data.code;
                            //这部分逻辑不完整  因为后台接口不全 
                            event.target.onclick = null;
                            event.target.innerText = `60秒后重新获取`;
                            event.target.style.backgroundColor = '#999999';
                            setTimeout(insertTimeout(event), 1000);

                        } else {
                            messageList[5].message = res.info;
                            public.addNode(messageList[5],z_index++);
                            register_code = '123456';//后台默认返回‘123456’
                        }
                    } else {
                        messageList[5].message = '请求出错，返回状态码为:' + xhr.status
                        public.addNode(messageList[5],z_index++);
                    }

                }

            }

            xhr.open("post", "http://www.ftusix.com/static/data/sendsms.php", true);
            xhr.setRequestHeader("Cotent-Type", "application/json");
            let para = JSON.stringify({
                mobile: inputeListe[0].value
            });

            xhr.send(para);

        }





    }

    function register_user(event) {

        let inputeListe = document.getElementsByTagName('input');

        let key1 = check_data(inputeListe);
        let key2 = true;

        if (inputeListe[3].value == '') {
            public.addNode(messageList[6],z_index++);
            key2 = false;
        }

        if (inputeListe[3].value != '' && inputeListe[3].value != register_code) {
            public.addNode(messageList[7],z_index++);
            key2 = false;
        }

        if (key1 && key2) {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    let res = JSON.parse(xhr.responseText);
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        if (res.status == 1) {
                            public.addNode(messageList[8],z_index);
                            setTimeout(() => {
                                window.location.href = "file:///E:/project/src/login.html";
                            }, 1000)
                        } else {
                            messageList[5].message = res.info;
                            public.addNode(messageList[5],z_index++);
                        }
                    } else {
                        messageList[5].message = '请求出错，返回状态码为:' + xhr.status
                        public.addNode(messageList[5],z_index++);
                    }

                }
            }

            xhr.open("post", "http://www.ftusix.com/static/data/register.php", true);
            xhr.setRequestHeader("Cotent-Type", "application/json");
            let para = JSON.stringify({
                mobile: inputeListe[0].value,
                pwd: inputeListe[1].value,
                sms_code: inputeListe[3].value
            });

            
            xhr.send(para);
        }
    }
    return {
        get_code,
        register_user
    }
})()

