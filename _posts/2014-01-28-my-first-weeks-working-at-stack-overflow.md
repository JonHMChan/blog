---
title: My First Six Weeks Working at Stack Overflow
date: 2014-01-28 00:00:00 Z
categories:
- essays
hero: https://jonchan.io/img/essays/my-first-six-weeks-at-stack-overflow.jpeg
opacity: 0
description: 'This is a walkthrough of my first few weeks working as a developer at
  Stack Overflow: onboarding, learning, and my experiences inside the company'
layout: post
---

I started working at Stack Overflow as a software developer just six weeks ago. This (lengthy) post is about a number of things: what it was like relearning a lot of what I know about web development, the challenges and resources I encountered doing so, and a few pointers others might benefit from on-boarding on a new development team.

## About Me

I think to grasp what this experience was like, it's useful to have some context. I won't go into all the details about joining (that's a whole other story), but just the necessary bits. Before I joined Stack, I was working at a [Big Four](http://en.wikipedia.org/wiki/Big_Four_(audit_firms)) consulting firm in their technology division straight out of college. After I built [Bento](http://bento.io/), I had the opportunity to join Stack, and I took it. What's also important is that I'm a self-taught developer. Pretty much everything i know is through online tutorials and some books.

## Week 1 & 2: Learning Stack's stack

Here's a quick breakdown of the technologies I was used to before I joined Stack, and what I had to pick up:

<table>
	<tr>
		<td>
			<em>What I was used to</em>
			<ul>
				<li><strong>Python, Tornado</strong></li>
				<li><strong>Sublime Text, OS X</strong></li>
				<li><strong>Mongo, Memcached</strong></li>
				<li>HTML, CSS, JavaScript</li>
				<li>jQuery, Angular</li>
				<li>Git, GitHub</li>
			</ul>
 		</td>
 		<td>
			<em>What I was learning</em>
			<ul>
				<li><strong>C#, .NET</strong></li>
				<li><strong>Visual Studio, Windows 8</strong></li>
				<li><strong>SQL Server, Linq, Redis, Elasticsearch</strong></li>
				<li>HTML, CSS, JavaScript, Razor</li>
				<li>jQuery, Angular</li>
				<li>Git, Kiln</li>
			</ul>
 		</td>
 	</tr>
</table>

The major piece, of course, is in the backend: I was basically changing stacks entirely. I was going from a dynamically to statically typed language, from a document-based to traditional relational database, among other things. In short, there was a lot to learn. Of course, I had the help of the whole development team I was part of, and they were immensely helpful through the process (they still are, thanks guys).

Fortunately, I spend a lot of my free time thinking about how to learn new technologies. I know I learn best through video tutorials, and I went to my usual source for learning established platforms: [Lynda](http://lynda.com/). They have excellent courses on C# and .NET, and I was spending most of my first week going through those videos and following along. This wasn't nearly as difficult as I thought it was going to be. I'm of the opinion that most programming languages are conceptually pretty similar, just with different syntaxes and tools: arrays are now lists, for loops are largely still the same, there are a few more features for OOP, etc. The same goes for web frameworks: there are still the basic concepts around routing, templates, and deployment. An excellent testament to this thinking is [Learn X in Y Minutes](http://learnxinyminutes.com/), a resource I feature extensively on Bento.

Another major hurdle was changing development environments. For the first few weeks I was using a co-worker's previous machine, and half the battle was just getting everything set up and learning my way around the tools available.  Stack is pretty heavily Microsoft-based, and even switching over to a machine running Windows 8 caught me off guard at first. I missed the terminal window and Sublime Text and all the other tools I was used to. But after those two weeks, I was pleasantly surprised by how quickly I could adapt. There are still some things in Visual Studio that I wish I had from Sublime (I really miss Cmd+D), but I'm sure there's still lots to learn about VS that will make me just as or even more productive than before.

One of the largest hurdles was switching database technologies. Of course, I knew what relational databases were and how they worked having used LAMP for a long time, but getting back into the swing of things after a few years proved difficult. [SQLZoo](http://sqlzoo.net/wiki/Main_Page) was a great resource for relearning some database basics, and picking things up was kind of like getting back on a bike you left in your garage for a while.

Overall, in terms of learning, it was very similar to picking up any other stack I've wanted to. I think the biggest takeaway was just taking a peek at a faction of development I didn't really touch, and for some others, even shunned. I was switching sides on some age-old wars: Mac vs PC, dynamically vs statically typed languages, unstructured vs relational databases - and I have to say I've been [extremely impressed](http://nickcraver.com/blog/2013/11/22/what-it-takes-to-run-stack-overflow/) by how efficient everything is. As much as it may have pained me just a few months before to say this: I think Microsoft-based stacks get a pretty bad rep that's not entirely deserved.

## Weeks 3 & 4: Learning Stack's version of the stack

At this point, I felt pretty comfortable in the technologies in their "platonic" form, but I still didn't understand how everything was organized in Stack's actual codebase and configuration. Learning C# and .NET was just the beginning. Figuring out how it was done to make Stack Overflow what it is...that's s a completely different adventure. There are a number of different teams that work on different parts of the site, but I work specifically on the [Careers](http://careers.stackoverflow.com/) team. It's newer than the core of the technology running the Q&A sites, and luckily there are more developers physically on site that I could poke when I had questions. Since I was working on an exercise project, it gave me plenty of time to explore and experiment without breaking anything. I also made the critical decision to branch the whole codebase and work inside of the existing environment for my project. Learning C# and .NET in an isolated way was not going to help me - what I needed to know was not about the technologies per se: it was about Stack itself.

Basically, the questions I had at weeks 3 & 4 were about how we did things: What data are we indexing in elasticsearch? What does this column in this table mean? How are things distributed on the CDN? etc. A lot of this was how Stack was doing their version of the technologies we were on - things I could only learn by asking a lot of questions and wandering around the codebase for.

Another thing was picking up style. One of the things you can't get just by borrowing from another language was best practices around a particular platform. Sure, I still [avoid repeating myself](http://en.wikipedia.org/wiki/Don't_repeat_yourself) and try and write efficient code, but I needed to figure out how to follow those principles in a new environment. When should I use an array versus a list (should I ever)? What's the best way to serialize an object into JSON in C#? Those were things that, of course, Stack Overflow itself was [helpful for](http://stackoverflow.com/questions/6201529/turn-c-sharp-object-into-a-json-string-in-net-4).

The most important thing after scouring the internet and bothering my coworkers: mimicking. There was already a lot of code that I could study, and simply by following the conventions that were already followed in the existing codebase was incredibly useful. When you start noticing that "var" is used more often than you'd think, you start using it. When you notice that you need X, Y, and Z classes and interfaces to render a particular route, you start doing that with your own routes. By emulating and experimenting, I picked up most of the knowledge I needed.

## Weeks 5 & 6: Jumping out the nest

It was now time to jump off the deep-end. Stack has come up with something pretty ingenious to handle immediate issues. Every week, there's a rotation where one member of the team is assigned bug duty, and their main responsibility is to fix problems that come up on Meta, monitor the logs, answer sales requests, and anything else that needs to be attended to immediately. You drop everything.

After four weeks, it was my turn.

For the first week, I had the help of another dev while I was tracking which bugs were coming up on the site, and getting a feel for all the monitoring systems we had in place. The week after, I was in the front line. This was a great opportunity to touch many of the dark corners of the codebase I hadn't been exposed to (and quite frankly, a little afraid to touch). It also gave me a chance to get real changes on the site, and in some cases, in rather significant ways. During my down time, I was busy setting up a completely different environment on my Mac that finally came, as well as putting finishing touches on my exercise project. There were a lot of moving parts that week.

## Final Thoughts

I've really enjoyed my time here so far - I can't say enough good things about working at Stack Exchange. I think that the on-boarding experience is much better than a lot of other places I've been exposed to, but there are a few things that I think would have been interesting additions:

 - **Shadowing or pair programming** - I've been a proponent of shadowing and pair programming (for a period) as a method of teaching someone an existing codebase or new technology. This would have been especially useful during my third and fourth week, where I was learning how Stack was organizing their code and what conventions they followed. I think that having someone more experienced with a new developer working on a small feature or bug really allows knowledge to flow quickly. There were a few instances when I did this setting up my environment, but just watching someone code and asking questions along the way might have been a valuable experience. There are just some things that you can't capture in written documentation, chat, or in exploring on your own. Sometimes just watching a veteran work helps a lot.

 - **Teaching as learning** - I'm also a big fan of using teaching as a way of learning. Of course, there isn't going to be a regular interval of new developers joining my team, but I think that having recently-joined developers help new developers get on their feet is useful for both parties, even for a bit. For one, the experiences are pretty closely aligned: things like setting up your environment for the first time, picking up the nuances of the language, learning your way around the codebase, etc. Chances are, both will have had very similar questions. It also serves as review for the developer that joined before to really make sure she has her bases covered. Think of it something like a final test for the previously minted developer.

 - **Documentation and On-Boarding Notes** - I generally subscribe to the idea that good code is readable code and maintaining external documentation is cumbersome. For me, it wasn't so much the code itself as it was certain configurations and common environment snags. For example, I discovered that we had custom tools that let me reference static assets in the codebase, but I'd hit an exception if I didn't do so. It's not clear where these instructions should live other than in the minds of other experienced developers, so I would defer to the chat room. But even having a place for common bugs during development would have been useful. What I started doing on my own about halfway through the on-boarding process was that I kept notes of common obstacles I ran into and how to solve them. This was not only be helpful for me when I forgot how to do something simple like migrate an anonymized production database, but I figured it would be helpful for future developers. I think keeping something like a wiki-style tracker or even a single Google doc for these issues would be an interesting experiment.

That's it! Of course, there's still plenty for me to learn in all of these areas, and I'm not yet [Jon Skeet](http://meta.stackoverflow.com/questions/9134/jon-skeet-facts) by any means. Hopefully, this will give some people insight on what the experience is like joining Stack and help those of you starting off somewhere new as a developer.