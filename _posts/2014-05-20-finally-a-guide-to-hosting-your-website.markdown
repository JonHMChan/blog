---
title: Finally, a Guide to Hosting Your Website
date: 2014-05-20 08:45:00 -04:00
categories:
- essays
description: There aren't many guides on how to build a basic website on your computer
  then put it up on the Internet. Here's one that I wrote.
opacity: 0.5
hero: "/uploads/finally-a-guide-to-hosting-your-website.jpeg"
---

So you now know HTML, CSS, and JavaScript. You've done the interactive tutorials, watched YouTube videos, and even picked up a few books. You know why [inline-styling is bad](http://stackoverflow.com/questions/2612483/whats-so-bad-about-in-line-css) and discovered the wonderful library that is [jQuery](http://jquery.com/). Then it dawns on you: you've learned the languages you should know, but you still have no idea how to take that code and turn it into a site on the Internet for the world to see.

Since I built [Bento](https://bento.io/), I've heard this complaint time and time again, and it's a shortcoming for most learning resources on the web (even the ones that I admire and love). So here's a (lengthy) guide about how to write static web pages on your computer then put it on the Internet.

One important note before we begin: this covers a very large number of topics that will get you to hosting a very basic website. This guide does *not* cover how to host a website with a back-end web framework, databases, caching, and so forth. I assume that since you are a beginner who needs this guide, your skill level is far more fundamental and you know only HTML, CSS, and maybe some JavaScript. I will probably write another post on hosting more sophisticated sites later on.

Let's get started.

## How to build and test a simple site on your computer

The first thing you need to know is how to get your HTML, CSS, and JavaScript running on your computer without having to do it inside of an interactive tutorial like in [Codecademy](http://codecademy.com/) or [Dash](http://generalassembly.com/dash). It's fairly simple:

* Open up a text editor. Notepad or TextEdit works just fine, but I highly recommend you download a specialized editor like [Sublime Text ](http://sublimetext.com/)to make your coding life infinitely easier.

* Create a new file and type in the following HTML:

```
  <html>
    <head>
    </head>
    <body>
      <p>Hello World!</p>
    </body>
  </html>
```

* Save that file as **index.html** on your Desktop. It's very important that the name of the file after period is "html" - this part is known as the **file extension**. You might have noticed that images have different file extensions like jpg, gif, or png. This is just like that and it specifies what kind of file you are creating.

* Open up a browser like Chrome, Safari, Firefox, or Internet Exploder. Go to `File > Open File` and find the **index.html** file you just created back on your Desktop.

* You should see "Hello World!" in your web browser. Try changing the contents of your index.html file with new HTML, save the file, and hit refresh on your browser. You'll see that it starts changing!

What just happened there? Your browser is actually taking the text in that HTML file and interpreting it as HTML code, turning those tags into actual images, applying boldness to tags, and so forth. The browser is just taking text from a file and interpreting it as instructions.

### What about CSS and JavaScript?

CSS and JavaScript work in a very similar way. You create files like **index.css** (for files containing only CSS) and **index.js** (for files only containing JavaScript) with new file extensions to specify what kind code is in the file. So try doing the following:

* Create a *new* file in your text editor and type in the following CSS code:

```
  html {
    color: blue;
  }
```

* Save the file as **index.css** on your Desktop (notice the new file extension, **css**). It needs to be in the same directory as your **index.html** file (for now).

* Create *another* new file in your text editor and type in the following JavaScript code:

```
  alert("This is an alert I created in index.js!");
```

* Save the file as **index.js** on your Desktop (notice the new file extension, **js**). This file also needs to be in the same directory as your **index.html** file and **index.css** file (in this case, the Desktop).

* Finally, change your **index.html** file with the following code and save it.

```
  <html>
    <head>
      <link rel="stylesheet" type="text/css" href="index.css">
    </head>
    <body>
      <p>Hello world! This text should be blue because of the CSS I wrote in index.css!</p>
      <script type="text/javascript" src="index.js"></script>
    </body>
  </html>
```

* Open up **index.html** in your browser just like you did before (or refresh it if you already had it open). You'll see that your JavaScript gets executed, your CSS rules have been applied, and your HTML is there too!

HTML files work in concert with CSS and JavaScript files. The `<link>` tag that you put in between the `<head>` tags allows you to refer to CSS rules *in another file*. In this case, it is **index.css**. You could have renamed your CSS file to anything you want as long as it had the CSS file extension after it. It could be **dog.css** or even **i-dont-care-what-I-call-it.css** and you would just need to change the "href" attribute in the `<link>` tag to make it work. It is generally good practice to put your CSS files within the <head> tags so that your style rules are loaded *before* anything after it shows up in the page. Otherwise, your content may look like ugly default HTML without styles for a split-second while the CSS is being loaded.

This ability to reference code in other files works exactly the same way for JavaScript except with the relevant `<script>` tag is right before the ending `<body>` tag and uses the the "src" attribute. It is generally good practice to put your JavaScript files at the end of your `<body>` tags so that it won't block the loading of HTML or CSS. Otherwise, it may give the user the impression that your site is very slow if you have a lot of JavaScript.

### File Structure

At this point, it should be clear that all you need to do when building a site on your computer is writing HTML, CSS, and JavaScript into text files with the right file extensions and firing them up in a browser (very simply put). However, putting all of your files onto the Desktop would become very cumbersome very quickly, so you should put your files into separate folders and even different types of files into different folders. Something like this:

![hello.png](/uploads/hello.png)

Typically, what ends up happening is the following:

* All of your site's files are put into a single folder. This includes HTML, CSS, JavaScript, and even images.

* Your HTML files typically stay at the root of the folder while your other files go into folders separated by type. I typically create folders named `css`, `js`, and `img` for CSS, JavaScript, and images respectively.

* Your HTML needs to be modified to include the right paths for your different files if they are in different folders. For example, if you used the same folder names I did, your HTML would look like this (note the href attribute in the tag and the src attribute in the tag):

```
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="css/index.css">
      </head>
      <body>
        <p>Hello world! This text should be blue because of the CSS I wrote in css/index.css!</p>
        <script type="text/javascript" src="js/index.js"></script>
      </body>
    </html>
```

* If for some reason you needed to reference a file that was one level above the current folder that file is in, you would use two periods ".." to indicate the folder above:

```
  # If index.html were in a folder and index.css were in the folder one level up:

  ../index.css

  # If it were in a folder two levels up:

  ../../index.css

  # If it were in a folder named 'css' that was in a folder one level up:

  ../css/index.css
```

### Why "index" for the file name?

One last thing: you might be wondering why the HTML file is called **index.html** as opposed to anything else like **home.html** or **puppiesareawesome.html**. This is because the default file to go to when accessing a folder in a browser - particularly when it hosted on a server - is **index.html**. This will be more apparent later when we actually publish your code.

## How the Internet works, simplified

Now that you know how build a simple site on your computer, it's time to take that knowledge and apply it to publishing it on the web. Pay attention here, because what you're about to read is probably the most important part of this entire guide. You need to realize is that the Internet is just a bunch of interconnected computers, and when you visit a site, you are using code that is on someone else's computer instead of yours.

Let that bit of knowledge sink in a little.

This is a vast oversimplification, but you've seen how code is practically interpreted text in files with special file extensions. You could have accessed those files from someone else's computers rather than yours. You just don't know how to put your code in a place that's available to everyone yet.

When I type in "http://www.google.com/" in the address bar of a browser, a number of things are happening very, very fast. In very simple terms:

* The first thing that happens is that a request for files is sent to a particular computer. That web address you type in "http://www.google.com/" is just a nickname for something known as an **IP address** that looks something like 127.0.0.1 . That IP address is like a mailing address that points to a particular computer where the files are coming from.

* When the computer is located, the right files that contain the HTML, CSS, and JavaScript are sent back to you and the browser.

* The code that is in the HTML, CSS, and JavaScript files is then interpreted by your browser (Chrome, Firefox, Internet Exploder) and used to display what you see in the window, just like you saw with the local files you created earlier.

What is effectively happening when you access a website through a browser is that you're accessing code on someone else's computer that was sent to you instead of from somewhere on your machine like your Desktop. The main difference is that these are not the ordinary kind of computer like the one you're probably using to read this guide. These computers are known as **servers** and are designed to do exactly what their name implies: serve web pages. What that means for you as someone who wants to build a website is that you need to put your code somewhere where other people can access it too - on a server. There is a great video to watch about how this process works that I feature in the fundamentals portion of Bento - it's the first link on the whole site because it's so crucial to understand how this process works:

[YouTube Video](https://www.youtube.com/watch?v=7_LPdttKXPc)

### What you need to learn now

At this point, there are two major parts to getting your code running in a way that you're used to with other websites. The first part is actually putting your code to a server. The second part is getting a **domain name** that points to the server that you're putting your code on.

## Putting your site on a web server

There is an endless number of combinations of methods and services you could try to get your code hosted on a web server. However, it's simply not useful to enumerate most or even many of these combinations at the skill level you are at if you're reading this. Therefore, I will provide only three methods and strongly suggest one.

### Traditional web hosting (don't do it)

There are a lot of services out there that will essentially let you rent space on their servers and provide you with some useful tools on top of them. Traditional hosting is usually provided by many popular domain name registrars like **GoDaddy** and simply provide you with a certain amount of space that you can serve files from. For the majority of these services, you simply upload your files and folders to the server just like you would upload an image from your computer to Facebook.

Many of these traditional hosting solutions will also let you upload files via **FTP (File Transfer Protocol)**. This lets you upload files directly from your computer and download files from the server without having to go through the hosting service's website.

My advice about this sort of hosting is: **don't do it.** This method of uploading files manually is outdated by at least a decade and has a number of issues plaguing it: lack of flexibility, difficulty of use and configuration down the line, and generally very expensive. The only reason I mention it here is because you will inevitably have it shoved in your face when you buy a domain or search the Internet for hosting services. Just walk right past it.

### Cloud services (overkill)

Another thing you'll probably run into are cloud services with names like **Amazon Web Services** or **Heroku** popping up. These are ways of hosting your files in a way that lets you fine tune things to scale a website, determine where the servers you want are geographically, and a whole slew of other options. My advice for you here is to avoid these solutions *if you are building a site that is just HTML, CSS, and JavaScript*. Such sites are also known as **static sites** if you weren't familiar with the term. Assuming you don't know a back-end language like Python or Ruby and their accompanying web frameworks, these cloud services are overkill. Since this guide is meant for people with little to no experience publishing their code, the skill needed to manage these services on top of writing good code is beyond the topic at hand.

In the future, I plan on writing another post to talk about how this could be done, but it's an entire other section of its own. So assuming that you are building a static site, best to avoid these for now.

### Instead, use GitHub Pages

Okay, what you *should *do is use [GitHub Pages](https://pages.github.com/). Full disclaimer: I do not work for GitHub and GitHub is not paying me. I personally think it is the best way for a beginner to publish their code for a number of reasons. It was even used to host the original version of Bento before I switched over to cloud services. Here's a few reasons why I think GitHub Pages is a good idea:

* It requires that you learn Git, a popular **version control system** (though not the only one out there) that is an essential tool for any developer that hopes to work in teams or for a company. Git is one of the most popular technologies for version control out there.

* By learning Git, you will also have to learn how to interact with the **shell**. This is another basic technology that lets you interact with your computer in a very fundamental way.

* Hosting this way gets you started building a GitHub profile, which allows you to open source your code so that it can be seen by others - especially potential employers and other developers. I cannot stress enough how important this can be if you want to advance your career, especially as a beginning developer.

* It's absolutely free to host your code on GitHub *and *have it be published in an accessible way.

* It is shockingly easy to get your code published.

Now about that last point about it being shockingly easy: what that means is that you might have to pick up a few new (but easy) skills along the way if you're a complete beginner. This is what I recommend:

1. Learn how to interact with the shell on your computer. [Here's the Bento page for it](http://www.bentobox.io/shell). I highly recommend you start with the first link **Learning the Shell**.

2. You need to learn Git. [Here's the Bento page for that](http://bentobox.io/git). I highly recommend you start with GitHub's own tutorial on Git, **Try Git, **which is the first beginner link on the page.

3. Once you learn how to use the shell, install Git on your machine, and how to use Git, you need a GitHub profile. Go to [http://github.com/](http://github.com/) and create a profile.

4. Create a [new repository](https://help.github.com/articles/create-a-repo) for your code. This should be in the folder that contains all your HTML, CSS, JavaScript that you want as part of your page. In other words, you'll have to "cd" into your folder from the shell, and run "git init" there. I'm assuming you're following the directions in the link from GitHub for the next steps, so make sure you get to the stage where you're going all the way to pushing your code to the newly created repository.

5. Publish your code by pushing your code to a branch called **gh-pages** in your repository. I'm also assuming here you know what git branching is - if not, [click here for a tutorial](http://pcottle.github.io/learnGitBranching/) used on Bento. The [full instructions](https://help.github.com/articles/creating-project-pages-manually) on how to do this from GitHub are very good, so make sure the read them.

6. Once you've successfully pushed code to the gh-pages branch, you should be able to visit your site at: **http://<github username>.github.io/<repository name>**. For example, my GitHub username is **jonhmchan** and I could host my code in the gh-pages branch of a repository named **bento**. That means any code that commit and push to the gh-pages branch would be seen at **http://jonhmchan.github.io/bento**

That's really it! Assuming you know how to use the shell, Git, and GitHub, all you need to do push your code to a branch called **gh-pages **and GitHub takes care of the rest! At this point, there's probably one more question lingering in your mind: how do I get a fancy domain name like **www.bentobox.io **if I don't want to use GitHub's auto-generated web addresses? That's where buying domains come in.

## Getting a domain name

The next thing you'll want to do is get a domain name. A domain name is how people will find your site: Google's domain name is **google.com** and Bento's domain name is **bentobox.io**. You'll have to register your domain name with any number of registrars like NameCheap, Gandi, or GoDaddy. Usually, these domains will be very cheap, sometimes as low as $10 a year. However, be careful with how you search or buy your domains though. Here are some things to keep in mind:

* **Getting the perfect name is going to hard**. A lot of the great names have already been taken, especially on very common top level domains (TLDs) like .com and .io. Chances are, you're going to have to be pretty creative with your domain name unless you have a lot of money to shell out.

* **The best way to check if a domain name is taken is to simply try and visit it**. Some domain name sellers will actually try and buy up domains that are typed into their sites just so they can be sold at a higher price because you've indicated demand. You can also try doing what's known as a "WHOIS lookup" to find out if the domain you want is registered (just Google it).

* **When you buy a domain name, it is required that you provide information about yourself to the WHOIS database**. This is a public database that is searchable. You can get around this requirement by using Domain Privacy that provides stand-in information for the WHOIS database and forwards information along to you. Some registrars like Gandi automatically do this for you (I use Gandi for pretty much all of my domain purchases), but services like GoDaddy only make it available if you pay for it on top of your domain. Be sure you know before buying your domain.

* **Buying a domain that's already taken is very hard to do**. Many of these domains are taken by squatters who buy up a lot of domains just in case someone wants it and will sell it at a higher price. Negotiating to buy that domain also takes up a lot of time and effort, and probably a lot of money if the domain you want is valuable. In most cases, you're better off just choosing another domain name.

Once you actually get a domain that you're happy with, you'll have to change some settings to point to the servers your files are hosted on and it's a bit different depending on which method you're using to host your files. That being said, the vast majority of cases require that you simply change a few options on what's known as **DNS records** - which you can get a brief overview of [here](https://support.google.com/a/answer/48090?hl=en). However, if you are using GitHub Pages as recommended earlier, you can read GitHub's own instructions on how to set up a custom domain for your pages [here](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages).

Also, you should know that changes you make to your domain settings may take a while to take effect. If you're running into problems, just check back in an hour or so. If it takes more than that, something might be up.

## That should be it

I hope this serves as a starting point for someone just learning to code to actually publish your work. I cannot stress enough how important it is to get your code out there in the world. For so many developers I've had the pleasure of meeting, being able to create something that lots of people can use is their favorite part of learning to code. Even for me, that feeling of creation is what got me addicted to development.

Now go build stuff and share it with the world.