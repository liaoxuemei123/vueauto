/**
 * 预约保养数据
 */
import Tool from '../../utils/Tool';

const state = {
    carInfo:{ //车辆信息
        plate:'',               //车牌号
        seriesName:'',          //车系名
        vehicleTypeId:'',       //车型ID
        modelName:'',           //模型名称
        mileage:'',             //里程
        vin:'',                 //vin码
        lqsq:'',                //两驱四驱
    },
    time:'',                    //时间（时间戳格式）
    showTime:'',                //展示时间
    fcmc:{                      //保养推荐
        exchange:[],            //更换的项目
        check:[],               //检查的项目
    },
    storeInfo:{                 //店铺信息
        id:'',
        storeName:'',
    },
    mile:'',                    //里程
    contact:'',                 //联系人
    phone:'',                   //联系人手机号
    description:'',             //描述
}

const mutations = {
    SET_CARINFO:function(state,param){//设置车辆信息
        if($.isEmptyObject( param )){
            state.storeInfo = {};
        }else{
            for(var props in param){
                state.carInfo[props] = param[props];
            }
        }
    },
    SET_STOREINFO:function(state,param){//设置店铺信息
        if($.isEmptyObject( param )){
            state.storeInfo = {};
        }else{
            for(var props in param){
                state.storeInfo[props] = param[props];
            }
        }
    },
    RESET_ALL:function(state){//重置所有的信息
        Tool.removeObject(state);
    }
}

export default {
    state,
    mutations
}