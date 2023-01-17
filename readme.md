# Startup
You'll need to execute the startup.sql in your database for the first time. The default user credentials are root root, you can change it throw the user management.


# Routes


## /api/status

Receives an empty **get**  
Reply a json ``{status:"ok"} http:200``


## /api/login

Receives a json `{username:"", password:""}` on **post**   
Reply a json ``{msg:"user and pass are correct", token:""} http:200``  
or a ``{msg:"user or pass are not correct"} http:401``


## /api/info

***Just a test route***  
Receives an empty **get**  
Reply a plain text ``userId``


## /api/utils/hash

***Disabled***  
Receives a json `{password:""}` on **get**  
Reply a json ``{plain:"", hash:""} http:200``


## /api/utils/tryToken

Receives a request with a "authorization" on the header on **get**  
Reply a json ``{msg: "Token is valid"} http:200``  
or a ``{msg: "Token is invalid or expired"} http:401``


## /api/manage

Receives a request with a "authorization" on the header on **get**  
Reply a json ``{msg: "Token is valid"} http:200``  
or a ``{msg: "Token is invalid or expired"} http:401``


## /api/manage/user

Recieves a request **get**  
Reply a json ``{username: ""} http:200``


## /api/manage/user/:uid

Recieves a request with a uid on the URL on **get**  
Reply a json ``{username: ""} http:200``


## /api/manage/user/add

Recieves a json ``{username: "", password: ""}`` on **post**  
Reply a json ``{msg: "user created"} http:201``


## /api/manage/user/add/:token

Recieves a json ``{username: "", password: ""}`` and a token on the URL on **post**  
Reply a json ``{msg: "user created"} http:201``


## /api/manage/user/update

Recieves a json ``{uid: "", username: "", password: ""}`` on **put**  
Reply a json ``{msg: "user updated"} http:200``


## /api/manage/user/update/:uid

Recieves a json ``{username: "", password: ""}`` on **post**  
Reply a json ``{msg: "user updated"} http:200``


## /api/manage/instance/all

Recieves **get**  
Reply a json ``{[{id: "", name: ""}]} http:200``  
*(All instances)*


## /api/manage/instance/allSubscribed

Recieves **get**  
Reply a json ``{[{id: "", name: ""}]} http:200``  
*(All subscribed instances)*


## /api/manage/instance/allSubscribed/:uid

Recieves a uid on the URL on **get**  
Reply a json ``{[{id: "", name: ""}]} http:200``  
*(All uid subscribed instances)*


## /api/manage/instance/info/:iid

Recieves a iid on the URL on **get**  
Reply a json ``{id: "", name: ""} http:200``


## /api/manage/instance/subscribe/:iid

Recieves a iid on the URL on **post**  
Reply a json ``{msg: "user subscribed to instance"} http:201``


## /api/manage/instance/subscribe/:iid/:uid

Recieves a iid and a uid on the URL on **post**  
Reply a json ``{msg: "user subscribed to instance"} http:201``




# Permissions

## login

Required to login


## user-show

Required to show own user info


## user-show-all

Required to show other user info


## user-create

Required to create users


## user-update

Required to update self user info


## user-update-all

Required to update other user info


## instance-show-subscribed

Required to show self subscribed instances info


## instance-show-other-subscribed

Required to show other user subscribed instances info


## instance-show-all

Required to show/list all instances (not admin ones)


## instance-show-admin

Required to show admin instances


## instance-subscribe

Required to subscribe to an inistance


## instance-subscribe-admin

Required to subscribe to an admin instance


## instance-other-subscribe

Required to subscribe other user to an instance


## instance-other-subscribe-admin

Required to subscribe other user to an admin instance