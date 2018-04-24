let register = (function(){
    let register_code = null;
    let z_index = 2000;
    //提示信息组
    let messageList = [{
        message:'请输入正确的手机号码',
        title:'×',
        bg_color:'#FF4949'
    },
    {
        message:'请输入6位数以上密码',
        title:'×',
        bg_color:'#FF4949'
    },
    {
        message:'请确认密码',
        title:'×',
        bg_color:'#FF4949'
    },
    {
        message:'验证码发送成功',
        title:'√',
        bg_color:'#13CE66'
    },
    {
        message:'输入密码不一致',
        title:'×',
        bg_color:'#FF4949'
    },
    {//表单返回信息提示
        message:'xxx',
        title:'×',
        bg_color:'#FF4949'
    }]

    function addNode(messageList){//表单消息提示处理函数，参数为消息对象

        document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend",//增加提示Html Node
                `<div class="prompt-message clear-float prompt-message-hidden" style = "z-index:${z_index++}">
                <div class="prompt" style = "background-color:${messageList.bg_color}">${messageList.title}</div>
                <div class="message">${messageList.message}</div>
            </div>`)

            let nowNode = document.getElementsByTagName('body')[0].lastChild;//获取当前Node
            setTimeout(()=>{
                nowNode.classList = "prompt-message clear-float";//逐渐出现
            },100)
            setTimeout(()=>{   
                nowNode.classList += " prompt-message-hidden";//逐渐隐藏
                setTimeout(()=>{
                    nowNode.parentNode.removeChild(nowNode);//去除当前Node
                },800)   
            },3000)

    }

    function get_code(){

        let key = false;
        let inputeListe = document.getElementsByTagName('input');

        for(let i = 0;i < 3;i++){
            if(inputeListe[i].value === ''){
                
            addNode(messageList[i]);

            break;
            }
        }

        if((inputeListe[0].value + '').length  < 11  && inputeListe[0].value !== ''){

            addNode(messageList[0]);

        }

        
        if(inputeListe[1].value.length < 6 && inputeListe[1].value !== ''){

            addNode(messageList[1]);

        }

        if(inputeListe[1].value.length !== inputeListe[2].value && inputeListe[1].value !== '' && inputeListe[2].value !== ''){

            addNode(messageList[4]);
            key = true;

        }

        if(true){
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status = 200){
                        let res = JSON.parse(xhr.responseText.substring(1));
                        if(res.status == 1){
                            addNode(messageList[3]);
                            register_code = res.data.code;
                        }else{
                            messageList[5].message = res.info;
                            addNode(messageList[5]);
                        }
                    }
                }else{
                    messageList[5].message = '请求出错，返回状态码为:' + xhr.status
                    addNode(messageList[5]);
                }
            }

            xhr.open("post","http://yjhapi.agxx.club/iweb/Sendsms/send",true);
            xhr.setRequestHeader("Cotent-Type","application/json");
            let para = JSON.stringify({
                mobile:inputeListe[0].value
            });
            xhr.send(para);
            

        }


        

    }

    return {    
        get_code
    }
})()

 