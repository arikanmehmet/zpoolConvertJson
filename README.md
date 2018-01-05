# zpoolConvertJson
ZFS pool status convert to JSON file

#**ZFS Pool Status Convert to JSON format**
An application that I can use to transfer the states of the pools I created in ZFS to JSON format  and then saves it to a file.

#**What's ZFS?** 
  ZFS(Zettabyte File System) is an open source file system.

#**Where can I use this application?**
ZFS, which is used on high performance and backup unified storage systems and on personal storage systems (dropbox, etc.), allows you to efficiently use the situations of the pools.

#**Application Requirements**
- apt-get install nodejs
- apt-get install npm
- npm install lodash
- npm intall child_process
- require('fs')

## How to use ?
- Run `convertJson.js` file with root privilages :

*sudo node convertJson.js*
