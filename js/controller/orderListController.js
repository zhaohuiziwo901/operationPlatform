/**
 * Created by lenovo on 2016/11/30.
 */
operApp.controller("OrderListController",["$scope", function ($scope) {
    $scope.statusList = {
        orderStatusList:[
            {
                id:'0',
                txt:'全部'
            },
            {
                id:'1',
                txt:'注册'
            },
            {
                id:'2',
                txt:'续费'
            },
            {
                id:'3',
                txt:'升级'
            },
            {
                id:'4',
                txt:'模板'
            }
        ],
        protocolStatusList:[
            {
                id:'0',
                txt:'全部'
            },
            {
                id:'1',
                txt:'已结束'
            },
            {
                id:'2',
                txt:'执行中'
            },
            {
                id:'3',
                txt:'待执行'
            },
            {
                id:'4',
                txt:'已暂停'
            },
            {
                id:'5',
                txt:'已终止'
            },
            {
                id:'6',
                txt:'已退款'
            }
        ]
    };
    $scope.pageData = {
        curOrderStatusItem: $scope.statusList.orderStatusList[0],
        curprotocolStatusItem: $scope.statusList.protocolStatusList[0]
    };

    renderSystemAccountList();
    function renderSystemAccountList(){
        $scope.accountList = [
            {
                member: "13750854360",
                memberName: "张三",
                twoLevelDomainName: "abc123.shopce.cn",
                orderTime: "2016-11-30 16:30:24",
                classify: "注册",
                commodity: "试用版",
                cost:"297.00",
                timeLimit:'365天',
                effectiveDate:'2016-11-30~2017-11-30',
                payStatus:'已支付',
                deliveryStatus:'已交付',
                protocolState:"执行中",
                operation:'操作'
            },
            {
                member: "13750854360",
                memberName: "张三",
                twoLevelDomainName: "abc123.shopce.cn",
                orderTime: "2016-11-30 16:30:24",
                classify: "注册",
                commodity: "试用版",
                cost:"297.00",
                timeLimit:'365天',
                effectiveDate:'2016-11-30~2017-11-30',
                payStatus:'已支付',
                deliveryStatus:'已交付',
                protocolState:"执行中",
                operation:'操作'
            },
            {
                member: "13750854360",
                memberName: "张三",
                twoLevelDomainName: "abc123.shopce.cn",
                orderTime: "2016-11-30 16:30:24",
                classify: "注册",
                commodity: "试用版",
                cost:"297.00",
                timeLimit:'365天',
                effectiveDate:'2016-11-30~2017-11-30',
                payStatus:'已支付',
                deliveryStatus:'已交付',
                protocolState:"执行中",
                operation:'操作'
            },
            {
                member: "13750854360",
                memberName: "张三",
                twoLevelDomainName: "abc123.shopce.cn",
                orderTime: "2016-11-30 16:30:24",
                classify: "注册",
                commodity: "试用版",
                cost:"297.00",
                timeLimit:'365天',
                effectiveDate:'2016-11-30~2017-11-30',
                payStatus:'已支付',
                deliveryStatus:'已交付',
                protocolState:"执行中",
                operation:'操作'
            }
        ];
    }
}]);