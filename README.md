<img src="./assets/logo.png" align="right" style="float:right" />
# Boulderer 
>Hybrid mobile application for sharing boulder problems within the climbing community 

<img src="https://img.shields.io/badge/LICENCE-GNU AGPL V3-0000ff.svg">
<img src="https://img.shields.io/badge/VERSION-0.1.0-00ff00.svg">
<img src="https://img.shields.io/badge/Frontend Platform-iOS/Android-00ff00.svg">

I started Boulderer with two goals in mind, one social and the other one personal:

- <b>A social vision:</b> To provide an useful tool to the climbing community. Climbers can use their phones to discover, create and share boulder problems in the climbing gym and in the outdoors. Finding boulder problems in the Gym and the outdoors is a common problem between climbers. The information can be shared in different ways, but sometimes its also lost. The aplication should enable friends to share boulder problems with the help of a social network, easy to use, and free.
- <b>A challenge:</b> This is my first open source project where I can test and improve my skills designing and developing Mobile Application's technology. In this first round I have implemented the solution using an Ionic MEAN stack (MongoDB, Express, AngularJS, NodeJS), and Cordova to test the thevelopment of Hybrid Mobile Apps.

<div align="center">
<img src="./assets/map.jpg" width="30%" border="4">
<img src="./assets/create boulder 3.jpg" width="30%" border="4">
<img src="./assets/boulder list.jpg" width="30%" border="4">
</div>




## Features

Features are focusing on escencial funtionality to make the application useful while keeping it simple. Current support with examples:

###Discover boulders in the outdoors

The easiest way to search for boulders is in the Map tab.
Double-tap markers to open the boulder.

<div align="center">	
<img src="./assets/paper tree map.jpg" width="25%" border="4">
<img src="./assets/paper tree detail.jpg" width="25%" border="4">
<img src="./assets/create boulder 3.jpg" width="25%" border="4">
</div>

###Discover Boulder Problems in climbing gym:
When you are in the climbing gym, there are too many boulders, and they are usually in the same place so the map won't be useful. The easies way to browse trough boulders is in the Boulder Tab. You can setup filters to only view the boulders you are interested in.

<div align="center">	
<img src="./assets/search filter options.jpg" width="25%" border="4">
<img src="./assets/boulder list.jpg" width="25%" border="4">
<img src="./assets/paper tree detail.jpg" width="25%" border="4">
</div>

### Social Networking
To identify youself in social network you need first to sign in with your Facebook user.
<div align="center">	
<img src="./assets/auth.jpg" width="25%" border="4">
</div>


###Create your own boulders and share them:
 You can create your own boulder problems with your phone camera and share them with the community. Just take a picture, tap on the holds, and share.

<div align="center">	
<img src="./assets/create boulder 1.jpg" width="25%" border="4">
<img src="./assets/create boulder 2.jpg" width="25%" border="4">
<img src="./assets/create boulder 3.jpg" width="25%" border="4">
</div>

## Roadmap

There is so much work to do, but it's exciting. Here there is a list with some of the roadmap activities:

1. Create the Github repository with a MVP version *[DONE]*
2. Code Refactoring *[It's ugly and not clean]*
 1. Cleaning sprint
 2. Improve accuracy of geolocation web service
 3. Test the frontend in Android
 4. Go into the Android and Apple stores.
3. Improve UX *[Designers needed]*
4. Develop the product Branding *[Designers needed]*
4. Develop a business model to mantain the service
5. Distribute

## Architecture

The architecture stack relies heavily on <b>JavasScript</b>. and lightweight frameworks aimed to develop scalable web solutions. I think performace of the backend is pretty solid. I am still wondering if I should follow a native approach for the frontends:

<table>
  <tr>
   <td>Back-end @AWS</td>
   <td>Web API: <b>NodeJS</b></td>
  </tr>
  <tr>
   <td></td>
   <td>Document storage: <b>MongoDB</b></td>
  </tr>
  <tr>
   <tr>
   <td></td>
   <td>Data Model: <b>Express</b></td>
  </tr>
  <tr>
    <td>Front-End @PhoneGap</td>
    <td>Framework: <b>AngularJS</b></td> 
  </tr>
    <tr>
    <td></td>
    <td>UX components: <b>Ionic</b></td> 
  </tr>
</table>

##API

API doc comes here...


## Contribute

I am interested in working in teams. If you think that you can collaborate in the project with your skills, please send an email to <carloswestman@gmail.com>

## License

Carlos Westman – <carloswestman@gmail.com>

Distributed under the GNU APGL V3 license. See ``LICENSE`` for more information.

[https://github.com/carloswestman/boulderer](https://github.com/carloswestman/boulderer)

