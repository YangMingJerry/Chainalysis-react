# Chainalysis-react

Demo of final web page:

![demo](./data/demo.jpg)

## How to build and run:

requirements: Linux 

instructions:

1. clone this repository
2. run this in your terminal

. entrypoint.sh

## Qestions
1. Are there any sub-optimal choices( or short cuts taken due to limited time ) in your implementation?
  I am pretty new to react.js, I basically start to learn JavaScript for this practice so it would not be perfect. I made the CSS very simple so I can implement this quicker.
  
2. Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)
    Yes, The over-designed part is the Pthyon backend, I could have use the Javascript express to work as the back-end and handling the http requests to coinbase and kraken api. But since I was more familiar with python fasiapi, I built a back-end to do these works based on Python, which means the front end would ask for the responses from the remote python back-end which is causing more latency. The trade off here is that my python back-end is more well developed and would be well prepared for adding more cryptocurrency and trading platforms.
    
3. If you have to scale your solution to 100 users/second traffic what changes would you make, if any?
  I have thinked about it while I build my back end system so I implemented a LRU cache. I actually have tested my concurrency capacity, which enables 200 users per seconds with 1000 requests per seconds and the response time would be 0.3 second. I think it is a decent performance.
  
4. What are some other enhancements you would have made, if you had more time to do this implementation
  I would design a schema for the back end, based in Pydantics. This schema would make the system more robust and easy to maintance and upgrade to more types of cryptocurrency and trading platforms.


