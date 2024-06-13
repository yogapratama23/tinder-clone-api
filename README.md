
# Tinder Clone  
### How to start the service
```
  clone the repo
  cd into repo
  npm install
  create a .env file
  copy and paste .env.example into .env file
  fill in .env values
  npm run start:dev
``` 

## Endpoint List
### User Login
### [POST] {{host}}/users/login
```
payload
body: {
  username: string,
  password: base64
}
```

### User SignUp
### [POST] {{host}}/users/signup
```
payload
body: {
  username: string,
  password: base64
}
```

### Get Profile
### [GET] {{host}}/profiles
```
payload
authorization: JwtToken
```

### Create Profile
### [POST] {{host}}/profiles
```
payload
authorization: JwtToken
body: {
  fullName: string,
  birthday: datestring,
  aboutMe: string,
  gender: enum(male, female, unspecified),
  interestedGender: enum(male, female, unspecified)
}
```

### Update Profile
### [PATCH] {{host}}/profiles
```
payload
authorization: JwtToken
body: {
  fullName: string, <optional>
  birthday: datestring, <optional>
  aboutMe: string, <optional>
  gender: enum(male, female, unspecified), <optional>
  interestedGender: enum(male, female, unspecified) <optional>
}
```

### Find Matches
### [GET] {{host}}/matches/find
```
payload
authorization: JwtToken
```

### Swipe Right
### [POST] {{host}}/matches/swipe-right

```
payload
authorization: JwtToken
body: {
  userId: number,
}
```

### Swipe Left
### [POST] {{host}}/matches/swipe-left

```
payload
authorization: JwtToken
body: {
  userId: number,
}
```