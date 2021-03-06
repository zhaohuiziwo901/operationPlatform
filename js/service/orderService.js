/**
 * Created by lenovo on 2016/12/21.
 */
operApp.service("orderService",["ms", function (ms) {
    function getOrderList(option){
        return ms("Order.getOrderList",option);
    }
    function getOrderDetail(member){
        return ms("Order.getOrderDetail",member);
    }
    function submitApplication(application){
        return ms("Order.submitApplication")
    }
    function getSandBoxOrder(option){
        return ms("Order.getSandBoxOrder",option)
    }
    function submitSandBox(SandBoxOrderData){
        return ms("Order.submitSandBoxOrder")
    }
    return{
        getOrderList:getOrderList,
        getOrderDetail:getOrderDetail,
        submitApplication:submitApplication,
        getSandBoxOrder:getSandBoxOrder,
        submitSandBox:submitSandBox
    }
}]);
