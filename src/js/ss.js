        activated:function(){
            var params = window.location.href.split("?")[1];
            if(params){
                params = params.split('#')[0];
                var items = params.split('&');
                var code = '';
                var orderNo = '';
                for(var i=0;i<items.length;i++){
                    var key = items[i].split("=")[0];
                    var value = items[i].split("=")[1];
                    if(key == "code"){
                        code = value;
                    }
                    if(key == "state"){
                        orderNo = value;
                    }
                }
                if(orderNo){
                    Tool.get('AaPackageOrderDetail',{orderNo},(data)=>{
                        if(data.code == 200){
                            this.orderInfo = data.data.PackageOrder
                        }
                    })
                }
            }
        },