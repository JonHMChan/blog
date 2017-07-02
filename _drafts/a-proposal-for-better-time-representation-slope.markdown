---
title: A Proposal For Better Time Representation (SLOPE)
date: 2017-07-02 16:53:00 Z
categories:
- essay
layout: post
---

I work a lot with times. As someone who’s been tackling the events space and especially with calendars for a while now, dealing with times is something that I have to deal with constantly—and with great difficulty. Understanding calendar formats, RFC specifications, different date objects in different languages (think `JavaScript Date()` nightmares)…these are all things that make my life as a programmer handling times an absolute mess. The problem is that there is no universal and “complete” (more on this) standard for representing time that is computably friendly. Here are just some of the issues:

* Most standards for time representation are (what I call) “incomplete.” A “complete” representation for time should be a singular representation that includes all and only the essential information for any point, interval of time, or recurrence of time intervals independent of geographic considerations (time zones).

* Time objects are hard to specify as a single point of time, an interval of time, or even recurrences of time intervals. You commonly need separate representations for each. They can and should be one representation.

* Timezones. Oh god, again. Timezones.

* Extremely disparate standards for easy data manipulation and formatting. It is currently a free-for-all when it comes to representing times: YYYY:MM:DD THH:MM:SSZ or Unix Timestamp? What about intervals of time? Why not MM/DD/YYYY?

* The representation should account for simple recurrences of points in time or intervals (every Friday at 2:00 PM, every other Tuesday at noon for an hour). They should be intuitive to understand.

* The representation should be easily transferable between platforms. Ideally in a text format.

* Current representations (most notably according to RFC 3339 and the like) are human readable, but painstakingly difficult to calculate with.

## Introducing SLOPE

As I was tackling these issues, I came up with my own solution. SLOPE is an acronym for the necessary parts of the representation: start, length, offset, period, and end. I’ll explain each, and go through with some examples. SLOPE is definitely not in its final form (take a look at the Pros \+ Cons section later), and any suggestions would be helpful.

* `start` – an integer, the start of a time interval as a Unix timestamp format according to UTC (*never* a relative timestamp).

* `length` – an integer, the number of seconds since `start` of the interval. Single points in time should leave the length as 0, the default value.

* `offsets` – an array of integers, ideally organized in increasing order, that specifies the number of seconds since the `start` that *each* repeating interval should begin with.

* `period` – an integer, the number of seconds between *each* interval's beginning timestamps (including the original interval’s beginning timestamp, specified in `start`).

* `end` – an integer, a Unix timestamp that specifies when all intervals should stop.

To represent all of my birthdays (the full length of my birthday - May 15th - from midnight to the next midnight) up to but not including the year 2050 starting in 1990:

```
​{
    start: 642758400,
    length: 86400,
    offsets: [],
    period: 32536000,
    end: 2536218000
}
```

Let’s go through the example. The first thing to notice is that the representation is in JSON format. Why JSON? Quite simply, as text, it’s easy to transfer between platforms through AJAX—and it’s what I've used for my own projects. In addition, because the offset is sometimes represented as an array (more on this later), finding a text-based representation that could accommodate complex objects naturally led to JSON. However, this is not a strict specification. As long as the elements are represented in order, a SLOPE representation could be comma separated or even a multidimensional array (more on this later).

The next thing to notice is `start`. This is a pretty straightforward Unix timestamp according to Coordinated Universal Time (the number of seconds elapsed since January 1, 1970 GMT). Just regular Unix timestamps. If you want to represent a point of time before UTC, use a negative integer. In the example above, 642758400 is “May 15, 1990 at 12:00 AM PST,” my birthday. The important thing to note here is that `start` specifies the beginning point of what I’m calling the template interval of the SLOPE. More on this later.

After the first field, we have `length`. This is also pretty straightforward and is just the number of seconds since the `start` that the template interval is supposed to last. In the example above, 86400 is the number of seconds in a day (24 \* 60 \* 60). If I wanted to only represent the beginning of my birthday – a single point in time – I would leave length as 0, the default value

## Recurrences

So far so good, but where it gets interesting is with "recurrences". Remember that I originally created the SLOPE standard representation to help with calendar events. Representing something like a recurring lunch with a friend, say “every Monday at noon EST for an hour,” was a very difficult thing to do. The last three parts of SLOPE – `offsets`, `period`, and `end` – are specifically used for recurrences. They are all used with the template interval – the interval of time specified using start and length – as a starting point. All other intervals of time based off of the template interval I’ve called repeating intervals. In the example above, “May 15, 1990 12:00:00 AM PST for a day” is the template interval, while all other birthdays after that (for 1991, 1992…2050) are known as repeating intervals. This can be a bit confusing, but will make explaining `offset`, `period`, and `end` much easier.

I’m going to skip offsets for now and go to period first (you’ll see why). Simply an integer, `period` is the number of seconds between each repeating intervals’ start times beginning with `start`. In the example above 32536000 is the number of seconds in a year (365 \* 24 \* 60 \* 60), since I want every repeating interval to start a year after the previous one. If I want to find out when my first birthday is after I was born (in 1991), I simply add start and period together (674294400=642758400\+32536000). Under SLOPE, each repeating interval will have the same length.

