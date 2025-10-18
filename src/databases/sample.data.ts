export const ADMIN_ROLE = "SUPER_ADMIN";
export const USER_ROLE = "NORMAL_USER";

export const INIT_PERMISSIONS = [
  {
    "_id": "648ab6d3fa16b294212e4033",
    "name": "Create User",
    "apiPath": "/api/users",
    "method": "POST",
    "module": "USERS",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T06:59:31.898Z",
    "updatedAt": "2023-06-15T06:59:31.898Z",
    "__v": 0
  },
  {
    "_id": "648ab6e7fa16b294212e4038",
    "name": "Get User by Id",
    "apiPath": "/api/users/:_id",
    "method": "GET",
    "module": "USERS",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T06:59:51.041Z",
    "updatedAt": "2023-06-15T06:59:51.041Z",
    "__v": 0
  },
  {
    "_id": "648ab6fdfa16b294212e403d",
    "name": "Get User with paginate",
    "apiPath": "/api/users",
    "method": "GET",
    "module": "USERS",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T07:00:13.364Z",
    "updatedAt": "2023-06-15T07:00:13.364Z",
    "__v": 0
  },
  {
    "_id": "648ab719fa16b294212e4042",
    "name": "Update User",
    "apiPath": "/api/users/:_id",
    "method": "PATCH",
    "module": "USERS",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T07:00:41.934Z",
    "updatedAt": "2023-06-15T07:00:41.934Z",
    "__v": 0
  },
  {
    "_id": "648ab728fa16b294212e4047",
    "name": "Delete User",
    "apiPath": "/api/users/:_id",
    "method": "DELETE",
    "module": "USERS",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T07:00:56.274Z",
    "updatedAt": "2023-06-15T07:00:56.274Z",
    "__v": 0
  },
  {
    "_id": "648ab750fa16b294212e404c",
    "name": "Upload Single File",
    "apiPath": "/api/files/upload",
    "method": "POST",
    "module": "FILES",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T07:01:36.923Z",
    "updatedAt": "2023-06-15T07:01:36.923Z",
    "__v": 0
  },
  {
    "_id": "648ad59adafdb9754f40b881",
    "name": "Create a permission",
    "apiPath": "/api/permissions",
    "method": "POST",
    "module": "PERMISSIONS",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T09:10:50.946Z",
    "updatedAt": "2023-06-15T09:10:50.946Z",
    "__v": 0
  },
  {
    "_id": "648ad5aedafdb9754f40b886",
    "name": "Fetch Permission with paginate",
    "apiPath": "/api/permissions",
    "method": "GET",
    "module": "PERMISSIONS",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T09:11:10.914Z",
    "updatedAt": "2023-06-15T09:11:10.914Z",
    "__v": 0
  },
  {
    "_id": "648ad5c5dafdb9754f40b88b",
    "name": "Fetch permission by _id",
    "apiPath": "/api/permissions/:_id",
    "method": "GET",
    "module": "PERMISSIONS",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T09:11:33.234Z",
    "updatedAt": "2023-06-15T09:11:33.234Z",
    "__v": 0
  },
  {
    "_id": "648ad5d4dafdb9754f40b890",
    "name": "Update a permission",
    "apiPath": "/api/permissions/:_id",
    "method": "PATCH",
    "module": "PERMISSIONS",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T09:11:48.081Z",
    "updatedAt": "2023-06-15T09:11:48.081Z",
    "__v": 0
  },
  {
    "_id": "648ad5ebdafdb9754f40b895",
    "name": "Delete a permission",
    "apiPath": "/api/permissions/:_id",
    "method": "DELETE",
    "module": "PERMISSIONS",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T09:12:11.323Z",
    "updatedAt": "2023-06-15T09:12:11.323Z",
    "__v": 0
  },
  {
    "_id": "648ad613dafdb9754f40b89a",
    "name": "Create Role",
    "apiPath": "/api/roles",
    "method": "POST",
    "module": "ROLES",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T09:12:51.974Z",
    "updatedAt": "2023-06-15T09:12:51.974Z",
    "__v": 0
  },
  {
    "_id": "648ad622dafdb9754f40b89f",
    "name": "Fetch roles with paginate",
    "apiPath": "/api/roles",
    "method": "GET",
    "module": "ROLES",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T09:13:06.618Z",
    "updatedAt": "2023-06-15T09:13:06.618Z",
    "__v": 0
  },
  {
    "_id": "648ad630dafdb9754f40b8a6",
    "name": "Fetch role by _id",
    "apiPath": "/api/roles/:_id",
    "method": "GET",
    "module": "ROLES",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T09:13:20.853Z",
    "updatedAt": "2023-06-15T09:13:20.853Z",
    "__v": 0
  },
  {
    "_id": "648ad640dafdb9754f40b8ab",
    "name": "Update Role",
    "apiPath": "/api/roles/:_id",
    "method": "PATCH",
    "module": "ROLES",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T09:13:36.836Z",
    "updatedAt": "2023-06-15T09:13:36.836Z",
    "__v": 0
  },
  {
    "_id": "648ad650dafdb9754f40b8b0",
    "name": "Delete a Role",
    "apiPath": "/api/roles/:_id",
    "method": "DELETE",
    "module": "ROLES",
    "createdBy": {
      "_id": "68d2511bf6e8e46b1308d514",
      "email": "admin@gmail.com"
    },
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2023-06-15T09:13:52.798Z",
    "updatedAt": "2023-06-15T09:13:52.798Z",
    "__v": 0
  }
]