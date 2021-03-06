/**
 * Created by lenovo on 2016/11/28.
 */
operApp.service("ms", ["$q", "LocalStorageService", "ToolService", "$http", function ($q, LocalStorageService, ToolService, $http) {
    return function (servicePointfnName, data){
        //在走所有的请求之前需要先判断有没有session
        var loginDefer = $q.defer();
        loginDefer.resolve();
        return loginDefer.promise.then(function(){
            return {
                status: true
            };
        }).then(function(loginStatusObj){
            var server = servicePointfnName.split(".");
            var service = server[0];
            var fnName = server[1];
            var res;
            var deferred = $q.defer();
            if(loginStatusObj.status){
                switch (service){
                    case "Common":
                        switch (fnName){
                            case "getMenuList":
                                res = {
                                    status: true,
                                    data: [
                                        {
                                            name: "系统管理",
                                            items: [
                                                {
                                                    name: "角色管理",
                                                    hash: "roleOperating"
                                                },{
                                                    name: "添加账号",
                                                    hash: "addAccount"
                                                }, {
                                                    name: "系统账号",
                                                    hash: "systemAccountList"
                                                }
                                            ]
                                        }, {
                                            name: "会员管理",
                                            items: [
                                                {
                                                    name: "会员列表",
                                                    hash: "memberList"
                                                },
                                                {
                                                    name: "获取手机号",
                                                    hash: "getPhoneNumbers"
                                                }
                                            ]
                                        }, {
                                            name: "订单管理",
                                            items: [
                                                {
                                                    name: "订单列表",
                                                    hash: "orderList"
                                                },
                                                {
                                                    name: "发票管理",
                                                    hash: "invoiceManage"
                                                },
                                                {
                                                    name: "生成沙箱订单",
                                                    hash: "createSandBoxOrder"
                                                }
                                            ]
                                        }, {
                                            name: "统计查询",
                                            items: [
                                                {
                                                    name: "会员统计",
                                                    hash: "memberCensus"
                                                },
                                                {
                                                    name: "商城统计",
                                                    hash: "mallCensus"
                                                },
                                                {
                                                    name: "收入统计",
                                                    hash: "incomeCensus"
                                                }
                                            ]
                                        }, {
                                            name: "产品管理",
                                            items: [
                                                {
                                                    name:"添加模板",
                                                    hash:"addTemplate"
                                                },
                                                {
                                                    name:"模板列表",
                                                    hash:"templateList"
                                                },
                                                {
                                                    name:"添加应用",
                                                    hash:"addApplication"
                                                },
                                                {
                                                    name:"应用列表",
                                                    hash:"applicationList"
                                                },
                                                {
                                                    name: "产品套餐",
                                                    hash: "productPackage"
                                                },
                                                {
                                                    name: "技术产品",
                                                    hash: "techniqueProduct"
                                                }
                                            ]
                                        }, {
                                            name: "服务管理",
                                            items: [
                                                {
                                                    name: "域名绑定管理",
                                                    hash: "domainBindManage"
                                                },
                                                {
                                                    name: "域名解绑管理",
                                                    hash: "domainUnbindManage"
                                                }
                                            ]
                                        }, {
                                            name: "日志管理",
                                            items: [
                                                {
                                                    name: "登录日志",
                                                    hash: "loginLog"
                                                },
                                                {
                                                    name: "操作日志",
                                                    hash: "operationLog"
                                                }
                                            ]
                                        }, {
                                            name: "活动管理",
                                            items: [
                                                {
                                                    name: "添加编辑活动",
                                                    hash: "loginLog"
                                                },
                                                {
                                                    name: "活动详情",
                                                    hash: "operationLog"
                                                }
                                            ]
                                        }
                                    ]
                                };
                                break;
                        }
                        break;
                    case "Index":
                        switch (fnName){
                            case "getTotalOverviewData":
                                res = {
                                    status: true,
                                    data: {
                                        registerNum: 123,
                                        payNum: 23,
                                        income: 456,
                                        LTV: 1456
                                    }
                                };
                                break;
                            case "getYesterdayData":
                                res = {
                                    status: true,
                                    data: {
                                        registerNum: 123,
                                        payNum: 23,
                                        income: 456,
                                        applyRecordNum: 1456
                                    }
                                };
                                break;
                        }
                        break;
                    case "Role":
                        switch (fnName){
                            case "getRoleList":
                                res = LocalStorageService.get("roleList");
                                break;
                            case "addRole":
                                // $http({
                                //     method: "JSONP",
                                //     url: "http://172.23.151.66",
                                //     data: {
                                //         username: data
                                //     },
                                //     jsonpCallbackParam: 'callback'
                                // }).then(function(d){
                                //     console.log("成功");
                                // }, function (d) {
                                //     console.log("失败");
                                // });
                                data.id = ToolService.rnd();
                                data.roleMembers = [];
                                var roleList = LocalStorageService.get("roleList");
                                roleList.data.push(data);
                                res = LocalStorageService.set("roleList", roleList);
                                break;
                            case "getRoleInfo":
                                var roleList = LocalStorageService.get("roleList");
                                angular.forEach(roleList.data, function (o, i) {
                                    if(data == o.id){
                                        res = {
                                            status: true,
                                            data: o
                                        };
                                        return false;
                                    }
                                });
                                break;
                            case "setRoleAuthority":
                                var roleId = data;
                                var authList = arguments[2];
                                var roleList = LocalStorageService.get("roleList");
                                angular.forEach(roleList.data, function (o, i) {
                                    if(roleId == o.id){
                                        o.authorityList = authList;
                                        return false;
                                    }
                                });
                                res = LocalStorageService.set("roleList", roleList);
                                break;
                        }
                        break;
                    case "Account":
                        switch (fnName){
                            case "addAccount":
                                var accountInfo = data;
                                data.id = ToolService.rnd();
                                data.status = 1; //默认启用状态
                                data.createTime = ToolService.getTime();
                                var roleList = LocalStorageService.get("roleList");
                                angular.forEach(roleList.data, function (o, i) {
                                    if(accountInfo.roleId == o.id){
                                        o.roleMembers.push(accountInfo);
                                        return false;
                                    }
                                });
                                res = LocalStorageService.set("roleList", roleList);
                                break;
                            case "getAccountList":
                                var roleList = LocalStorageService.get("roleList");
                                var accountList = [];
                                angular.forEach(roleList.data, function (o, i) {
                                    angular.forEach(o.roleMembers, function (o1, i1) {
                                        accountList.push(o1);
                                    });
                                });
                                res = {
                                    status: true,
                                    data: accountList
                                };
                                break;
                            case "editAccount":
                                var editData = data;
                                var roleList = LocalStorageService.get("roleList");
                                var accountList = [];
                                angular.forEach(roleList.data, function (o, i) {
                                    angular.forEach(o.roleMembers, function (o1, i1) {
                                        if(o1.id == editData.id){
                                            o1.roleId = editData.roleId;
                                            o1.name = editData.name;
                                            o1.username = editData.username;
                                        }
                                    });
                                });
                                res = LocalStorageService.set("roleList", roleList);
                                break;
                            case "changeAccountStatus":
                                var accountId = data;
                                var roleList = LocalStorageService.get("roleList");
                                angular.forEach(roleList.data, function (o, i) {
                                    angular.forEach(o.roleMembers, function (o1, i1) {
                                        if(o1.id == accountId){
                                            o1.status = (o1.status == 1 ? 2 : o1.status == 2 ? 1 : o1.status);
                                        }
                                    });
                                });
                                res = LocalStorageService.set("roleList", roleList);
                                break;
                            case "changeAccountPassword":
                                var transportData = data;
                                res = {
                                    status: true,
                                    data: transportData
                                };
                                break;
                        }
                        break;
                    case "Order":
                        switch (fnName){
                            case "getOrderList":
                                console.log(data);
                                res = {
                                    status:true,
                                    data:{
                                        dataList:[
                                            {
                                                memberID:10001,
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
                                                operation:'详情'
                                            },
                                            {
                                                memberID:10002,
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
                                                operation:'详情'
                                            },
                                            {
                                                memberID:10003,
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
                                                operation:'详情'
                                            },
                                            {
                                                memberID:10004,
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
                                                operation:'详情'
                                            }
                                        ],
                                        total:354
                                    }
                                };
                                break;
                            case "getOrderDetail":
                                console.log(data);
                                res = {
                                    status:true,
                                    data:{
                                        orderInfor:{
                                            orderNumber: "111110010050",
                                            memberName: "张三",
                                            twoLevelDomainName: "abc123.shopce.cn",
                                            orderTime: "2016-11-30 16:30:24",
                                            classify: "注册",
                                            commodity: "试用版",
                                            cost:"297.00",
                                            timeLimit:'365天',
                                            effectiveDate:'2016-11-30~2017-11-30',
                                            payStatus:'未支付',
                                            deliveryStatus:'已交付',
                                            protocolState:"执行中",
                                            operation:'详情'
                                        },
                                        paymentVoucherInfor:{
                                            paymentWay:'支付宝',
                                            paymentAccount:'laorui@163.com',
                                            paymentAmount:'2980.00',
                                            paymentTime:'2016-11-30 16:30:24',
                                            remarks:'这是备注信息'
                                        },
                                        memberInfor:{
                                            memberID:'100000008',
                                            cellphone:'12354786951',
                                            name:'张三/果园老农',
                                            email:'laorui@sohu.com',
                                            twoLevelDomainName: "abc123.shopce.cn"
                                        },
                                        commodityInfor:{
                                            commodityNumber:'box-ccc-001',
                                            term:'3个月',
                                            commodity:'适用版',
                                            effectiveDate:'2016-11-30~2017-11-30',
                                            deliveryStatus:'已交付'
                                        },
                                        serviceInfor:[
                                            {
                                                workOrderNum:'111110010050',
                                                workOrderClassify:'商城开通',
                                                generationTime:'2016-11-21 17:47',
                                                productID:'xyz12',
                                                commodityName:'B2C',
                                                version:'V1.0',
                                                state:'待执行',
                                                completionTime:'2016-11-21 17:47'
                                            },
                                            {
                                                workOrderNum:'111110010050',
                                                workOrderClassify:'商城开通',
                                                generationTime:'2016-11-21 17:47',
                                                productID:'xyz12',
                                                commodityName:'B2C',
                                                version:'V1.0',
                                                state:'待执行',
                                                completionTime:'2016-11-21 17:47'
                                            },
                                            {
                                                workOrderNum:'111110010050',
                                                workOrderClassify:'商城开通',
                                                generationTime:'2016-11-21 17:47',
                                                productID:'xyz12',
                                                commodityName:'B2C',
                                                version:'V1.0',
                                                state:'待执行',
                                                completionTime:'2016-11-21 17:47'
                                            }
                                        ],
                                        remarksInfor:[
                                            '2016-11-21 17:47 因商品有问题，商城关闭；',
                                            '2016-11-21 17:47 商城重新开启；',
                                            '2016-11-21 17:47 服务到期，商城关闭；'
                                        ]
                                    }
                                };
                                break;
                            case "submitApplication":
                                res = {
                                    "status":true
                                };
                                break;
                            case "getSandBoxOrder":
                                console.log(data)
                                res = {
                                    status:true,
                                    data:[
                                        {
                                            memberID:"123456789",
                                            cellphone:'35654786951',
                                            email:'laorui@sohu.com',
                                            twoLevelDomainName: "abc123.shopce.cn",
                                            memberClassify:'合作商'
                                        },
                                        {
                                            memberID:"953456789",
                                            cellphone:'54754786951',
                                            email:'laorui@sohu.com',
                                            twoLevelDomainName: "abc123.shopce.cn",
                                            memberClassify:'合作商'
                                        },
                                        {
                                            memberID:"587456",
                                            cellphone:'15487521456',
                                            email:'laorui@sohu.com',
                                            twoLevelDomainName: "abc123.shopce.cn",
                                            memberClassify:'合作商'
                                        },
                                        {
                                            memberID:"9542334",
                                            cellphone:'15478565442',
                                            email:'laorui@sohu.com',
                                            twoLevelDomainName: "abc123.shopce.cn",
                                            memberClassify:'合作商'
                                        }
                                    ]
                                };
                                break;
                            case "submitSandBoxOrder":
                                res = {
                                    status:true
                                };
                                break;
                        }
                        break;
                    case "Product":
                        switch (fnName){
                            case "getProductPackage":
                                console.log(data);
                                res = {
                                    status:true,
                                    data:{
                                        dataList:[
                                            {
                                                productPackageNum:"box-ccc-001",
                                                productPackageName:"基础版",
                                                price:"198",
                                                priority:"0",
                                                remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
                                                releaseTime:"2016-10-11",
                                                state:"待出售",
                                                sold:"55345",
                                                isOnShelves:0
                                            },
                                            {
                                                productPackageNum:"box-ccc-002",
                                                productPackageName:"基础版",
                                                price:"198",
                                                priority:"0",
                                                remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
                                                releaseTime:"2016-10-11",
                                                state:"待出售",
                                                sold:"55345",
                                                isOnShelves:1
                                            },
                                            {
                                                productPackageNum:"box-ccc-003",
                                                productPackageName:"基础版",
                                                price:"198",
                                                priority:"0",
                                                remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
                                                releaseTime:"2016-10-11",
                                                state:"待出售",
                                                sold:"55345",
                                                isOnShelves:1
                                            },
                                            {
                                                productPackageNum:"box-ccc-004",
                                                productPackageName:"基础版",
                                                price:"198",
                                                priority:"0",
                                                remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
                                                releaseTime:"2016-10-11",
                                                state:"待出售",
                                                sold:"55345",
                                                isOnShelves:1
                                            },
                                            {
                                                productPackageNum:"box-ccc-005",
                                                productPackageName:"基础版",
                                                price:"198",
                                                priority:"0",
                                                remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
                                                releaseTime:"2016-10-11",
                                                state:"待出售",
                                                sold:"55345",
                                                isOnShelves:0
                                            }
                                        ],
                                        total:1980
                                    }
                                };
                                break;
                            case "saleOnShelves":
                                console.log(data);
                                res = {
                                    status:true
                                };
                                break;
                            case "productPackageDetails":
                                console.log(data);
                                res = {
                                    status:true,
                                    data:{
                                        applicationMall:"B2C基础版 v1.0",
                                        docker:"1个",
                                        storage:"10G",
                                        bandwidth:"10M",
                                        template:"默认、朝霞、冷艳、绿润",
                                        application:"促销v1.0",
                                        messages:"1千条",
                                        emails:"1千封",
                                        state:"在售/已下架（下架时间：2016-11-12 14:47）",
                                        identifier:"box-ccc-001",
                                        productPackageName:"基础版",
                                        price:" 298元/月",
                                        priority:"0",
                                        remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
                                        releaseTime:"2016-11-10 15:35",
                                        lastModifiedTime:"2016-11-10 15:35",
                                        sold:"10000套"
                                    }
                                };
                                break;
                            case "productPackage":
                                console.log(data);
                                res = {
                                    status:true,
                                    data:{
                                        mallApplication:[
                                            {txt:"PC-B2C v1.0",id:"0",isChecked:true},
                                            {txt:"MB-B2C v1.0",id:"1",isChecked:false}
                                        ],
                                        docker:[
                                            {txt:"1个",id:"0",isChecked:true},
                                            {txt:"2个",id:"1",isChecked:false},
                                            {txt:"4个",id:"2",isChecked:false},
                                            {txt:"8个",id:"3",isChecked:false}
                                        ],
                                        storage:[
                                            {txt:"20G",id:"0",isChecked:true},
                                            {txt:"40G",id:"1",isChecked:false},
                                            {txt:"50G",id:"2",isChecked:false},
                                            {txt:"100G",id:"3",isChecked:false},
                                            {txt:"500G",id:"4",isChecked:false},
                                            {txt:"1T",id:"5",isChecked:false},
                                            {txt:"不限",id:"6",isChecked:false}
                                        ],
                                        bandwidth:[
                                            {txt:"共享",id:"0",isChecked:true},
                                            {txt:"10M",id:"1",isChecked:false},
                                            {txt:"10M、可扩展",id:"2",isChecked:false}
                                        ],
                                        template:[
                                            {txt:"默认",id:"0",isChecked:true},
                                            {txt:"朝霞",id:"1",isChecked:true},
                                            {txt:"冷艳",id:"2",isChecked:false},
                                            {txt:"绿润",id:"3",isChecked:false}
                                        ],
                                        application:[
                                            {txt:"促销v1.0",id:"0",isChecked:true},
                                            {txt:"BI分析",id:"1",isChecked:false}
                                        ],
                                        messages:[
                                            {txt:"1千条",id:"0",isChecked:true},
                                            {txt:"1万条",id:"1",isChecked:"1"},
                                            {txt:"3万条",id:"2",isChecked:false},
                                            {txt:"10万条",id:"3",isChecked:false}
                                        ],
                                        emails:[
                                            {txt:"1千封",id:"0",isChecked:true},
                                            {txt:"1万封",id:"1",isChecked:"1"},
                                            {txt:"3万封",id:"2",isChecked:false},
                                            {txt:"10万封",id:"3",isChecked:false}
                                        ],
                                        priceRule:"1"
                                    }
                                };
                                break;
                            case "saveProductPackage":
                                console.log(data);
                                res = {
                                    status:true
                                };
                                break;
                            case "basicsTechniqueProduct":
                                console.log(data);
                                res = {
                                    status:true,
                                    data:{
                                        dataList:[
                                            {
                                                Identification:"xyz123",
                                                classify:"商城",
                                                name:"PC-B2C",
                                                version:"v1.0",
                                                releaseTime:"2016-11-11 12:34",
                                                state:"已通过",
                                                handle:"上架"
                                            },
                                            {
                                                Identification:"xyz123",
                                                classify:"商城",
                                                name:"PC-B2C",
                                                version:"v1.0",
                                                releaseTime:"2016-11-11 12:34",
                                                state:"已通过",
                                                handle:"上架"
                                            },
                                            {
                                                Identification:"xyz123",
                                                classify:"商城",
                                                name:"PC-B2C",
                                                version:"v1.0",
                                                releaseTime:"2016-11-11 12:34",
                                                state:"已通过",
                                                handle:"上架"
                                            },
                                            {
                                                Identification:"xyz123",
                                                classify:"商城",
                                                name:"PC-B2C",
                                                version:"v1.0",
                                                releaseTime:"2016-11-11 12:34",
                                                state:"已通过",
                                                handle:"上架"
                                            }
                                        ],
                                        total:785
                                    }
                                };
                                break;
                            case "meteringTechniqueProduct":
                                console.log(data);
                                res = {
                                    status:true,
                                    data:[
                                        {
                                            Identification:"xyz123",
                                            classify:"商城",
                                            name:"20G空间",
                                            numVal:"20G",
                                            releaseTime:"2016-11-11 12:34",
                                            state:"已通过",
                                            handle:"上架"
                                        },
                                        {
                                            Identification:"xyz123",
                                            classify:"商城",
                                            name:"20G空间",
                                            numVal:"20G",
                                            releaseTime:"2016-11-11 12:34",
                                            state:"已通过",
                                            handle:"上架"
                                        },
                                        {
                                            Identification:"xyz123",
                                            classify:"商城",
                                            name:"20G空间",
                                            numVal:"20G",
                                            releaseTime:"2016-11-11 12:34",
                                            state:"已通过",
                                            handle:"上架"
                                        }
                                    ]
                                };
                                break;
                        }
                        break;
                    case "Log":
                        switch (fnName){
                            case "getLogList":
                                console.log(data)
                                res = {
                                    status: true,
                                    data:{
                                        dataList: [
                                            {
                                                id: "1",
                                                account: "admin",
                                                name: "管理员",
                                                createTime: 1480403979578,
                                                ip: "111.145.214.175",
                                                result:"成功",
                                            },
                                            {
                                                id: "2",
                                                account: "abc123",
                                                name: "李钦",
                                                createTime: 1480403979534,
                                                ip: "222.145.214.173",
                                                result:"失败",
                                            },
                                            {
                                                id: "3",
                                                account: "youxian",
                                                name: "小李",
                                                createTime: 1480403971278,
                                                ip: "333.145.214.175",
                                                result:"成功",

                                            }

                                        ],
                                        total:354,
                                    }

                                };
                                break;
                            case "getOperLogList":
                                console.log(data)
                                res = {
                                    status: true,
                                    data: {
                                        dataList:[
                                            {
                                                id: "11113",
                                                createTime: 1480403979578,
                                                name: "管理员",
                                                ip: "111.145.214.175",
                                                classify:"修改菜单",
                                                result:"修改订单[ID:5678 订单状态变更为已支付]"
                                            },
                                            {
                                                id: "222",
                                                createTime: 1480403975980,
                                                name: "管理员",
                                                ip: "222.145.214.10",
                                                classify:"修改会员密码",
                                                result:" 修改会员密码[ID:5678 会员密码更改为********]",
                                            },
                                            {
                                                id: "333",
                                                createTime: 1480403945612,
                                                name: "管理员",
                                                ip: "222.145.214.10",
                                                classify:"修改商品价格",
                                                result:"商品的价格暂时定义为1988",

                                            }
                                        ],
                                        total:354,
                                    }

                                };
                                break;
                        }
                        break;
                    default:
                        res = {
                            status: false,
                            data: {
                                msg: "没有找到对应模块"
                            }
                        };
                }
                if(res.status){
                    deferred.resolve(res.data);
                }else{
                    console.error(res.data.msg);
                    deferred.reject(res);
                }
                return deferred.promise;
            }else{
                window.location.href = "/operationPlatform/login.html";
            }
        });
    };
}]);