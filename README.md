# Netflux (front) documentation

## Admin access

An admin account is required to access the administration panel at `/admin`. 

If you are not an admin, you can still access the API and use the public endpoints, but you are blocked from adding/editing/deleting data. Technically, you should not even be able to access the administration panel if you're not logged in as admin: every access is conditionnaly removed and there is a navigation guard that prevents you from accessing it by typing the URL manually.

Fortunately, if Symfony fixtures have been injected into the database, the administrator account is automatically created with the following login and password:
* Login : admin@localhost.com
* Pass : admin

## Vue project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
