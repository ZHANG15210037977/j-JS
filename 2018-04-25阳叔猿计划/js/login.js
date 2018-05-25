let login = (function(){
    let z_index = 2000;
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
        message: '登陆成功,但是后面的页面我还没做',
        title: '√',
        bg_color: '#13CE66'
    },
    {//表单返回信息提示
        message: 'xxx',
        title: '×',
        bg_color: '#FF4949'
    }]
    let inputeListe = document.getElementsByTagName('input');

    function login_up(event){

        //手机号判断
        if ((inputeListe[0].value + '').length < 11 || inputeListe[0].value === '') {
            public.addNode(messageList[0],z_index++);
            return;
        }

        //密码判断
        if (inputeListe[1].value.length < 6 || inputeListe[1].value === '') {
            public.addNode(messageList[1],z_index++);
            return;
        }

        public.request({
            data:{
                mobile:inputeListe['mobile'].value,
                pwd:inputeListe['user_password'].value
            },
            url:"http://www.ftusix.com/static/data/login.php",
            method:"post",
            success:function(res){
                if(res.data.status == '1'){
                    public.addNode(messageList[2],z_index);
                }else{
                    messageList[3].message = res.data.info;
                    public.addNode(messageList[3],z_index);
                }
            },
            fail:function(){
                messageList[3].message = `返回的状态码：${res.statusCode} ${res.resHeader}`
                console.log(res);
            }
        })
    
    }


    return{
        login_up
    }
})()





