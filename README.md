# node rest api

## GET /api/contacts
returns 
```json
[{
    "id": "e6ywwRe4jcqxXfCZOj_1e",
    "name": "Thomas Lucas",
    "email": "nec@Nulla.com",
    "phone": "(704) 398-7993"
}]
```

## GET /api/contacts/:id
returns 
```json
{
    "id": "e6ywwRe4jcqxXfCZOj_1e",
    "name": "Thomas Lucas",
    "email": "nec@Nulla.com",
    "phone": "(704) 398-7993"
}
```

## DELETE /api/contacts/:id
returns 
```json
{
    "id": "e6ywwRe4jcqxXfCZOj_1e",
    "name": "Thomas Lucas",
    "email": "nec@Nulla.com",
    "phone": "(704) 398-7993"
}
```

## PATCH /api/contacts/:id/favorite
accept 
```json
{
    "favorite": true
}
```
returns 
```json
{
    "id": "e6ywwRe4jcqxXfCZOj_1e",
    "name": "Thomas Lucas",
    "email": "nec@Nulla.com",
    "phone": "(704) 398-7993"
}
```

## POST /api/contacts
accept 
```json
{
    "name": "Thomas Lucas",
    "email": "nec@Nulla.com",
    "phone": "(704) 398-7993"
}
```
returns 
```json
{
    "id": "e6ywwRe4jcqxXfCZOj_1e",
    "name": "Thomas Lucas",
    "email": "nec@Nulla.com",
    "phone": "(704) 398-7993"
}
```

## PUT /api/contacts/:id
accept 
```json 
{
    "name": "Thomas Lucas"
}
```
returns 
```json 
{
    "id": "e6ywwRe4jcqxXfCZOj_1e",
    "name": "Thomas Lucas",
    "email": "nec@Nulla.com",
    "phone": "(704) 398-7993"
}
```
