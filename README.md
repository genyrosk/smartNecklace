# smartNecklace

### Built With
node.js
twilio
raspberry-pi
microbit
c++
python
bluetooth

### Try it out
[GitHub Repo](https://github.com/genyrosk/smartNecklace)

----------------------- ------------------------------------
![GitHub Repo](https://github.com/genyrosk/smartNecklace)
------------------------------------------------------------


# Inspiration
For elderly, ill or disabled family and friends, the risk of falling is a serious concern. In fact, research carried out by the Department of Surgery at the University of Rochester medical centre found that the elderly over the age 70 are three times more likely to be fatally injured. In many cases, for elderly adults who are frail and have pre-existing medical conditions, what seems like a minor fall can lead to a broken hip or bones. In the scenario that these individuals are alone or cannot easily gain access to someone - this can lead to far reaching and very serious consequences.

# What it does
When a user falls, trips or sustains any significant impact, an emergency call is established with a list of guardians informing them of the user's emergency.

# How we built it
The necklace consists of a BBC Microbit, which uses its accelerometer to measure significant impact. When the acceleration exceeds a threshold, the Microbit sends an emergency message via Bluetooth LE to a Raspberry-Pi. The Raspberry-Pi makes an HTTP GET request to our Node.js server, which in turn establishes a call with the guardian of the user using the Twilio Call API.

# Challenges we ran into
the Twilio API was not straight forward
the microbit is designed for children, and has thus a built-in authentication process, which you're required to do before sending any data.
bluetooth Low Energy disconnects regularly and at a lower range than expected.

# Accomplishments that we're proud of
we built an end-to-end system, which is precisely what we wanted to do from the offset.
our project encompasses many different technologies, from hardware programming with C++ and Python to setting up a server in Node.js and using an external API service.

# What we learned
we've learnt to program the microbit in C++, and the Raspberry-Pi in Python and Bluetooth Programming in general.
What's next for AlertLink
bi-directional calls
live notifications and data-logging
machine learning for better classification of falls
making it waterproof
