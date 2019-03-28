### What is this? ###

* web app for tracking health site test

### How do I get set up? ###

* This app running on docker container environment, you must install Docker on your machine before.

* Docker Installation

    - [Docker Installation(Ubuntu)](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
    
* On root directory execute this command to build docker image use nginx server:

    `docker build -t [docker image name] .`
    
* Launch newly built image. bind port 80 to your desired port using the -p parameter.

    `docker run -d -p [port]:80 [docker image name]`

* Open your docker host url in browser.