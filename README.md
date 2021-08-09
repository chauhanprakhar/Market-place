## Available Scripts

You can run this project by following commands in project directory

### Install node dependencies
```shell
 npm install
```

## API Endpoints

### POST http://localhost:5000/api/auth/login
```shell
{
    "email":"",
    "password":""
}
```

### POST  http://localhost:5000/api/auth/register
```shell
{
    "name":"",
    "email":"",
    "password":"",
    "role":"Buyer/Seller"
}
```


## Set token in headers as "Authorization" "Bearer token" to execute below apis

### GET  http://localhost:5000/api/buyer/list-of-sellers
```shell
{

}
```

### POST  http://localhost:5000/api/seller/create-catalog
```shell
[
    {
        "title":"",
        "addedBy":"seller_id"
    },
    {
        "title":"",
        "addedBy":"seller_id"

    }
]
```

### POST  http://localhost:5000/api/buyer/create-order
```shell
[
    {
  "productId":"product_id",
  "orderedBy":"buyer_id",
  "sellerId":"seller_id"
  },
  {
  "productId":"product_id",
  "orderedBy":"buyer_id",
  "sellerId":"seller_id"
   }
]
```

### GET  http://localhost:5000/api/buyer/seller-catalog/:seller_id
```shell

```

### GET  http://localhost:5000/api/seller/orders
```shell

```










<img width="628" alt="29a" src="https://user-images.githubusercontent.com/54539712/128727362-2549f640-b1bd-41be-a858-0fbc98ede058.png">
<img width="653" alt="30a" src="https://user-images.githubusercontent.com/54539712/128727391-c43a30b6-1ab8-4cf0-8b62-3d901064d3c9.png">
<img width="867" alt="31" src="https://user-images.githubusercontent.com/54539712/128727434-180cab2b-4054-43c9-87db-fe88299f1720.png">
<img width="871" alt="32" src="https://user-images.githubusercontent.com/54539712/128727459-236f844f-5525-4f21-99ae-d5912961338f.png"><img width="884" alt="34" src="https://user-images.githubusercontent.com/54539712/128727655-895ee878-a998-4eb4-bdfd-4e8d5b45bc3c.png">

<img width="650" alt="35a" src="https://user-images.githubusercontent.com/54539712/128727525-71d3db91-b98e-4bee-b05f-2562480d0bc5.png">
