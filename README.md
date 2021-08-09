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

