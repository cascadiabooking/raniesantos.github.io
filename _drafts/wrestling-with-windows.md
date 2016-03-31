---
layout: post
title: "Wrestling With Windows"
---

For most people, the first operating system they ever used was Windows, and that's no surprise since Windows has *completely dominated the desktop market for over 20 years*. And because of that, an overwhelming amount of software is made for Windows. It has all the programs and tools you could ever need ... or does it?

When I first started learning basic web development, all I needed were a computer with a working operating system, a text editor, and a browser. But one eternity later, I started learning some advanced tools that you would definitely need as a developer and some of them just don't work the same on Windows.

## What's Different?

### The Command Line Interface

The Windows Command Prompt itself is different. If you manage your own server, it most likely runs Linux, and Windows uses completely different commands than Linux. This means you need to learn 2 different commands that do one thing. Now this isn't a major problem, but it would be more convenient if you could use just one set of commands all the time.

### Secure Shell

One thing Windows lacks is a built-in **SSH** client. To fill this hole you need to install and configure **PuTTY**. Again, not a huge problem but it would be better if Windows included SSH by default.

### Browsersync

If there's one thing web developers do a lot of, it's *refreshing*. Luckily, we now have various *live-reload tools*, the most popular of which is **Browsersync**. But trying to install Browsersync on Windows comes with many errors and headaches. The problem originates from its dependencies like **node-gyp** which needs **Visual C++ libraries** to work properly.

___

## A Look at Other Operating Systems

### Linux Distros

*"If it's going to run on Linux then you should develop it on Linux"*. That was an argument I saw a few times while reading various online content. And I completely agree. One of the best ways to avoid the *It Works on My Machine* problem when deploying your project is to have your development and production environment as similar as possible.

Someone once asked me to help figure out why images won't display after deploying a web application. Apparently it was caused by capitalized file extensions (e.g. image.PNG instead of image.png). It's funny that a tiny detail such as Windows being case-insensitive would actually cause a problem.

Other advantages of using a Linux desktop.
- 
- Built-in SSH client
- Browsersync just works
- Its **FREE**

One important thing to note though is that a lot of proprietary software is unavailable on Linux. If you're a web designer that absolutely must have **Photoshop** then this is probably not the best option for you.

### OS X

Like Linux distros, OS X is a UNIX-based operating system. It shares a lot of the same advantages such as having SSH built-in, a case-sensitive file system
