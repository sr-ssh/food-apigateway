define({ "api": [
  {
    "type": "post",
    "url": "/api/customer/v1/order/",
    "title": "add order",
    "version": "1.0.0",
    "name": "addOrder",
    "description": "<p>add order: send products like request example</p>",
    "group": "customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "products",
            "description": "<p>array of product objects</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>order address</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": "<p>gerographical latitude</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lng",
            "description": "<p>gerographical longitude</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "delivaryCost",
            "description": "<p>delivery cost</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>order dexcription</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    products: [...{\n        _id: \"60b72a70e353f0385c2fe5af\",\n        name: \"نان سیر\"\n        quantity: 2,\n        price: \"30000\",\n        size: \"meduim\",\n        discount: \"10000\"\n    }],\n    address: \"کلاهدوز 4\",\n    lat: 36.297920,\n    lng: 59.605933 ,\n    deliveryCost: 5000,\n    description: \"تحویل در اسانسور\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارش شما با موفقیت ثبت شد\",\n     data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/order.js",
    "groupTitle": "customer"
  },
  {
    "type": "delete",
    "url": "/api/customer/v1/order",
    "title": "cancel order",
    "version": "1.0.0",
    "name": "cancelOrder",
    "description": "<p>cancel order</p>",
    "group": "customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارش شما  لغو شد ,\n     data: { status: true }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: true,\n     message: \"سفارش موجود نیست\",\n     data: { status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/order.js",
    "groupTitle": "customer"
  },
  {
    "type": "post",
    "url": "/api/customer/v1/location",
    "title": "check location",
    "version": "1.0.0",
    "name": "checkLocation",
    "description": "<p>check location</p>",
    "group": "customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": "<p>gerographical latitude</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lng",
            "description": "<p>gerographical longitude</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"موقعیت جغرافیایی فرستاده شده با موفقیت دریافت شد\",\n     data: {\n         deliveryCost: 5,\n         provider: {\n             status:true,\n             kitchenArea: 'هنرستان'\n         }\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/location.js",
    "groupTitle": "customer"
  },
  {
    "type": "delete",
    "url": "/api/customer/v1/location",
    "title": "delete location",
    "version": "1.0.0",
    "name": "deleteLocation",
    "description": "<p>delete location</p>",
    "group": "customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "GPS",
            "description": "<p>location gps</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>location address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     address: \"درب شمالی راه آهن\",\n     GPS: {\n         type: \"Point\",\n         coordinates: [\n             59.62104646283381,\n             36.313584005129016\n         ]\n     }\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"آدرس شما با موفقیت حذف شد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/location.js",
    "groupTitle": "customer"
  },
  {
    "type": "put",
    "url": "/api/customer/v1/location",
    "title": "edit location",
    "version": "1.0.0",
    "name": "editLocation",
    "description": "<p>edit location</p>",
    "group": "customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "oldLOc",
            "description": "<p>old location</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "newLoc",
            "description": "<p>new location</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     oldLoc: {\n             address: \"راهنمایی 24\",\n             lat: 33.29792,\n             lng: 59.605933\n         },\n     newLoc: {\n             address: \"راهنمایی 24 - پلاک 117\",\n             lat: 33.29793,\n             lng: 59.605933\n         }\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"آدرس شما با موفقیت ویرایش شد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/location.js",
    "groupTitle": "customer"
  },
  {
    "type": "get",
    "url": "/api/customer/v1/charge",
    "title": "get customer charge",
    "version": "1.0.0",
    "name": "getCharge",
    "description": "<p>get customer charge</p>",
    "group": "customer",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"شارژ مشتری با موفقیت ارسال شد\",\n     data: 60000\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/charge.js",
    "groupTitle": "customer"
  },
  {
    "type": "get",
    "url": "/api/customer/v1/order",
    "title": "get orders",
    "version": "1.0.0",
    "name": "getInLineOrders",
    "description": "<p>get order products.'cancelTime' unit is minute.</p>",
    "group": "customer",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"محصولات سفارش با موفقیت ارسال شد\",\n     data: {\n           orders: [...{\n             id: \"60b72a70e353f0385c2fe5af\",\n             createdAt: \"2021-06-01T06:54:01.691Z\",\n             paid: true,\n             status: { name: \"آماده\", status: 2},\n             total: 60400\n           }],\n          cancelTime: 1 \n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/order.js",
    "groupTitle": "customer"
  },
  {
    "type": "get",
    "url": "/api/customer/v1/location",
    "title": "get customer locations",
    "version": "1.0.0",
    "name": "getLocations",
    "description": "<p>get customer locations</p>",
    "group": "customer",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"ادرس های مشتری با موفقیت ارسال شد\",\n     data: [...{\n         address: \"کلاهدوز 4\",\n         GPS: { type: \"Point\", coordinates: [ 36.345, -130.54]}\n       }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/location.js",
    "groupTitle": "customer"
  },
  {
    "type": "get",
    "url": "/api/customer/v1/order",
    "title": "get order",
    "version": "1.0.0",
    "name": "getOrder",
    "description": "<p>get order</p>",
    "group": "customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارشات با موفقیت ارسال شد\",\n     data: {\n           order: {\n              id: \"60b72a70e353f0385c2fe5af\",\n             products: [...{\n               _id: { _id: \"61014026a1701735e409000b\", name: \"پپرونی\"},\n               quantity: 2,\n               price: \"30000\",\n               size: \"medium\",\n               discount: \"10000\"\n             }],\n             createdAt: \"2021-06-01T06:54:01.691Z\",\n             address: \"معلم 43\",\n             status: { name: \"در صف انتظار\"},\n             deliveryCost: 5,\n             paid: true\n           },\n           tax: 12750,\n           discounts: 20000\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/order.js",
    "groupTitle": "customer"
  },
  {
    "type": "get",
    "url": "/api/customer/v1/order/product",
    "title": "get order products",
    "version": "1.0.0",
    "name": "getOrderProducts",
    "description": "<p>get order products</p>",
    "group": "customer",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"محصولات سفارش با موفقیت ارسال شد\",\n     data: [...{\n         _id: '60fd0aacca33dd0374b55650',\n         name: \"نان سیر\",\n         description: \"سیر . خمیر تازه . اویشن\",\n         type: {name: 'pizza'},\n         img: 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',\n         size: [...{ name: \"medium\", price: 50000, discount: 10000 }]\n       }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/order.js",
    "groupTitle": "customer"
  },
  {
    "type": "get",
    "url": "/api/customer/v1/order/product/type",
    "title": "get order products types",
    "version": "1.0.0",
    "name": "getOrderProductsTypes",
    "description": "<p>get order products types</p>",
    "group": "customer",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارشات با موفقیت ارسال شد\",\n     data: [\"پیش غذ\", \"پیتزا\", \"نوشیدنی\", \"سالاد\", \"سس\"]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/order.js",
    "groupTitle": "customer"
  },
  {
    "type": "get",
    "url": "/api/customer/v1/order/finished",
    "title": "get finished orders",
    "version": "1.0.0",
    "name": "getfinishedOrders",
    "description": "<p>get finished orders : &quot;finished&quot; orders have delivered to the customer or canceled</p>",
    "group": "customer",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارشات با موفقیت ارسال شد\",\n     data: [...{\n            id: \"60b72a70e353f0385c2fe5af\",\n            address: \"کلاهدوز 4\",\n            finishDate: \"2021-06-01T06:54:01.691Z\",\n            status: { status: 1, name: \"لغو شده\"},\n            products: [...{\n                 name: \"پپرونی\",\n                 size: \"medium\",\n                 quantity: 1,\n                 price: 60000,\n                 disconut: 20000\n             }]\n         }]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/order.js",
    "groupTitle": "customer"
  },
  {
    "type": "post",
    "url": "/api/customer/v1/app/info",
    "title": "app info",
    "version": "1.0.0",
    "name": "info",
    "description": "<p>app info</p>",
    "group": "customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "versionCode",
            "description": "<p>versionCode</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "os",
            "description": "<p>os</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  status: true,\n  message:\"اطلاعات نرم افزار فرستاده شد\",\n  data:{\n      update:false,\n      updateUrl:\"http://cafebazar.com/ir.team-x.ir/mohsenapp,\n      force:false\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   status: false,\n   message:\"کاربر بلاک می باشد\",\n   data:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/home.js",
    "groupTitle": "customer"
  },
  {
    "type": "post",
    "url": "/api/customer/v1/login",
    "title": "login",
    "version": "1.0.0",
    "name": "login",
    "description": "<p>login customer</p>",
    "group": "customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "family",
            "description": "<p>customer family</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>customer mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>verification code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"مشتری با موفقیت وارد شد\",\n    data:{\n         idToken: idToken, \n         accessToken: accessToken\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:false,\n     message:\"مشتری وارد نشد\",\n     data:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/home.js",
    "groupTitle": "customer"
  },
  {
    "type": "get",
    "url": "/api/customer/v1/pay",
    "title": "pay order",
    "version": "1.0.0",
    "name": "payOrder",
    "description": "<p>pay order: if the order pay with charge, &quot;onlinePay: false&quot; and no more fields, if the online pay was unsuccessfull , there will be no &quot;payURl&quot;.</p>",
    "group": "customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"شارژ کاربر با موفقیت ارسال شد\",\n     data: {\n       onlinePay: true, \n       payStatus: 100, \n       payURL: \"https://www.zarinpal.com/pg/transaction/pay/585657\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: true,\n     message: \"سفارش موجود نیست\", \n     data: { status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/pay.js",
    "groupTitle": "customer"
  },
  {
    "type": "get",
    "url": "/api/customer/v1/pay",
    "title": "validate pay",
    "version": "1.0.0",
    "name": "validatePay",
    "description": "<p>validate pay.send params as query.Status is &quot;OK&quot;,or &quot;NOK&quot;</p>",
    "group": "customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authority",
            "description": "<p>pay authority</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Status",
            "description": "<p>pay status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"پرداخت با موفقیت انجام شد\", \n     data: { status: true }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: true,\n     message: \"پرداخت انجام نشد\", \n     data: { status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/pay.js",
    "groupTitle": "customer"
  },
  {
    "type": "post",
    "url": "/api/customer/v1/verificationcode",
    "title": "requset verification Code",
    "version": "1.0.0",
    "name": "verificationCode",
    "description": "<p>requset verification Code</p>",
    "group": "customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>user mobile</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success:true,\n     message: \"کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:false,\n     message:\"کاربری با این شماره موبایل در دسترس نمی باشد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/home.js",
    "groupTitle": "customer"
  },
  {
    "type": "post",
    "url": "/api/delivery/v1/order",
    "title": "accept order",
    "version": "1.0.0",
    "name": "acceptOrder",
    "description": "<p>accept order for delivery</p>",
    "group": "delivery",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارشات با موفقیت ارسال شد\",\n     data: { status: true }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: true,\n     message: \"سفارش موجود نیست\",\n     data: { status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/order.js",
    "groupTitle": "delivery"
  },
  {
    "type": "post",
    "url": "/api/delivery/v1/location",
    "title": "add location",
    "version": "1.0.0",
    "name": "addLocation",
    "description": "<p>add location</p>",
    "group": "delivery",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": "<p>delivery latitude</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lng",
            "description": "<p>delivery longitude</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "speed",
            "description": "<p>delivery speed</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bearing",
            "description": "<p>delivdery bearing</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"موقعیت جغرافیایی فرستاده شده با موفقیت دریافت شد\",\n     data: { status: true }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/location.js",
    "groupTitle": "delivery"
  },
  {
    "type": "post",
    "url": "/api/delivery/v1/order/finish",
    "title": "finish order",
    "version": "1.0.0",
    "name": "finishOrder",
    "description": "<p>finish order for delivery</p>",
    "group": "delivery",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"وضعیت سفارش با موفقیت ثبت شد\",\n     data: { status: true }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: true,\n     message: \"سفارش موجود نیست\",\n     data: { status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/order.js",
    "groupTitle": "delivery"
  },
  {
    "type": "get",
    "url": "/api/delivery/v1/charge",
    "title": "get delivery charge",
    "version": "1.0.0",
    "name": "getCharge",
    "description": "<p>get delivery charge</p>",
    "group": "delivery",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"شارژ کاربر با موفقیت ارسال شد\",\n     data: 60000\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/account.js",
    "groupTitle": "delivery"
  },
  {
    "type": "get",
    "url": "/api/delivery/v1/charge",
    "title": "get delivery charge",
    "version": "1.0.0",
    "name": "getCharge",
    "description": "<p>get delivery charge</p>",
    "group": "delivery",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"شارژ کاربر با موفقیت ارسال شد\",\n     data: 60000\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/charge.js",
    "groupTitle": "delivery"
  },
  {
    "type": "get",
    "url": "/api/delivery/v1/order/pending",
    "title": "get pending orders",
    "version": "1.0.0",
    "name": "getPendingOrders",
    "description": "<p>get pending orders : &quot;pending&quot; orders are ready and cooked and ready for delivery</p>",
    "group": "delivery",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارشات با موفقیت ارسال شد\",\n     data: [...{\n            id: \"60b72a70e353f0385c2fe5af\",\n           createdAt: \"2021-06-01T06:54:01.691Z\",\n           status: { name: \"آماده\"}\n         }]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/order.js",
    "groupTitle": "delivery"
  },
  {
    "type": "get",
    "url": "/api/delivery/v1/order/accepted",
    "title": "get accepted orders",
    "version": "1.0.0",
    "name": "getacceptedOrders",
    "description": "<p>get accepted orders : &quot;accepted&quot; orders are accepted by delivery</p>",
    "group": "delivery",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارشات با موفقیت ارسال شد\",\n     data: [...{\n            id: \"60b72a70e353f0385c2fe5af\",\n            address: \"کلاهدوز 4\",\n            GPS: { coordinates: [59.605933, 36.29792]},\n            createdAt: \"2021-06-01T06:54:01.691Z\",\n            status: { name: \"در حال ارسال\", status: 3},\n            customer: {\n                 mobile: \"09307580143\",\n                 family: \"زهرا رضوی\"\n             },\n            products: [...{\n                 name: \"پپرونی\",\n                 price: \"60000\",\n                 quantity: 1,\n                 size: 'medium',\n                 discount: false\n             }],\n             desciption: \"ساعت 1 تحویل داده شود\",\n             discounts: 20000,\n             total: 120000,\n             deliveryCost: 5000\n         }]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/order.js",
    "groupTitle": "delivery"
  },
  {
    "type": "get",
    "url": "/api/delivery/v1/order/finished",
    "title": "get finished orders",
    "version": "1.0.0",
    "name": "getfinishedOrders",
    "description": "<p>get finished orders : &quot;finished&quot; orders are have delivered to the customer or canceled</p>",
    "group": "delivery",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارشات با موفقیت ارسال شد\",\n     data: [...{\n            id: \"60b72a70e353f0385c2fe5af\",\n            address: \"کلاهدوز 4\",\n            finishDate: \"2021-06-01T06:54:01.691Z\",\n            status: { status: 1, name: لغو شده},\n            customer: {\n                 family: \"زهرا رضوی\"\n             },\n            products: [...{\n                 _id: { _id: \"61014026a1701735e409000b\", name: \"پپرونی\"},\n                 price: \"60000\",\n                 quantity: 1,\n                 size: 'medium',\n                 discount : true\n             }]\n         }]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/order.js",
    "groupTitle": "delivery"
  },
  {
    "type": "post",
    "url": "/api/delivery/v1/app/info",
    "title": "app info",
    "version": "1.0.0",
    "name": "info",
    "description": "<p>app info . send 'Android' as os if you are on android</p>",
    "group": "delivery",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "versionCode",
            "description": "<p>versionCode</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "os",
            "description": "<p>os</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  status: true,\n  message:\"اطلاعات نرم افزار فرستاده شد\",\n  data:{\n       status: true, \n       update: true, \n       isForce: false, \n       updateUrl: \"http://cafebazar.com/happypizza\",\n       pushId: 0,\n       pushToken: 0,\n       family: \"شکوهی\",\n       sipNumber: 0,\n       sipServer: 0,\n       sipPassword: 0\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   status: true,\n   message:\"کاربر بلاک می باشد\",\n   data:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/home.js",
    "groupTitle": "delivery"
  },
  {
    "type": "post",
    "url": "/api/delivery/v1/login",
    "title": "login",
    "version": "1.0.0",
    "name": "login",
    "description": "<p>login kitchen. for scope send 'deliveryMan'</p>",
    "group": "delivery",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>delivery mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scope",
            "description": "<p>delivery scope</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>verification code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"کاربر با موفقیت وارد شد\",\n    data:{\n         idToken: idToken, \n         accessToken: accessToken\n         status: true\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:false,\n     message:\"کاربر وارد نشد\",\n     data:{ status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/home.js",
    "groupTitle": "delivery"
  },
  {
    "type": "post",
    "url": "/api/delivery/v1/login/verificationcode",
    "title": "requset login verification Code",
    "version": "1.0.0",
    "name": "loginVerificationCode",
    "description": "<p>requset verification Code for login with scope. for scope send 'deliveryMan'</p>",
    "group": "delivery",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>user mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "scope",
            "description": "<p>delivery scope</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success:true,\n     message: \"کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد\",\n     data: { status: true }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:true,\n     message:\"کاربری با این شماره موبایل در دسترس نمی باشد\",\n     data: { status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/home.js",
    "groupTitle": "delivery"
  },
  {
    "type": "post",
    "url": "/api/delivery/v1/order/customer",
    "title": "not responsive customer",
    "version": "1.0.0",
    "name": "notResposiveCustomer",
    "description": "<p>not responsive customer</p>",
    "group": "delivery",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"اطلاعات دریافت شد\",\n     data: { status: true }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: true,\n     message: \"سفارش موجود نیست\",\n     data: { status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/order.js",
    "groupTitle": "delivery"
  },
  {
    "type": "post",
    "url": "/api/delivery/v1/register",
    "title": "register",
    "version": "1.0.0",
    "name": "register",
    "description": "<p>register delivery man. for scope send 'deliveryMan'</p>",
    "group": "delivery",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>user password</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "family",
            "description": "<p>family</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "code",
            "description": "<p>verification code</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "scope",
            "description": "<p>delivery scope</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"کاربر با موفقیت ثبت شد\",\n    data: {\n      status: true,\n      idToken: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6ImtpdGNoZW4iLCJpYXQiOjE2MjcyOTczMjYsImV4cCI6MTY1MzIxNzMyNiwiYXVkIjoiYXVkaWVuY2UiLCJpc3MiOiJpc3N1ZXIifQ.GauQ4Ls0Hz6aPkpaPyh7eXQGfRK9UAqxkrhW3GDu6I\",\n      accessToken: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBmZTk0MTIwYmU1ZTUzNmM4MWNiNzEzIiwidXNlcl9hY3RpdmUiOnRydWUsImlhdCI6MTYyNzI5NzMyNiwiZXhwIjoxNjQ4ODk3MzI2LCJhdWQiOiJhdWRpZW5jZSIsImlzcyI6Imlzc3VlciJ9.eO6JvCHPcoSFMPQ0wClsh7gsdZmGANs55x6x9hNc7u\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    success:true,\n    message:\"کاربری با این مشخصات موجود است\",\n    data:{ status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/home.js",
    "groupTitle": "delivery"
  },
  {
    "type": "get",
    "url": "/api/delivery/v1/charge",
    "title": "get delivery charge",
    "version": "1.0.0",
    "name": "registerAccount",
    "description": "<p>get delivery charge</p>",
    "group": "delivery",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"شارژ کاربر با موفقیت ارسال شد\",\n     data: 60000\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/account.js",
    "groupTitle": "delivery"
  },
  {
    "type": "post",
    "url": "/api/delivery/v1/verificationcode",
    "title": "requset verification Code",
    "version": "1.0.0",
    "name": "verificationCode",
    "description": "<p>requset verification Code without scope for register</p>",
    "group": "delivery",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>user mobile</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success:true,\n     message: \"کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:false,\n     message:\"کاربری با این شماره موبایل در دسترس نمی باشد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/delivery/v1/home.js",
    "groupTitle": "delivery"
  },
  {
    "type": "get",
    "url": "/api/kitchen/v1/order/active",
    "title": "get active order",
    "version": "1.0.0",
    "name": "getActiveOrder",
    "description": "<p>get active order : &quot;active&quot; orders are not ready yet.</p>",
    "group": "kitchen",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارشات با موفقیت ارسال شد\",\n     data: [...{\n            _id: \"6107cfccf74a1a3398ca5dc8\"\n            products: [...{\n                _id: { _id: \"61014026a1701735e409000b\", name: \"پپرونی\"},\n                quantity: 2,\n                size: 'medium'\n            }],\n            customer: {\n                family: \"مصطفایی\",\n                mobile: \"09152631225\",\n            },\n           createdAt: \"2021-06-01T06:54:01.691Z\",\n           address: \"معلم 43\",\n           GPS: { type: \"point\", coordinates: [-122.5, 37.7]},\n           status: { name: \"active\"},\n           description: \"بدون قارچ\"\n         }]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/kitchen/v1/order.js",
    "groupTitle": "kitchen"
  },
  {
    "type": "get",
    "url": "/api/delivery/v1/order/finished",
    "title": "get finished orders",
    "version": "1.0.0",
    "name": "getfinishedOrders",
    "description": "<p>get finished orders : &quot;finished&quot; orders have delivered to the customer or canceled</p>",
    "group": "kitchen",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارشات با موفقیت ارسال شد\",\n     data: [...{\n            id: \"60b72a70e353f0385c2fe5af\",\n            address: \"کلاهدوز 4\",\n            finishDate: \"2021-06-01T06:54:01.691Z\",\n            status: { status: 1, name: \"لغو شده\"},\n            customer: {\n                 family: \"زهرا رضوی\"\n             },\n            products: [...{\n                 name: \"پپرونی\",\n                 size: \"medium\",\n                 quantity: 1,\n             }],\n           description: \"بدون قارچ\"\n         }]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/kitchen/v1/order.js",
    "groupTitle": "kitchen"
  },
  {
    "type": "get",
    "url": "/api/delivery/v1/order/ready",
    "title": "get ready orders",
    "version": "1.0.0",
    "name": "getreadyOrders",
    "description": "<p>get ready orders : &quot;ready&quot; orders are in cooking or in delivery</p>",
    "group": "kitchen",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارشات با موفقیت ارسال شد\",\n     data: [...{\n            id: \"60b72a70e353f0385c2fe5af\",\n            address: \"کلاهدوز 4\",\n            createdAt: \"2021-06-01T06:54:01.691Z\",\n            status: { status: 1, name: لغو شده},\n            customer: {\n                 family: \"زهرا رضوی\",\n                 mobile: \"09307580143\"\n             },\n            products: [...{\n                 name: \"پپرونی\",\n                 size: \"medium\",\n                 quantity: 1,\n             }],\n            description: \"بدون قارچ\"\n         }]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/kitchen/v1/order.js",
    "groupTitle": "kitchen"
  },
  {
    "type": "post",
    "url": "/api/kitchen/v1/app/info",
    "title": "app info",
    "version": "1.0.0",
    "name": "info",
    "description": "<p>app info . send 'Android' as os if you are on android</p>",
    "group": "kitchen",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "versionCode",
            "description": "<p>versionCode</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "os",
            "description": "<p>os</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  status: true,\n  message:\"اطلاعات نرم افزار فرستاده شد\",\n  data:{\n       status: true, \n       update: true, \n       isForce: false, \n       updateUrl: \"http://cafebazar.com/happypizza\",\n       pushId: 0,\n       pushToken: 0,\n       family: \"شکوهی\",\n       sipNumber: 0,\n       sipServer: 0,\n       sipPassword: 0\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   status: false,\n   message:\"کاربر بلاک می باشد\",\n   data:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/kitchen/v1/home.js",
    "groupTitle": "kitchen"
  },
  {
    "type": "post",
    "url": "/api/kitchen/v1/login",
    "title": "login",
    "version": "1.0.0",
    "name": "login",
    "description": "<p>login kitchen. for scope send 'cook'</p>",
    "group": "kitchen",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>user mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scope",
            "description": "<p>kitchen scope</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>verification code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"کاربر با موفقیت وارد شد\",\n    data:{\n         idToken: idToken, \n         accessToken: accessToken,\n         status: true\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:false,\n     message:\"کاربر وارد نشد\",\n     data:{ status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/kitchen/v1/home.js",
    "groupTitle": "kitchen"
  },
  {
    "type": "post",
    "url": "/api/kitchen/v1/login/verificationcode",
    "title": "requset login verification Code",
    "version": "1.0.0",
    "name": "loginVerificationCode",
    "description": "<p>requset verification Code for login with scope. for scope send 'cook'</p>",
    "group": "kitchen",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>user mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "scope",
            "description": "<p>kitchen scope</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success:true,\n     message: \"کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد\",\n     data: { status: true }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:true,\n     message:\"کاربری با این شماره موبایل در دسترس نمی باشد\",\n     data: { status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/kitchen/v1/home.js",
    "groupTitle": "kitchen"
  },
  {
    "type": "put",
    "url": "/api/kitchen/v1/order/ready",
    "title": "ready order",
    "version": "1.0.0",
    "name": "readyOrder",
    "description": "<p>ready order</p>",
    "group": "kitchen",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"وضعیت سفارش با موفقیت ویرایش شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: false,\n     message: \"سفارش موجود نیست\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/kitchen/v1/order.js",
    "groupTitle": "kitchen"
  },
  {
    "type": "post",
    "url": "/api/kitchen/v1/register",
    "title": "register",
    "version": "1.0.0",
    "name": "register",
    "description": "<p>register cook. for scope send 'cook'</p>",
    "group": "kitchen",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>user password</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "family",
            "description": "<p>family</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "code",
            "description": "<p>verification code</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "scope",
            "description": "<p>kitchen scope</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"کاربر با موفقیت ثبت شد\",\n    data: {\n      status: true,\n      idToken: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6ImtpdGNoZW4iLCJpYXQiOjE2MjcyOTczMjYsImV4cCI6MTY1MzIxNzMyNiwiYXVkIjoiYXVkaWVuY2UiLCJpc3MiOiJpc3N1ZXIifQ.GauQ4Ls0Hz6aPkpaPyh7eXQGfRK9UAqxkrhW3GDu6I\",\n      accessToken: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBmZTk0MTIwYmU1ZTUzNmM4MWNiNzEzIiwidXNlcl9hY3RpdmUiOnRydWUsImlhdCI6MTYyNzI5NzMyNiwiZXhwIjoxNjQ4ODk3MzI2LCJhdWQiOiJhdWRpZW5jZSIsImlzcyI6Imlzc3VlciJ9.eO6JvCHPcoSFMPQ0wClsh7gsdZmGANs55x6x9hNc7u\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    success:true,\n    message:\"کاربری با این مشخصات موجود است\",\n    data:{ status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/kitchen/v1/home.js",
    "groupTitle": "kitchen"
  },
  {
    "type": "post",
    "url": "/api/kitchen/v1/verificationcode",
    "title": "requset verification Code",
    "version": "1.0.0",
    "name": "verificationCode",
    "description": "<p>requset verification Code without scope for register</p>",
    "group": "kitchen",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>user mobile</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success:true,\n     message: \"کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/kitchen/v1/home.js",
    "groupTitle": "kitchen"
  },
  {
    "type": "put",
    "url": "/api/operator/v1/activate",
    "title": "active",
    "name": "activate",
    "version": "1.0.0",
    "description": "<p>active or deactive operator</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>active:1 , deactive:0</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success: true, message: \"عملیات با موفقیت انجام شد\", data: { status: true } }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ success: true, message: \"سفارش موجود نیست\", data: { status: false } }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/home.js",
    "groupTitle": "operator"
  },
  {
    "type": "post",
    "url": "/api/operator/v1/complaint",
    "title": "add complaint",
    "name": "addComplaint",
    "version": "1.0.0",
    "description": "<p>insert complaint for an order</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "des",
            "description": "<p>description</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success: true, message: \"عملیات با موفقیت انجام شد\", data: { status: true } }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ success: true, message: \"سفارش موجود نیست\", data: { status: false } }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/complaint.js",
    "groupTitle": "operator"
  },
  {
    "type": "post",
    "url": "/api/operator/v1/order/",
    "title": "add order",
    "version": "1.0.0",
    "name": "addOrder",
    "description": "<p>add order: customer birthday and reminder are optional.all params are necessary and in case of no entry , there is a flag for each optional param.if that flag entered it asumed as no entry.birthday flag is &quot;1900-01-01T05:42:13.845Z&quot;.reminder flag and duration flag are -1.address flag is &quot; &quot;</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "products",
            "description": "<p>array of product objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{products: [...{_id: \"60b72a70e353f0385c2fe5af\", quantity: 2,price: \"30000\",size: \"medium\"}],\n customer: {family: \"شکوهی\",mobile: \"09307580142\",},address: \"معلم 24\",description: \"ساعت 21:00 تحویل داده شود\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{success: true, message: \"سفارش شما با موفقیت ثبت شد\",data: {status: true }}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/order.js",
    "groupTitle": "operator"
  },
  {
    "type": "delete",
    "url": "/api/operator/v1/order/",
    "title": "cancel order",
    "version": "1.0.0",
    "name": "cancelOrder",
    "description": "<p>cancel order by id</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success: true, message: \"سفارش شما  لغو شد \", data: { status: true } }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ success: true, message: \"سفارش موجود نیست\", data: { status: false } }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/order.js",
    "groupTitle": "operator"
  },
  {
    "type": "put",
    "url": "/api/operator/v1/order/editAddress",
    "title": "editAddress",
    "name": "editAddress",
    "version": "1.0.0",
    "description": "<p>edit address of order</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adrs",
            "description": "<p>new address</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success: true, message: \"عملیات با موفقیت انجام شد\", data: { status: true } }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ success: true, message: \"سفارش موجود نیست\", data: { status: false } }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/order.js",
    "groupTitle": "operator"
  },
  {
    "type": "get",
    "url": "/api/operator/v1/customer/",
    "title": "get customer",
    "version": "1.0.0",
    "name": "getCustomer",
    "description": "<p>get customer .It gives you the customer information of the mobile you sent , if there is no customer with that mobile number it sends false. in &quot;orderStatus&quot; status: 2 means last order has registered in less than 40 minutes, status: 0 means last order has registered in more than 40 minutes or there is no order, status: 1 means the customer is blocked</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>customer mobile</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"اطلاعات مشتری با موفقیت ارسال شد\",\n     data: {\n         status: true,\n         cuatomer: {\n           family: \"مصطفایی\",\n           mobile: \"09625846122\",\n           locations: [...{\n             address: \"کلاهدوز 4\", \n             GPS: { type: \"Point\", coordinates: [-43.837452, 33.987689] }\n           }]\n         },\n         orderStatus: {\n           status: 2,\n           descriptionStatus: \"کاربر کمتر از 40 دقیقه قبل ثبت سفارش کرده است\",\n           orderInterval: 25,\n           orderState: \"در صف انتظار\"\n         }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: true,\n     message: \"مشتری موجود نیست\",\n     data: { status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/customer.js",
    "groupTitle": "operator"
  },
  {
    "type": "get",
    "url": "/api/operator/v1/order/",
    "title": "get order",
    "version": "1.0.0",
    "name": "getOrder",
    "description": "<p>get orders by id</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{  \n    success: true, \n    message: \"سفارشات با موفقیت ارسال شد\",\n    data: { \n      order: { \n            id: \"60b72a70e353f0385c2fe5af\", \n            customer: { family: \"مصطفایی\", mobile: \"09152631225\", },\n          products: [...{ \n                name: \"پپرونی\",  \n                quantity: 2,  \n                price: \"30000\",  \n                size: \"medium\", \n                discount: true  \n            }],\n          createdAt: \"2021-06-01T06:54:01.691Z\", \n            address: \"معلم 43\",  \n            status: { name: \"در صف انتظار\"}, \n            deliveryCost: 5000, \n            deliveryId: \"610545a7a5365707ccd6a308\",\n            paid: true  \n        },\n     deliveryLocation: {\n            _id: \"610668be772e0f31883fb280\", \n            lat: 38.066666, \n            lng: 46.299999, \n            date: \"2021-08-01T09:26:22.320Z\"\n        },\n        tax: 12750, \n        total: 72750,\n        discounts: 20000\n    }  \n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/order.js",
    "groupTitle": "operator"
  },
  {
    "type": "get",
    "url": "/api/operator/v1/order/product",
    "title": "get order products",
    "version": "1.0.0",
    "name": "getOrderProducts",
    "description": "<p>get order products</p>",
    "group": "operator",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"محصولات سفارش با موفقیت ارسال شد\",\n     data: {\n         status: true,\n         products: [...{\n             _id: \"60fd0aacca33dd0374b55650\",\n             name: \"نان سیر\",\n             description: \"سیر . خمیر تازه . اویشن\",\n             type: {_id: \"610916826f9446153c5e268d\", name: \"پیتزا\"},\n             size: [{ name: \"medium\", price: 50000, discount: 10000 }]\n         }],\n         types: [...{\n             name: \"پیتزا\",\n             _id: \"610916826f9446153c5e268d\"\n         }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/order.js",
    "groupTitle": "operator"
  },
  {
    "type": "get",
    "url": "/api/operator/v1/order/",
    "title": "get orders",
    "version": "1.0.0",
    "name": "getOrdersByFilter",
    "description": "<p>get orders by filter. send each of types you want</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>filter type (&quot;family&quot;, &quot;mobile&quot;, &quot;address&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>filter value</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{success: true, message: \"سفارشات با موفقیت ارسال شد\",data: [...{id: \"60b72a70e353f0385c2fe5af\",customer: {family: \"مصطفایی\",mobile: \"09152631225\",},createdAt: \"2021-06-01T06:54:01.691Z\", address: \"معلم 43\",status: { name: \"در صف انتظار\", status: 0}, paid: true }]}}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/order.js",
    "groupTitle": "operator"
  },
  {
    "type": "get",
    "url": "/api/operator/v1/order/delivery",
    "title": "get delivery location",
    "version": "1.0.0",
    "name": "getdeliveryLocation",
    "description": "<p>get order delivery location</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{success: true, message: \"موقعیت پیک با موفقیت ارسال شد\",data: {status: true, deliveryLocation: {_id: \"60b72a70e353f0385c2fe5af\",city: \"Mashhad\",geo : [ -49.555555, 39.555555],speed : 80, bearing: 32,saveDate: \"2021-08-01T09:26:22.320Z\" }}}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/order.js",
    "groupTitle": "operator"
  },
  {
    "type": "post",
    "url": "/api/operator/v1/app/info",
    "title": "app info",
    "version": "1.0.0",
    "name": "info",
    "description": "<p>app info . send 'Android' as os if you are on android</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "versionCode",
            "description": "<p>versionCode</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "os",
            "description": "<p>os</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  status: true,\n  message:\"اطلاعات نرم افزار فرستاده شد\",\n  data:{\n       status: true, \n       update: true, \n       isForce: false, \n       updateUrl: \"http://cafebazar.com/happypizza\",\n       pushId: 0,\n       pushToken: 0,\n       family: \"شکوهی\",\n       sipNumber: 0,\n       sipServer: 0,\n       sipPassword: 0\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   status: false,\n   message:\"کاربر بلاک می باشد\",\n   data:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/home.js",
    "groupTitle": "operator"
  },
  {
    "type": "post",
    "url": "/api/operator/v1/login",
    "title": "login",
    "version": "1.0.0",
    "name": "login",
    "description": "<p>login kitchen. for scope send 'operator'</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>operator mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scope",
            "description": "<p>operator scope</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>verification code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"کاربر با موفقیت وارد شد\",\n    data:{\n         idToken: idToken, \n         accessToken: accessToken,\n         status: true\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:true,\n     message:\"کاربر وارد نشد\",\n     data:{ status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/home.js",
    "groupTitle": "operator"
  },
  {
    "type": "post",
    "url": "/api/operator/v1/login/verificationcode",
    "title": "requset login verification Code",
    "version": "1.0.0",
    "name": "loginVerificationCode",
    "description": "<p>requset login verification Code. for scope send 'operator'</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>user mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "scope",
            "description": "<p>operator scope</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success:true,\n     message: \"کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد\",\n     data: { status: true }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:true,\n     message:\"کاربری با این شماره موبایل در دسترس نمی باشد\",\n     data: { status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/home.js",
    "groupTitle": "operator"
  },
  {
    "type": "post",
    "url": "/api/delivery/v1/register",
    "title": "register",
    "version": "1.0.0",
    "name": "register",
    "description": "<p>register operator. for scope send 'operator'</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>user password</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "family",
            "description": "<p>family</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "code",
            "description": "<p>verification code</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "scope",
            "description": "<p>operator scope</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"کاربر با موفقیت ثبت شد\",\n    data: {\n      status: true,\n      idToken: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6ImtpdGNoZW4iLCJpYXQiOjE2MjcyOTczMjYsImV4cCI6MTY1MzIxNzMyNiwiYXVkIjoiYXVkaWVuY2UiLCJpc3MiOiJpc3N1ZXIifQ.GauQ4Ls0Hz6aPkpaPyh7eXQGfRK9UAqxkrhW3GDu6I\",\n      accessToken: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBmZTk0MTIwYmU1ZTUzNmM4MWNiNzEzIiwidXNlcl9hY3RpdmUiOnRydWUsImlhdCI6MTYyNzI5NzMyNiwiZXhwIjoxNjQ4ODk3MzI2LCJhdWQiOiJhdWRpZW5jZSIsImlzcyI6Imlzc3VlciJ9.eO6JvCHPcoSFMPQ0wClsh7gsdZmGANs55x6x9hNc7u\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    success:true,\n    message:\"کاربری با این مشخصات موجود است\",\n    data:{ status: false }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/home.js",
    "groupTitle": "operator"
  },
  {
    "type": "post",
    "url": "/api/operator/v1/verificationcode",
    "title": "requset verification Code",
    "version": "1.0.0",
    "name": "verificationCode",
    "description": "<p>requset verification Code without scope for register</p>",
    "group": "operator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>user mobile</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success:true,\n     message: \"کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/operator/v1/home.js",
    "groupTitle": "operator"
  },
  {
    "type": "post",
    "url": "/api/user/v1/employee/application",
    "title": "add application",
    "version": "1.0.0",
    "name": "addApplication",
    "description": "<p>add application</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>employer mobile</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"درخواست با موفقیت ویرایش شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: false,\n     message: \"درخواستی موجود نیست\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/employee.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/v1/finance/bill",
    "title": "add bill",
    "version": "1.0.0",
    "name": "addBill",
    "description": "<p>add bill</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "name",
            "description": "<p>current cost name</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "cost",
            "description": "<p>current cost</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"هزینه جاری با موفقیت اضافه شد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/finance.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/v1/discount/",
    "title": "add discount",
    "version": "1.0.0",
    "name": "addDiscount",
    "description": "<p>add discount.</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "name",
            "description": "<p>product name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "customer",
            "description": "<p>customer mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "percentage",
            "description": "<p>discount percent (min=0, max=100)</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "type",
            "description": "<p>discount type (&quot;تولد&quot; or &quot;فرد&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "sms",
            "description": "<p>send sms boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"تخفیف با موفقیت ثبت شد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/discount.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/v1/order/",
    "title": "add order",
    "version": "1.0.0",
    "name": "addOrder",
    "description": "<p>add order: customer birthday and reminder are optional.all params are necessary and in case of no entry , there is a flag for each optional param.if that flag entered it asumed as no entry.birthday flag is &quot;1900-01-01T05:42:13.845Z&quot;.reminder flag and duration flag are -1.address flag is &quot; &quot;</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "products",
            "description": "<p>array of product objects</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "customer",
            "description": "<p>customer information</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "reminder",
            "description": "<p>number of days for reminding</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "duration",
            "description": "<p>minutes to the order become ready</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "address",
            "description": "<p>number of days for reminding</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    products: [...{\n        _id: \"60b72a70e353f0385c2fe5af\",\n        quantity: 2,\n        sellingPrice: \"30000\"\n    }],\n    customer: {\n        family: \"شکوهی\",\n        mobile: \"09307580142\",\n        birthday: \"2021-05-31T05:42:13.845Z\"\n    },\n    reminder: 7,\n    duration: 40,\n    address: \"معلم 24\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارش شما با موفقیت ثبت شد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/order.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/v1/order/status",
    "title": "add order status",
    "version": "1.0.0",
    "name": "addOrderStatus",
    "description": "<p>add order status</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "status",
            "description": "<p>order status status</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>order status name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>order status description</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"وضعیت سفارش با موفقیت اضافه شد\", \n     data: { status: true }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: true,\n     message : \"وضعیتی با این اطلاعات موجود است\", \n     data: {status: false}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/order.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/v1/product/",
    "title": "add product",
    "version": "1.0.0",
    "name": "addProduct",
    "description": "<p>add product.all params are necessary and in case of no entry , there is a flag in parantheses for each optional param.if that flag entered it asumed as no entry</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "name",
            "description": "<p>product name</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "sellingPrice",
            "description": "<p>product selling price</p>"
          },
          {
            "group": "Parameter",
            "type": "varachar",
            "optional": false,
            "field": "description",
            "description": "<p>description of product (&quot; &quot;)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"محصول شما با موفقیت ثبت شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n     success : false, \n     message : \"محصول وارد شده، موجود است\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/product.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/v1/employee/block",
    "title": "block unblock employee",
    "version": "1.0.0",
    "name": "blockEmployee",
    "description": "<p>add application</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>employer mobile</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"درخواست با موفقیت ویرایش شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: false,\n     message: \"درخواستی موجود نیست\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/employee.js",
    "groupTitle": "user"
  },
  {
    "type": "put",
    "url": "/api/user/v1/employee/application",
    "title": "edit employee application",
    "version": "1.0.0",
    "name": "editApplication",
    "description": "<p>edit employee application, in status : send 1 for in progress, 2 for hired, 3 for closed application.</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "status",
            "description": "<p>application status</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "applicationId",
            "description": "<p>application id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"درخواست با موفقیت ویرایش شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: false,\n     message: \"درخواستی موجود نیست\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/employee.js",
    "groupTitle": "user"
  },
  {
    "type": "put",
    "url": "/api/user/v1/employee",
    "title": "edit employee",
    "version": "1.0.0",
    "name": "editEmployee",
    "description": "<p>change employee permission</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "_id",
            "description": "<p>employee id</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "permissions",
            "description": "<p>object exactly like it is sent</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"دسترسی های کارمند خواسته شده با موفقیت تغییر پیدا کرد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    success: false,\n    message: \"دسترسی های کارمند خواسته شده با موفقیت تغییر پیدا نکرد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/employee.js",
    "groupTitle": "user"
  },
  {
    "type": "put",
    "url": "/api/user/v1/settings/sms",
    "title": "edit sms settings",
    "version": "1.0.0",
    "name": "editOrderSettings",
    "description": "<p>edit sms settings, type 1 is customer sms after adding order, type 2 is customer info for delivery, type 3 ic acknowledge for customer that your product is sent.</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "description": "<p>sms type , {min:1, max:3}</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "text",
            "description": "<p>sms text</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "status",
            "description": "<p>sms status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"ویرایش با موفقیت انجام شد\"",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/settings.js",
    "groupTitle": "user"
  },
  {
    "type": "put",
    "url": "/api/user/v1/order/status",
    "title": "edit order status",
    "version": "1.0.0",
    "name": "editOrderStatus",
    "description": "<p>edit order status, in status : send 0 for normal order , send 2 to cancele the order</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "status",
            "description": "<p>order status</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"وضعیت سفارش با موفقیت ویرایش شد\"",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/order.js",
    "groupTitle": "user"
  },
  {
    "type": "put",
    "url": "/api/user/v1/product/",
    "title": "edit product",
    "version": "1.0.0",
    "name": "editProduct",
    "description": "<p>edit product: all params must be sent even if they don't have any changes.all params are necessary and in case of no entry , there is a flag in parantheses for each optional param.if that flag entered it asumed as no entry</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "_id",
            "description": "<p>product id</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "active",
            "description": "<p>product activity status</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "name",
            "description": "<p>product name</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "sellingPrice",
            "description": "<p>product selling price</p>"
          },
          {
            "group": "Parameter",
            "type": "varachar",
            "optional": false,
            "field": "description",
            "description": "<p>description of product (&quot; &quot;)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"محصول شما با موفقیت ویرایش شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n     success : false, \n     message : \"محصول وارد شده، موجود نیست\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/product.js",
    "groupTitle": "user"
  },
  {
    "type": "put",
    "url": "/api/user/v1/order/sms",
    "title": "edit sms settings",
    "version": "1.0.0",
    "name": "editSms",
    "description": "<p>edit sms settings, type 1 is customer sms after adding order, type 2 is customer info for delivery, type 3 ic acknowledge for customer that your product is sent.</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "description": "<p>sms type , {min:1, max:3}</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "text",
            "description": "<p>sms text</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "status",
            "description": "<p>sms status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"ویرایش با موفقیت انجام شد\"",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/order.js",
    "groupTitle": "user"
  },
  {
    "type": "put",
    "url": "/api/user/v1/account",
    "title": "edit user account",
    "version": "1.0.0",
    "name": "editUserAccount",
    "description": "<p>edit user account: only send one of the params, company param is for employers</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "family",
            "description": "<p>user family</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "address",
            "description": "<p>user address</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "company",
            "description": "<p>user company, available for employers only</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"اطلاعات کاربر با موفقیت ویرایش شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    success: false,\n    message: \"اطلاعات وارد شده صحیح نمی باشد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/account.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/employee/application",
    "title": "get employees applications",
    "version": "1.0.0",
    "name": "getApplications",
    "description": "<p>get employees applications</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"ارسال درخواست ها با موفقیت انجام شد\",\n    data: \n     {\n         \"_id\": \"60d9ce1bef1e876eb29265cf\",\n         \"active\": true,\n         \"status\": 1,\n         \"employer\": \"60d9ce1bef1e876eb29278c4\",\n         \"employee\": {\n             \"_id\": \"\",\n             \"family\": \"شکوهی\",\n             \"mobile\": \"09307580142\"\n         },\n         \"createdAt\": \"2021-06-01T06:54:01.691Z\",\n         \"updatedAt\": \"2021-06-01T06:54:01.691Z\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/employee.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/finance/bill",
    "title": "get bills",
    "version": "1.0.0",
    "name": "getBills",
    "description": "<p>get bills</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"هزینه های جاری با موفقیت ارسال شد\",\n    data: [...{\n         active: true,\n         name: \"اجاره\",\n         cost: \"2000000\",\n         createdAt: \"2021-06-01T06:54:01.691Z\"\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/finance.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/customer/",
    "title": "get customer",
    "version": "1.0.0",
    "name": "getCustomer",
    "description": "<p>get customer .It gives you the customer information of the mobile you sent , if there is no customer with that mobile number it sends false</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>customer mobile</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"اطلاعات مشتری با موفقیت ارسال شد\",\n     data: {\n         family: \"مصطفایی\",\n         mobile: \"09625846122\",\n         birthday: \"1990-12-18T23:59:00.798Z\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: false,\n     message: \"مشتری موجود نیست\",\n     data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/customer.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/customer/",
    "title": "get customers",
    "version": "1.0.0",
    "name": "getCustomers",
    "description": "<p>get customers . respnse description: by &quot;order&quot; field we meant order length, &quot;lastBuy&quot; is the date of the customer last buy,and &quot;total&quot; is the total price of all customer orders. all params are necessary and in case of no entry , there is a flag in parantheses for each param.if that flag entered it asumed as no entry</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "family",
            "description": "<p>customer family (&quot; &quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>customer mobile (&quot;0&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "createdAtFrom",
            "description": "<p>customer membership from this date (&quot;1900-01-01T05:42:13.845Z&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "createdAtTo",
            "description": "<p>customer membership until this date (&quot;1900-01-01T05:42:13.845Z&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "lastBuyFrom",
            "description": "<p>customer last buy from this date (&quot;1900-01-01T05:42:13.845Z&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "lastBuyTo",
            "description": "<p>customer last buy until this date (&quot;1900-01-01T05:42:13.845Z&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "orderFrom",
            "description": "<p>minimum number of orders (&quot;0&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "orderTo",
            "description": "<p>maximum number of orders (&quot;0&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "totalFrom",
            "description": "<p>minimum total price of all orders of customer (&quot;0&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "totalTo",
            "description": "<p>maximum total price of all orders of customer (&quot;0&quot;)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"اطلاعات مشتریان با موفقیت ارسال شد\",\n     data: [...{\n         active: true,\n         family: \"مصطفایی\",\n         mobile: \"09625846122\",\n         birthday: \"1990-12-18T23:59:00.798Z\",\n         createdAt: \"2010-12-18T23:59:00.798Z\",\n         order: 4,\n         lastBy: \"2021-12-18T23:59:00.798Z\",\n         total: 270000\n      }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/customer.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/discount/",
    "title": "get discounts",
    "version": "1.0.0",
    "name": "getDiscounts",
    "description": "<p>get discounts.There is only 2 types: &quot;تولد&quot; and &quot;فرد&quot; ,if the type be &quot;تولد&quot; then we don't have customer field otherwise we have customer.</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"لیست تخفیف ها با موفقیت ارسال شد\",\n     data: [...{\n         active: true,\n         name: \"ولنتاین\" ,\n         type: \"فرد\",\n         percentage: 20,\n         sms: true,\n         customer: \"60b72a70e353f0385c2fe5af\"\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/discount.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/employee/types",
    "title": "get employee types",
    "version": "1.0.0",
    "name": "getEmployeeTypes",
    "description": "<p>get employee types</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"کارمندان با موفقیت فرستاده شدند\"و\n    data: [...{\n         _id: '60d9ce1bef1e876eb29265cf',\n         family: 'علی رضایی',\n         mobile: '093012342',\n         permission: [...{\n             no: 1,\n             status: true\n         }]\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/employee.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/employee",
    "title": "get employees",
    "version": "1.0.0",
    "name": "getEmployees",
    "description": "<p>get employees</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"کارمندان با موفقیت فرستاده شدند\"و\n    data: [...{\n         _id: '60d9ce1bef1e876eb29265cf',\n         family: 'علی رضایی',\n         mobile: '093012342',\n         permission: [...{\n             no: 1,\n             status: true\n         }]\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/employee.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/employee/permission",
    "title": "get employees permissions",
    "version": "1.0.0",
    "name": "getEmployeesPermission",
    "description": "<p>get employees permission, employees only get the status part in response</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"با موفقیت انجام شد\",\n    data: \n     {\n        permission: { \n            addOrder: true,\n            getOrders: true,\n            reminder: true,\n            getProducts: true,\n            finance: true,\n            getCustomers: true,\n            getEmployees: true,\n            getDiscounts: true\n          },\n        type: 1,\n        status: 3\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/employee.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/finance/summary",
    "title": "get finance summary",
    "version": "1.0.0",
    "name": "getFinanceSummary",
    "description": "<p>get finance summary , by summary we meant income and outcome in toman</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"مجموع درامد ها و مخارج با موفقیت ارسال شد\",\n    data: {\n        income: \"1500000\",\n        outcome: \"1000000\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/finance.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/settings/order",
    "title": "get order settings",
    "version": "1.0.0",
    "name": "getOrderSettings",
    "description": "<p>get order settings</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"تنظیمات سفارش با موفقیت فرستاده شد\",\n     data: {\n         addOrderSms: {\n             text: \"سفارش شما با موفقیت ثبت شد.\\n ورود : \\n http://happypizza.ir\", \n             status: true\n         },\n            confirmTime: 1,\n            cookTime: 8,\n            finishedOrderSms: {\n                text: \"سفارش شما به مقصد رسید. از اعتماد شما به هپی پیتزا ممنونیم. منتظر سفارش های بعدی شما هستیم.\", \n                status: true\n            },\n            inCookingOrderSms: {\n                text: \"سفارش شما در حال پخت می باشد.\", \n                status: true\n            },\n            inProcessOrderSms: {\n                text: \"سفارش شما در حال آماده سازی است.\", \n                status: true\n            },\n            inServiceOrderSms: {\n                text: \"سفارش شما در حال ارسال است.\", \n                status: true\n            },\n            isPayNecessary: false,\n            successfullPaymentSms: {\n                text: \"سفارش شما با موفقیت پرداخت شد.\", \n                status: true\n            }\n        }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/settings.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/order/",
    "title": "get orders",
    "version": "1.0.0",
    "name": "getOrders",
    "description": "<p>get orders : all params are necessary and in case of no entry , there is a flag for each optional param.if that flag entered it asumed as no entry.</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "customerName",
            "description": "<p>customer family (&quot; &quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "customerMobile",
            "description": "<p>customer mobile number (&quot;0&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "startDate",
            "description": "<p>get orders from this date (&quot;1900-01-01T05:42:13.845Z&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "endDate",
            "description": "<p>get orders to this date (&quot;1900-01-01T05:42:13.845Z&quot;)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارشات با موفقیت ارسال شد\",\n     data: [...{\n         active: true,\n         id: \"60b72a70e353f0385c2fe5af\",\n         products: [...{\n             _id: \"60b72a70e353f0385c2fe5af\",\n             name: \"لاته\",\n             quantity: 2,\n             sellingPrice: \"30000\"\n         }],\n         customer: {\n             _id: \"7465148754878\",\n             family: \"مصطفایی\",\n             mobile: \"09152631225\",\n             createdAt: \"2021-06-01T06:54:01.691Z\"\n         },\n        createdAt: \"2021-06-01T06:54:01.691Z\",\n        updatedAt: \"2021-06-01T06:54:01.691Z\"\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/order.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/product/",
    "title": "get product tyoes",
    "version": "1.0.0",
    "name": "getProductTypes",
    "description": "<p>get product tyoes</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"تایپ های محصولات با موفقیت ارسال شد\",\n     data: [...{\n         active: true,\n         name: \"روغن\" ,\n         sellingPrice: \"100000\",\n         description: \"خریداری شده از شرکت روغن سازان مشهد\"\n         createdAt: \"2021-06-01T06:54:01.691Z\"\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/product.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/product/",
    "title": "get products",
    "version": "1.0.0",
    "name": "getProducts",
    "description": "<p>get products</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"محصولات با موفقیت ارسال شد\",\n     data: [...{\n         active: true,\n         name: \"روغن\" ,\n         sellingPrice: \"100000\",\n         description: \"خریداری شده از شرکت روغن سازان مشهد\"\n         createdAt: \"2021-06-01T06:54:01.691Z\"\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/product.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/reminder",
    "title": "get reminders",
    "version": "1.0.0",
    "name": "getReminder",
    "description": "<p>get Reminder: sends reminders of today.birthday of the customer may not be send because it's optional in the first place.</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"لیست یادآوری با موفقیت ارسال شد\",\n    data: {...[\n         date: '2021-06-22T12:30:36.747Z',\n         customer: {\n             _id: '60d030e8716abd4c9428d373',\n             family: 'شکوهی',\n             mobile: '09307580142',\n             birthday: '2021-05-31T05:42:13.845Z'\n         },\n         order: {\n             _id: '60d3296cc29f9d1898abb62a',\n             active: true,\n             creadtedAt: '2021-06-23T12:30:36.679Z',\n             customer: '60d030e8716abd4c9428d373',\n             products:{...[\n                 _id: '60b72a70e353f0385c2fe5af',\n                 name: 'آیس لته',\n                 quantity: 1,\n                 sellingPrice: '30000'\n             ]}\n         }\n     ]}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/reminder.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/order/sms",
    "title": "get sms messages and status",
    "version": "1.0.0",
    "name": "getSms",
    "description": "<p>get sms messages and status</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"با موفقیت انجام شد\",\n     data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/order.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/v1/account",
    "title": "get user account",
    "version": "1.0.0",
    "name": "getUserAccount",
    "description": "<p>get user account. قسمت کارفرما بسته به کارمند یا کارفرما بودن کاربر ممکن است خالی باشد</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"اطلاعات کاربر با موفقیت ارسال شد\",\n    data: {\n         active: true,\n         _id: \"60d72865519b311c905f9566\",\n         family: \"شکوهی\",\n         password: \"reihaneh@123\",\n         email: \"r.shokouhi@gmail.com\",\n         mobile: \"09307580142\",\n         employer: {\n             _id: \"60d72865519b311c905f9566\",\n             family: \"مصطفایی\",\n             company: \"teamx\"\n         }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/account.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/v1/app/info",
    "title": "app info",
    "version": "1.0.0",
    "name": "info",
    "description": "<p>app info</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "versionCode",
            "description": "<p>versionCode</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "os",
            "description": "<p>os</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  status: true,\n  message:\"اطلاعات نرم افزار فرستاده شد\",\n  data:{\n      update:false,\n      updateUrl:\"http://cafebazar.com/ir.team-x.ir/mohsenapp,\n      force:false\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   status: false,\n   message:\"کاربر بلاک می باشد\",\n   data:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/home.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/v1/login",
    "title": "login",
    "version": "1.0.0",
    "name": "login",
    "description": "<p>login user</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobileOrEmail",
            "description": "<p>user mobile or email</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>user password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"کاربر با موفقیت وارد شد\",\n    data:{\n         idToken: idToken, \n         accessToken: accessToken\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:false,\n     message:\"کاربر وارد نشد\",\n     data:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/home.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/v1/",
    "title": "register",
    "version": "1.0.0",
    "name": "register",
    "description": "<p>register user.all params are necessary and in case of no entry , there is a flag in parantheses for each optional param.if that flag entered it asumed as no entry. position 1 means employer and position 2 means employee.</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>user password</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "family",
            "description": "<p>family</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "email",
            "description": "<p>email (&quot;a@a.com&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "code",
            "description": "<p>verification code</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "position",
            "description": "<p>user position: employee(2) or employer(1)</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "companyName",
            "description": "<p>company name: required for employer only</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "companyAddress",
            "description": "<p>company address: required for employer only</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "employerMobile",
            "description": "<p>employer mobile: required for employee only</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"کاربر با موفقیت ثبت شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    success:false,\n    message:\"کاربری با این مشخصات موجود است\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/home.js",
    "groupTitle": "user"
  },
  {
    "type": "delete",
    "url": "/api/user/v1/employee",
    "title": "remove employee",
    "version": "1.0.0",
    "name": "removeEmployee",
    "description": "<p>remove employee by id</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "_id",
            "description": "<p>employee id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"کارمند خواسته شده با موفقیت حذف شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    success: false,\n    message: \"کارمند خواسته شده حذف نشد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/employee.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/v1/order/delivery/sms",
    "title": "send delivery sms",
    "version": "1.0.0",
    "name": "sendDeliverySms",
    "description": "<p>send delivery sms,</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>delivery mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "orderId",
            "description": "<p>order id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"وضعیت سفارش با موفقیت ویرایش شد\"",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/order.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/v1/verificationcode",
    "title": "requset verification Code",
    "version": "1.0.0",
    "name": "verificationCode",
    "description": "<p>requset verification Code</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>user mobile</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success:true,\n     message: \"کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:false,\n     message:\"کاربری با این شماره موبایل در دسترس نمی باشد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/home.js",
    "groupTitle": "user"
  }
] });
