# Netflux (front) documentation

## Vue project setup
```
npm install
```

### Server start
```
npm run serve
```

## Authentication

### Admin access

An admin account is required to access the administration panel at `/admin`. 

If you are not an admin, you can still access the API and use the public endpoints, but you are blocked from adding/editing/deleting data. Technically, you should not even be able to access the administration panel if you're not logged in as an admin: every access is conditionnaly removed and a navigation guard prevents you from accessing the url, even if you type it manually.

Fortunately, if the Symfony fixtures have been injected into the database on the backend side, an administrator account is automatically created with the following login and password:
* Login : `admin@localhost.com`
* Pass : `admin`

### User access

In order to test the app from a user perspective (allowing you to comment and like movies), you can either create a new account or use one of the 5 dummy accounts injected by the fixtures:
* Login : `user1@mail.com`
* Pass : `test`

If you stay inactive too long (resulting in the BEARER cookie expiring), your account is automatically disconnected and you have to login again.

## Notifications

The front-end uses [Vue Toastification](https://github.com/Maronato/vue-toastification) for notifications. You may need to install it manually:

```
$ npm install --save vue-toastification@next
```
