# http-resource

This is like the angular-resource.
Abstracts a access to the resource (Web API).

## Installation

### npm

```sh
npm install http-resource
```

### jspm

```sh
jspm install npm:http-resource
```

## Usage

```js
import httpResource from "http-resource";

var UserResource = httpResource("/api/user/:id/:edit", {
    actions: {
        save: { method: "PUT" },
        edit: { method: "GET", params: {"edit": "edit"} }
    },
    params: {
        edit: ""
    }
});

// method override
class User extends UserResource {
    save(params = {}, options = {}){
        options["header"] = { "X-FOO": "foo" };
        return super.save(params, options);
    }
}


User.get({"id":1}).then((user)=>{
    user.name = "foo";
    user.save();
});
```
