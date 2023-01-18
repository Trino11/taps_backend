# Startup

You'll need to execute the startup.sql in your database for the first time. The default admin user credentials in the panel will be root root, you can change it throw the user management of the api or directly on the sql script (note: the password is hashed).


# Using the app

## Docker

### Using prebuilt package

You can just import the prebuilt package and run it directly following this steps
- Download from [the releases page](https://github.com/Trino11/taps_backend/releases/download/v1.1.1/taps-backend-1.1.1-dockerimg.tar) the latest version or running `curl https://github.com/Trino11/taps_backend/releases/download/v1.1.1/taps-backend-1.1.1-dockerimg.tar`
- Execute the command `docker load -i taps-backend-1.1.1-dockerimg.tar taps-backend:1.1.1` where `<taps-backend-1.1.1-dockerimg.tar>` is the image you previously downloaded and `<taps-backend:1.1.1>` is the resulting image_name:tag of the image in your docker images.
- Now you can just run `docker run --name my_taps_panel taps-backend:1.1.1 -p <port>:3000` adding the needed [environment variables](#environment-variables) as explained in the [prebuilt package](#in-the-prebuilt-package) and changing the `<port>` to the target port of the api.

### Building with Dockerfile

If you want, you can use Docker building the container by your own.
- Clone the repository
- Install the dependences using `npm install`.
- Build the TypeScript project using `tsc` on the root.
- Modify the Dockerfile described in [the docker environment variables](#in-the-dockerfile) if you need, you can set the default values of the ENV variables there. (You can also change the variables using [the .env file](#using-env-file)).
- Run `docker build --tag taps-backend:1.1.1 .` to generate a docker image of the project. 

If you need to extract the image to a file, you can use `docker save --output <outputfilepath>.tar taps-backend:1.1.1` where `<outputfilepath>` is the path of the output file.

Then you can import the file image with `docker load -i <inputfilepath>.tar taps-backend:1.1.1` where `<inputfilepath>` is the path to the image file .tar.


## Native

To run the project directly with Node, you will need to 
- Clone the repository
- Configure the .env variables creating a `.env` file on the root, and using the [Environment Variables](#using-env-file)
- Install node dependences using `npm install`
- Build the project using `tsc` if you have TypeScript installed globally, or `npm run build` if not.
- The command `npm start` will start the app in developer mode.


# Environment Variables

There are some environment variables and ways to configure it.

## In the prebuilt package

Also you can just use the prebuilt package following [using prebuilt package](#using-prebuilt-package) and passing the variables with the names [below](#in-the-dockerfile) into the arguments, for example: `docker run --env DBHOST_ENV=databasehost.myhost --env DBUSER_ENV=myuser`

## In the Dockerfile

If you want to use Docker and you will build the project following [the docker building](#docker), you can set them staticly in the Dockerfile or [passing them into arguments](#in-the-prebuilt-package) in the `docker run` command.

- ENV JWTTOKEN_ENV=xxxxxxxxxxx        The JSON Web Token token
- ENV SESSIONKEY_ENV=xxxxxxx          The session key paraphrase
- ENV DBHOST_ENV=127.0.0.1            The database host
- ENV PORT_ENV=3000                   The app listening port
- ENV DBPORT_ENV=3306                 The database port
- ENV DBUSER_ENV=user                 The database user
- ENV DBPASSWORD_ENV=user             The database password
- ENV DBDATABASE_ENV=paneldatabase    The database name

## Using env file

Here, you will need to do the [dockerfile](#building-with-dockerfile) or [native](#native) option since you will need to build the project.
You need to create a `.env` file in the root of the project and those are the variables that you can change. Put your value inside the "".
- JWTKEY=""
- KEYSSN=""
- DBHOST=""
- PORT=""
- DBPORT=""
- DBUSER=""
- DBPASSWORD=""
- DBDATABASE=""

By example: `PORT="3000"`


# Routes

## /api/status

Receives an empty **get**  
Reply a json ``{status:"ok"} http:200``


## /api/recovery/register/:token

Receives a token on the URL on **post**  
Reply a json ``{msg: "user will be created"} http:200``


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
