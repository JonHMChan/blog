---
title: Designing a @#$%ing Address Form
date: 2014-02-12 09:22:00 -05:00
categories:
- essays
hero: "/uploads/designing-a-address-form.jpeg"
opacity: 
description: You've been tasked with designing an address form for your website. Don't
  hurt yourself.
---

[Follow me on Twitter](http://twitter.com/jonhmchan)

Address forms, at surface, seem like a common enough thing on the web that it should be relatively simple to implement. Anywhere where something needs to be shipped, paid for, or organized in the real world, the form almost always appears. Yet, when the moment comes that you need to implement one yourself, it can quickly become a journey into a wilderness plagued with feature creep, standardization pitfalls, and in some occasions, death (not really, but I have ended up with some massive headaches at the end of the day).

At [Stack Overflow](http://www.jonhmchan.com/blog/2014/1/16/my-first-six-weeks-working-at-stack-overflow), I've been tasked with making an address form that would dwarf many other address forms in functionality. If it were simply a few text fields to be stored in a database, that would be no problem - but the form we wanted did all of the following:

-   Internationally useable and localized
-   Suggested, validated, and autocompleted in real-time
-   Geocoded the address down to the highest resolution possible (street is best, city is required)
-   Allowed the user to correct any of this information, including a map that changed the geocoded information

This is my journey in building such a form. Hopefully, it will give other developers a bit of guidance when they almost inevitably come upon this sort of thing in their projects. I've had to do this on a major project at least a dozen times now, and it seems to be a feat each time.

Needs moar fieldz (not really)
------------------------------

First, the absolute basics. Most of us have a pretty good understanding of what an address is, and how it should translate into a form. Consider the following:

![standard_form_1](https://static1.squarespace.com/static/5164a6b6e4b0ec2b02b88716/t/53055310e4b0619b7f8a8b0b/1392857874125/standard_form_1?format=1500w)

Rather innocuous. Most people in the United States would consider this a pretty standard address form. It has all the components that one would need to send someone something over the mail, but after even thinking about it a little, one could see that there might be some fields missing: a second street address for apartment numbers, floors, and suites for example.

![2.png](https://static1.squarespace.com/static/5164a6b6e4b0ec2b02b88716/t/53055414e4b0c231259888e3/1392858134671/2.png?format=1500w)

A small change, surely. But wait! Some addresses require that you also need a name for a company like when you need a c/o, and we wouldn't want people putting that in the first street address line then their actual address in the second line, right? We should tweak our design to make this clearer:

![3.png](https://static1.squarespace.com/static/5164a6b6e4b0ec2b02b88716/t/530554fee4b07e4708f7469d/1392858368176/3.png?format=1500w)

That's better. But wait, we could make this address form *even better* by abstracting away some of these elements into smaller components, right? Name should be first name, last name, street addresses can be broken up into street lines and floors - those should all be different fields! And what about those nasty 9-digit zip codes? That should be broken out too, but we'll make some of it optional. Oh, and while we're at it, we should be able to make the State field a drop down with abbreviations of states in the US, because who wants to waste precious moments of their lives typing in *two *letters?!

![4.png](https://static1.squarespace.com/static/5164a6b6e4b0ec2b02b88716/t/530557a7e4b096771ae629d9/1392859053742/4.png?format=1500w)

Perfect! This is exactly what we want for address form. You start patting yourself on the back at how *standardized* and *abstracted* this form is, and you think that there couldn't possibly be anything wrong with it. Until, of course, your boss comes around and goes: "Holys@#t that's a scary form. No customer is going to want buy something from us if they have to fill *that *out. Oh, and I also came by to tell you that we're now taking international orders, so I don't think that 'state' field will work anymore."

You stare blankly at your screen with the same look a five year old gets when he drops his ice cream right after leaving the shop. Some places don't even *have* the concept of a state, you think. Well, time to start over.

**The Lesson: Don't Get Crazy**

Don't try and abstract and generalize at the cost of overcomplicating your address form. Try to keep the design of your form as intuitive and as familiar as possible. Overly abstracting and generalizing is a habit that many programmers (and sometimes especially the best ones) turn into a crippling pitfall. It not only makes your form looks scary, but it probably means that it's going to be wrong because you might need to internationalize it anyway. Addresses are nasty bits of data. As a testament to how *not *standardized addresses are (especially once you look around the world), I defer to [Falsehoods Programmers Believe About Addresses](http://www.mjt.me.uk/posts/falsehoods-programmers-believe-about-addresses/) by Michael Tandy. I'll take a few of my favorite excerpts out as examples:

-   **When there is a building number, it will be all-numeric.**

    Counterexample: 1A Egmont Road, Middlesbrough, TS4 2HT

    4-5 Bonhill Street, London, EC2A 4BX

-   **No buildings are numbered zero**

    Counterexample: 0 Egmont Road, Middlesbrough, TS4 2HT

-   **Well, at the very least no buildings have negative numbers**

    Guy Chisholm provided this counterexample: Minusone Priory Road, Newbury, RG14 7QS

    (none of the databases I've checked render this as -1)

-   **Addresses will have a reasonable number of characters - less than 100, say.**

    Not when organisation and department names can be included in addresses! For example: Department For Environment Food & Rural Affairs (D E F R A), State Veterinary Service, Animal Health Office, Hadrian House, Wavell Drive, Rosehill Industrial Estate, Carlisle, CA1 2TB, United Kingdom

    Another example: The Gynaecology Cancer Research Unit, Department of Obstetrics & Gynaecology, St. Bartholomews & The Royal School of Medicine & Dentistry, Charterhouse Square, London, EC1M 6GR, United Kingdom

-   **But street names will be reasonably short - certainly less than 50 characters**

    Susanne Schmidt provides the longest street name in Germany: Bischöflich-Geistlicher-Rat-Josef-Zinnbauer-Straße in 84130 Dingolfing, Bavaria

    [Graham Rhind](http://grcdi.blogspot.de/2010/09/how-long-is-your-street-name-field.html) suggests this 89-character street name in Bihac, Bosnia: Aleja Alije Izetbegovića Prvig Predsjednika Predsjedništva Republika Bosna i Hercegovina

Get it? Okay. Now, in some cases, one may even be tempted to use a single, general address line that is so streamlined that it would make Jony Ive moan in wet, glorious awe:

![5.png](https://static1.squarespace.com/static/5164a6b6e4b0ec2b02b88716/t/53055c2ce4b0565822dadbf5/1392860206604/5.png?format=1500w)

I am personally a big fan of this approach since I can still get a lot of interesting information about the address using some parsers (for the United States anyways), but this may be too minimalistic for most sites, even for Stack (it's really important we got cities for what we wanted). So we settled on a simple address field with another field for city, state, county, zip bundled together as "City," as here:

![6.png](https://static1.squarespace.com/static/5164a6b6e4b0ec2b02b88716/t/53055d62e4b09f078253e3e1/1392860516123/6.png?format=1500w)

Are you *sure* that's an address? Where is it?
----------------------------------------------

When it comes to validating, autocompleting, and geocoding addresses, this became a challenge in and of itself because of the restrictions on what services we could use. This was especially difficult because we decided to use [MapBox](http://mapbox.com/) (which is freaking beautiful) for our maps, which meant that we **couldn't use any of Google's Maps API**. Apparently, if you use any of the Maps API data, [you must display a Google Map](https://developers.google.com/maps/terms). This bears repeating in a pretty obvious, unambiguous way:

> "You must not use or display the Content without a corresponding Google map, unless you are explicitly permitted to do so in the Maps APIs Documentation, or through written permission from Google. In any event, you must not use or display the Content on or in conjunction with a non-Google map. For example, you must not use geocodes obtained through the Service in conjunction with a non-Google map. As another example, you must not display Street View imagery alongside a non-Google map, but you may display Street View imagery without a corresponding Google map because the Maps APIs Documentation explicitly permits you to do so."

--- Google Maps API Terms of Service 10.1.1.g

Considering [how comprehensive Google's API is](https://developers.google.com/maps/documentation/javascript/reference) for doing this sort of thing, this was more than a trivial obstacle. I still think that the end result was still worth tying our hands together for it, but it was a rather involved process.

That being said, most geographic APIs worked pretty similarly and could do all of the data intensive things we wanted. All we would need to do is send an API a string query that represented the full address, and each service would usually return an array of formatted objects that returned its best results. Each of these objects typically involved the following points of information:

-   Formatted street address
-   City name
-   State / province name or appropriate abbreviation
-   Country or country code
-   Postal code
-   Latitude and Longitude

Now the problem, of course, were the nuances of each API. Here's a list of APIs that we considered, and those that are in bold are the ones we ultimately ended up using in our implementation:

-   [Google Maps](https://developers.google.com/maps/)
-   [Bing Maps](http://www.microsoft.com/maps/choose-your-bing-maps-API.aspx)
-   [**Yahoo Maps**](http://developer.yahoo.com/)
-   [Foursquare Venue Search](https://developer.foursquare.com/docs/venues/search)
-   [**Open Street Maps Nominatim**](http://wiki.openstreetmap.org/wiki/Nominatim)
-   [Texas A&M Geocoding Service](http://geoservices.tamu.edu/)
-   [**SmartyStreets**](http://smartystreets.com/)
-   [MapLarge](http://maplarge.com/)
-   [MapQuest](http://developer.mapquest.com/)

There's also [another comprehensive list](http://geoservices.tamu.edu/Services/Geocode/OtherGeocoders/) of geo services on the Texas A&M site that you should check out if you're interested. Obviously, I won't be going into every one of these services (I didn't personally test them all, others on my team did). In the end, we used multiple geo services to make sure that if one failed, we could fall back on another. After testing each of these services with actual user input, we arrived at the ones bolded above. There's a few reasons we came to what we did:

-   **We wanted street resolution for geocoding, and if that failed, an approximation **- Not all the services give an exact latitude & longitude for an address. Some of these services (notably Yahoo) only give the center of a bounding box that represents the general area that the address may be (according to the city/state/zip most likely). So to accomplish what we wanted, we resorted to (1) SmartyStreets, (2) Open Street Maps, and (3) Yahoo Maps in that order. We considered any addresses that failed in all three services to be invalid addresses.
-   **These aren't necessarily the "best" three services **- This was specific to our implementation (e.g. we were already deeply using one of the services), and what worked well *in this combination and order* to get autocomplete, validation, and geocoding the way we wanted.
-   **SmartyStreets is amazing (for US addresses)** - Since a large number of addresses we were dealing with were US addresses, SmartyStreets' API did most of the heavy lifting for us. They have an incredibly straightforward service that gives extremely accurate results for the United States. Also, we opted to only autosuggest for US addresses using SmartyStreets (they have an [amazing jQuery](http://smartystreets.com/kb/liveaddress-api/website-forms) plugin for it) since it was more of a decorative helper rather than a mission-critical feature. We did automatic validation using the other services internationally.
-   **Open Street Maps is pretty good for international street geocoding **- Because international address formats are so varied (as mentioned earlier), it seems logical that crowd-sourced geo data would be sufficient for our needs. Open Street Maps is also used by [Foursquare](http://foursquare.com/) (which I'm a big fan of, and with whom I consulted) and it's nice to be able to get some community driven data in there.
-   **Yahoo is strong at coarse geocoding **- It was an absolute requirement for us to get at least city level resolution for our addresses. Yahoo isn't capable of street level geocoding, but it was sufficient for what we wanted in our previous version of address forms. It was also deeply integrated with our existing codebase, so it didn't make sense to rip it out for something different.

In the end, we bundled all of these APIs into an internal service that called them in succession until we got a list of successful results. Each of the results included at least an approximate latitude & longitude that we could use as a starting point on the map input we had. The results started suggesting as part of the first "Address" field but tried to suggest a *full *address rather than just that field. If they picked a suggested address, it would automatically populate the "City" field and put in the correct zoom, center, and pin on the map input. The user could, of course, modify any of these fields before submitting the form. They could even move the pin around on the map to get *really *precise (something we were inspired by from [Foursquare](https://foursquare.com/add-place)). We thought that even the best geo coders out there couldn't compete with user-verified input. Here's what the final result looks like:

![7.png](https://static1.squarespace.com/static/5164a6b6e4b0ec2b02b88716/t/53056ebde4b087940a74b739/1392864960004/7.png?format=1500w)

Final Thoughts
--------------

My team is still working on this, and it could certainly improve given all the different services available. I've yet to see how this will stand up once we actually get user input at scale. I do think we have something that works reasonably well though. It fits all the original requirements at hand, and comes to a sufficient level of standardization and accuracy that is useable for us. I would [love to hear](http://twitter.com/jonhmchan) suggestions for other geo services and what other problems people might have run into designing their own forms.

Hopefully, this insight will make the perilous journey of addresses a little less troublesome for you.