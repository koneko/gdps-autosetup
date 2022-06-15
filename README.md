# gdps-autosetup
cool little tool i made for automating replacing url endpoints in GD  
makes it super simple and works out of the box with [gd-anime-ps](https://github.com/koneko/gd-anime-ps)  
# setup
setup is very simple  
1. clone the repo
2. open `endpoints.txt` and change your endpoints in this format (you can but dont have to put new lines)
```js
// format goes like this
<robtop's url>,<your url>,<true/false (base64 encoded yes or no)>;
// explanation: you must end all the cases with ; and seperate with , (no space in between), your url must be the same length as robtops
```
3. open `extra.txt` and change the extra configuration like so
```js
// format goes like this
<game location>:|:<base url>
// explanation: no new lines, seperated by :|: and base url refers to the database url without anything extra (already filled out in example)
```
4. have NodeJS installed on your system
5. `node index.js` and wait for it to finish
6. profit
