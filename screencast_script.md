RxJS - Space Shooting - Part 0

part 1 - reading the manual of rxjs

V5.0
manual:
http://reactivex.io/rxjs/manual/overview.html
testing:
https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
github:
https://github.com/ReactiveX/rxjs

V4.0:
https://github.com/Reactive-Extensions/RxJS/tree/master/doc
testing part for V4.0
https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/testing.md
github:
https://github.com/Reactive-Extensions/RxJS

the marbles:
http://rxmarbles.com/
the book - (V4.0) Reactive Programming with RxJS Untangle Your Asynchronous JavaScript Code - by Sergi Mansilla
https://pragprog.com/titles/smreactjs/reactive-programming-with-rxjs
the video - (V5.0) Extreme Streams: The What, How and Why of Observables - by Alex Wilmer
https://www.youtube.com/watch?v=zAWB3lPixtk



Part 2 - Development Environment and Tooling

OS: windows 10
Browser: Chrome
Javascript Runtime: Node.js @ nodejs.org/en
Version Control: Git @ git-scrm.com + Github
Code Editor: VSCode @ code.visualstudio.com

Module Bundler: Webpack
Language: typescript 2 (setup VSCode to use typescript 2 @types)
Test Framework and Runner: Jasmine + Karma

Setup according to official doc and try to keep the setup at minimum.






2.1 - Git and Github
-A) the book - Pro Git  - git-scm.com/book/en/v2

A) Use Git/Github to store files remotely
  0) three trees (Chapter 7.7)
  1) sign up in github
  2) create new repo online
  3) clone the repo
  4) modify a file, git add, git commit, set up user.name and user.email, log in, git push
    4.1) modify a file, git commit -a -m, git push
  5) click over github
  6) use Git in VSCode(show git output), edit, stage, check diff, commit, reset, sync


B) Use Git/Github to follow along part 3 of my tutorial
  1) branch (Chapter 3.1), 
  2) create branch, checkout branch
    git log --oneline --decorate --all
  3) the main purpose of branches is to enable code to evolve stably
    present a simple 'git merge' example
    git log --oneline --decorate --all --graph



Save and exit VIM by pressing esc and :wq and enter.
logout: git credential-manager clear https://github.com
REMOVE USER.NAME: git config --global --unset-all user.name



3.1 NPM Intro

Part 2.3.1 - NPM - 'npm init' and 'npm install'
Our code exists in a node package, we manage the meta data of this package by package.json.
And we will use packages/modules from others, we install these packages using npm.

NPM Docs:
https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging
Getting started with npm - Youtube Playlist:
https://www.youtube.com/playlist?list=PLQso55XhxkgBMeiYmFEHzz1axDUBjTLC6

npm init
intall new package with --save and --save-dev
run command line tool of a package, without install the package globally, 2 approaches

Part 2.3.2 - NPM - 'scripts' in 'package.json'
scripts: 
  start
  prestart in package.json
  poststart

Part 2.3.3 - NPM - 'npm install' with some ready-made package
clone repo and install all the packages


4.1 Typescript Intro
quick start
basic types, type assertion<>
const declaration
Interfaces, extends, 
Generics type parameter

tsconfig.json
tsc --init
noImplicitAny: true

modules
@types and run in node, and run in browser, fail, then use webpack

5.1 Webpack Intro
webpack.config.js



6.1 Jasmine + Karma Intro












part 3 - coding
  3.0 the book, best practices(immutable)
  3.1 review 1.1
  3.2 index.html, interfaces and other structures
  3.2 stars field
  3.3 hero ship and hero shots
  3.4 enemy ships and enemy shots
  3.5 collides
  3.6 scores

  adding an actor:
    1) interface
    2) config
    3) actorsInit
    4) onContinue, 5 places
    5) renderer, 2 places

canvas 101:
https://www.youtube.com/watch?v=RV3SaSH8lw0
https://www.youtube.com/watch?v=MV_ITkqLzik