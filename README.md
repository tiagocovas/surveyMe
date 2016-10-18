# Survey Me App

Survey Me it's finally here. A web application for curious people who like to share their preferences with the rest of the world.

With the kind sponsorship of [Bliss Applications](http://www.bliss.pt/) and the helpful skeleton of [angular-seed](https://github.com/angular/angular-seed), Survey Me could finally see daylight.


## Getting Started

To get you started you can simply clone the survey-me repository and install the dependencies:

### Prerequisites

You need git to clone the survey-me repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize survey-me. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone angular-seed

Clone the angular-seed repository using [git]:

```
git clone https://github.com/tiagocovas/surveyMe.git
cd surveyMe
```

If you just want to start a new project without the angular-seed commit history then you can do:

```bash
git clone --depth=1 https://github.com/tiagocovas/surveyMe.git
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/`.

