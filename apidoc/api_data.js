define({ "api": [
  {
    "type": "get",
    "url": "/api/user/v1/customer/",
    "title": "get customers",
    "version": "1.0.0",
    "name": "getCustomers",
    "description": "<p>get customers . respnse description: by &quot;order&quot; field we meant order length, &quot;lastBuy&quot; is the date of the customer last buy,and &quot;total&quot; is the total price of all customer orders. all params are necessary and in case of no entry , there is a flag in parantheses for each param.if that flag entered it asumed as no entry</p>",
    "group": "customer",
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
    "groupTitle": "customer"
  },
  {
    "type": "post",
    "url": "/api/user/v1/employee",
    "title": "add employee",
    "version": "1.0.0",
    "name": "addEmployee",
    "description": "<p>add employee</p>",
    "group": "employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "usernameOrMobile",
            "description": "<p>employee username or mobile</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"کاربر با موفقیت به اشتراک گذاشته شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    success: false,\n    message: \"کاربر موجود نمی باشد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/employee.js",
    "groupTitle": "employee"
  },
  {
    "type": "post",
    "url": "/api/user/v1/finance/bill",
    "title": "add bill",
    "version": "1.0.0",
    "name": "addBill",
    "description": "<p>add bill</p>",
    "group": "finance",
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
    "groupTitle": "finance"
  },
  {
    "type": "get",
    "url": "/api/user/v1/finance/bill",
    "title": "get bills",
    "version": "1.0.0",
    "name": "getBills",
    "description": "<p>get bills</p>",
    "group": "finance",
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
    "groupTitle": "finance"
  },
  {
    "type": "get",
    "url": "/api/user/v1/finance/summary",
    "title": "get finance summary",
    "version": "1.0.0",
    "name": "getFinanceSummary",
    "description": "<p>get finance summary , by summary we meant income and outcome in toman</p>",
    "group": "finance",
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
    "groupTitle": "finance"
  },
  {
    "type": "get",
    "url": "/api/user/v1/",
    "title": "get user info.",
    "version": "1.0.0",
    "name": "getUser",
    "description": "<p>get user info. قسمت کارمندان یا کارفرما بسته به کارمند یا کارفرما بودن کاربر ممکن است خالی باشد</p>",
    "group": "home",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"اطلاعات کاربر با موفقیت ارسال شد\",\n    data: {\n         active: true,\n         name: \"ریحانه\",\n         family: \"شکوهی\",\n         username: \"r.shokouhi@gmail.com\",\n         password: \"reihaneh@123\",\n         email: \"r.shokouhi@gmail.com\",\n         mobile: \"09307580142\",\n         company: \"teamx\",\n         employer: {\n             name: \"محسن\",\n             family: \"مصطفایی\",\n             username: \"m.mostafaie@gmail.com\"\n         },\n         employee: [...{\n             _id: \"60b49ed8293793335c4875f8\",\n             name: \"زهرا\",\n             family: \"کریمی\",\n             username: \"z.karimi@gmail.com\"\n         }],\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/home.js",
    "groupTitle": "home"
  },
  {
    "type": "post",
    "url": "/api/user/v1/app/info",
    "title": "app info",
    "version": "1.0.0",
    "name": "info",
    "description": "<p>app info</p>",
    "group": "home",
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
    "groupTitle": "home"
  },
  {
    "type": "post",
    "url": "/api/user/v1/login",
    "title": "login",
    "version": "1.0.0",
    "name": "login",
    "description": "<p>login user</p>",
    "group": "home",
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
    "groupTitle": "home"
  },
  {
    "type": "post",
    "url": "/api/user/v1/",
    "title": "register",
    "version": "1.0.0",
    "name": "register",
    "description": "<p>register user.all params are necessary and in case of no entry , there is a flag in parantheses for each optional param.if that flag entered it asumed as no entry</p>",
    "group": "home",
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
            "description": "<p>email</p>"
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
            "field": "company",
            "description": "<p>company name (&quot; &quot;)</p>"
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
    "groupTitle": "home"
  },
  {
    "type": "post",
    "url": "/api/user/v1/order/",
    "title": "add order",
    "version": "1.0.0",
    "name": "addOrder",
    "description": "<p>add order: customer birthday is also optional</p>",
    "group": "order",
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
            "type": "varchar",
            "optional": true,
            "field": "description",
            "description": "<p>order description</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": true,
            "field": "reminder",
            "description": "<p>number of days for reminding</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    products: [...{\n        _id: \"60b72a70e353f0385c2fe5af\",\n        quantity: 2,\n        sellingPrice: \"30000\"\n    }],\n    customer: {\n        family: \"شکوهی\",\n        mobile: \"09307580142\",\n        birthday: \"2021-05-31T05:42:13.845Z\"\n    },\n    description: \"الکل هم بیاورید\",\n    reminder: 7\n}",
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
    "groupTitle": "order"
  },
  {
    "type": "get",
    "url": "/api/user/v1/order/",
    "title": "get orders",
    "version": "1.0.0",
    "name": "getOrders",
    "description": "<p>get orders : all the params get as req.params</p>",
    "group": "order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "customerName",
            "description": "<p>customer family</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "customerMobile",
            "description": "<p>customer mobile number</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "startDate",
            "description": "<p>get orders from this date</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "endDate",
            "description": "<p>get orders to this date</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success: true,\n     message: \"سفارشات با موفقیت ارسال شد\",\n     data: [...{\n         active: true,\n         products: [...{\n             _id: \" 60b72a70e353f0385c2fe5af\",\n             name: \"لاته\",\n             quantity: 2,\n             sellingPrice: \"30000\"\n         }],\n         customer: {\n             _id: \"7465148754878\",\n             family: \"مصطفایی\",\n             mobile: \"09152631225\",\n             createdAt: \"2021-06-01T06:54:01.691Z\"\n         },\n        createdAt: \"2021-06-01T06:54:01.691Z\",\n        updatedAt: \"2021-06-01T06:54:01.691Z\"\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/order.js",
    "groupTitle": "order"
  },
  {
    "type": "post",
    "url": "/api/user/v1/product/",
    "title": "add product",
    "version": "1.0.0",
    "name": "addProduct",
    "description": "<p>add product</p>",
    "group": "product",
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
            "optional": true,
            "field": "description",
            "description": "<p>description of product</p>"
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
    "groupTitle": "product"
  },
  {
    "type": "put",
    "url": "/api/user/v1/product/",
    "title": "edit product",
    "version": "1.0.0",
    "name": "editProduct",
    "description": "<p>edit product: all params must be sent even if they don't have any changes</p>",
    "group": "product",
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
            "optional": true,
            "field": "description",
            "description": "<p>description of product</p>"
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
    "groupTitle": "product"
  },
  {
    "type": "get",
    "url": "/api/user/v1/product/",
    "title": "get products",
    "version": "1.0.0",
    "name": "getProducts",
    "description": "<p>get products</p>",
    "group": "product",
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
    "groupTitle": "product"
  },
  {
    "type": "get",
    "url": "/api/user/v1/reminder",
    "title": "get reminders",
    "version": "1.0.0",
    "name": "getReminder",
    "description": "<p>get Reminder</p>",
    "group": "reminder",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"لیست یادآوری با موفقیت ارسال شد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/reminder.js",
    "groupTitle": "reminder"
  }
] });