Let’s now deal with `offset`, probably the most difficult part of the SLOPE representation to grasp. This field is used to create complicated recurrences that take the original recurrence according to `start`, `length` and `period` and duplicates the original recurrence for each value in the array. Each value within the array is another Unix timestamp that each new recurrence should use instead of start. If there are no new recurrences, the array is left empty. In more simple terms, imagine taking the original recurrence according to `start`, `length`, and `period`, duplicate it, and shift the entire recurrence using the new `start` entry. This is best explained with the example we have. Take the SLOPE we have now, representing every birthday I have for the length of the day every year from 1990 to 2050. I could also represent my sister Tiffany’s birthdays (beginning with July 21, 1991 12:00:00 AM PST or 680083200 in Unix) in the same SLOPE, simply by specifying adding her birthday as a value in the array. It would take the entire recurrence I originally had and duplicate it but with a “new start.” The revised SLOPE would look like this:

```
​{
    start: 642758400,
    length: 86400,
    offsets: [680083200],
    period: 32536000,
    end: 2536218000
}
```

I could do the same to account for my other sister Eileen’s birthdays as well (starting September 8, 1993 at midnight or 747475200), to accommodate all three of our birthdays in the same SLOPE:

<code>
{
start: 642758400,
length: 86400,
offsets: \[680083200, 747475200\],
period: 32536000,
end: 2536218000
}
</code>

Offsets should never be before the start for any reason. If there is a timestamp that is earlier than one in offsets the earliest value should be switched with start (more on this later). In addition, it is best practice to order the timestamps in offsets in ascending order from earliest to latest.

Finally, we reach the last part of the SLOPE representation, end. This is a Unix timestamp that specifies a ceiling for which all repeating intervals must end. In the original example, I used the end timestamp corresponding to May 15, 2050 12:00:00 AM PST. In this example, the SLOPE would not represent my birthday for 2050, because it is beyond the “hard stop” specified in end. Only if end were May 16, 2050 12:00:00 AM PST (exactly a day after, or the exact amount length is after that interval) would my 2050 birthday be included. This would also be the case for any recurrences denoted with offsets.

Pros \+ Cons

Pros

Completeness ​- I made SLOPE so that it could be unified representation for times for most use cases: single points in time, intervals of time, recurring intervals of time, and even multiple recurrences with offsets. These are all encompassed by a single representation that is not accounted for in others.\
Better computability ​- SLOPE makes computation for times (expanding and calculating times) much more obvious than RFC3339 representations, especially when it comes to recurrences with things like RRULE, &c. RFC3339 and recurrence rules in current calendar formats are unintuitive. It strips away the need to convert RFC3339 formats to some computable format and back as well as the need to understand the arcane intricacies of recurrence rules. You just need some basic math.\
Geographically independent - ​There is no reliance on time zones. I created SLOPE with the intention that it would be accurate regardless of its implementation in a specific region. Time zones embedded into time representations - in my experience - have made standardization and accuracy nightmare.\
Intuitive ​- I did everything to make SLOPE intuitive. The name "SLOPE" is meant to be an easy-to-remember acronym that accurately explains a complete representation of time. The concepts explained by each part of the acronym are meant to be obvious as well.\
Cons

Leap years ​- The biggest problem and probably a breaking point for the standard. The problem with unix timestamps is that it cannot account for leap years. This puts a big snag in the road for the concept of easily computable dates. My intuition says that the onus for accounting for leap years falls on the developer, rather than on the standard itself.\
Not directly human readable ​- Though conceptually easy to understand, the reliance on Unix timestamps makes it difficult to hard-code a specific time without some assistance. However, this is something easily done with conversions built into most if not all major programming languages.\
​Lack of recurrence exceptions ​- One of things SLOPE fails to capture is recurrence exceptions. Returning to the example of my birthdays from 1990 to 2050, if I wanted to exclude my 20th birthday, I wouldn't be able to like some other representations could. Then again, exceptions may be just that from a development standpoint - exceptions: I see them more as an accessory to time representation (like timezones) rather than a necessary component.\
​Verbose ​- I do think that SLOPE can be verbose in a number of situations, especially when talking about single points in time or single intervals or time. Perhaps a short hand for SLOPE could be used (remember JSON is not a strict guideline) to solve this issue:

<code>
​General Format:
start;length;offset1,offset2,...,offset3;period;end

Single point in time:
12345

Single interval in time:
12345;60

Daily recurrence, no offsets:
12345;60;;86400;50000

Daily recurrence with offsets:
12345;60;23456,34567;86400;50000
</code>

## Your Thoughts

Though I've spent a lot of time thinking about this, I certainly haven't thought up of everything. There must be things that I've overlooked, so I'm looking to your comments about the proposal. In the end, I wanted to make things easier for myself when working with times, especially when it came to calendars. I think that SLOPE could have some interesting potential with some new insight.