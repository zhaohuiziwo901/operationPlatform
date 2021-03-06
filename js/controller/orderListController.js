/**
 * Created by lenovo on 2016/11/30.
 */
operApp.controller("OrderListController",["$scope","orderService","$state",function ($scope,orderService,$state) {
    //列表初始渲染
    function getOrderList(option){
        orderService.getOrderList(option).then(function (data) {
            $scope.accountList = data.dataList;
            $scope.paginationConf.total = data.total;
        })
    }
    //分页
    var filterConditions;
    var tagState;
    $scope.paginationConf = {
        currentPage:1,
        total:1,
        pageSize:40,
        pagesLength:5,
        menuState:"all",
        filter:filterConditions,
        upDateInterFace: function (data) {
            getOrderList(data);
        }
    };
    //select
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
        curProtocolStatusItem: $scope.statusList.protocolStatusList[0]
    };

    //tabs && 是否显示协议状态
    $scope.menuStateShow = false;
    $scope.tabMenus = [
        {
            menuName:'全部订单',
            state:'all'
        },
        {
            menuName:'待支付订单',
            state:'notPaid'
        },
        {
            menuName:'已支付订单',
            state:'paid'
        },
        {
            menuName:'已失效订单',
            state:'Invalid'
        }
    ];
    $scope.selectedTab = 0;
    $scope.selectedMenu = function (row) {
        tagState = $scope.tabMenus[row].state;
        //获取对应的订单列表信息
        $scope.paginationConf = {
            currentPage:1,
            total:$scope.paginationConf.total,
            pageSize:20,
            pagesLength:5,
            menuState:tagState,
            filter:filterConditions,
            upDateInterFace: function (data) {
                getOrderList(data);
            }
        };
        $scope.selectedTab = row;
        //判断是否显示协议状态
        $scope.menuStateShow = $scope.tabMenus[row].menuName === "已支付订单" ? true : false;
        if($scope.menuStateShow){
            $scope.pageData. curProtocolStatusItem = $scope.statusList.protocolStatusList[0]
        }
    };
    //时间选择
    $scope.dateDataStart = {
        dt: new Date(),
        opened: false,
        format: "yyyy-MM-dd",
        language:'cn',
        dateOptions: {
            startingDay: 0
        },
        mixDate: null,
        maxDate: null,
        open: function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.dateDataEnd.opened = false;
            $scope.dateDataStart.opened = true;
        },
        closeTxt: "关闭"
    };
    $scope.dateDataEnd = {
        dt: new Date(),
        opened: false,
        format: "yyyy-MM-dd",
        dateOptions: {
            startingDay: 0
        },
        mixDate: null,
        maxDate: null,
        open: function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.dateDataStart.opened =false;
            $scope.dateDataEnd.opened = true;
        },
        closeTxt: "关闭"
    };

    //搜索
    $scope.member = {};
    $scope.search = function () {
        console.log($scope.pageData.curOrderStatusItem)
        filterConditions = {
            cellphone:$scope.member.cellphone,
            name:$scope.member.name,
            twoLevelDomainName:$scope.member.twoLevelDomainName,
            timeStart:new Date($scope.dateDataStart.dt.toLocaleDateString()).getTime(),
            timeEnd:new Date($scope.dateDataEnd.dt.toLocaleDateString()).getTime()+(24*60*60-1)*1000,
            classify:$scope.pageData.curOrderStatusItem.id,
            protocolStatus:$scope.pageData.curProtocolStatusItem.id
        };
        //获取对应的订单列表信息
        $scope.paginationConf = {
            currentPage:1,
            total:$scope.paginationConf.total,
            pageSize:20,
            pagesLength:5,
            menuState:tagState,
            filter:filterConditions,
            upDateInterFace: function (data) {
                getOrderList(data);
            }
        };
        //getOrderList(data)
    };
    //table
    $scope.goToOrderDetail = function (memberId) {
        $state.go("orderDetails", {memberId: memberId});
    }
}]);
