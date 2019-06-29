## Environment Variables

A nodemon.json file need to be added to the root directory which contains the environment variables.

```JSON
{
    "env": {
        "MONGO_ATLAS_PW": "passwaord_here",
        "MONGO_ATLAS_USER": "username",
        "JWT_KEY": "private_jwt_key"
    }
}
```