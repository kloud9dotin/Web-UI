let appData = {
  firewall: {
    connectedDeviceListData : [["router","192.168.1.128","linksys","ab:cd:ef:gh",1],["phone","192.168.1.129","oneplus","ac:bd:ef:gh",1],
      ["generic","192.168.1.125","gigabyte","ab:cd:ef:hg",1],["Streaming Dongle","192.168.1.228","google","ab:dc:ef:gh",1],
      ["router","192.168.1.128","linksys","ab:cd:ef:gh",1],["phone","192.168.1.129","oneplus","ac:bd:ef:gh",1]],

    unconnectedDeviceListData : [["","192.168.1.128","linksys","ab:cd:ef:gh",0],["","192.168.1.129","oneplus","ac:bd:ef:gh",0]],

    deniedDeviceListData : [["router","192.168.1.128","linksys","ab:cd:ef:gh",2],["phone","192.168.1.129","oneplus","ac:bd:ef:gh",2]],
  },
  livedata : [
    [1583847847,6,365,"192.168.7.223",49126,"172.217.167.142",443,34,46,3678,52172],
    [1583847844,6,241,"192.168.7.223",60144,"178.250.0.130",443,8,7,1005,3231],
    [1583847843,6,241,"192.168.7.223",52021,"182.161.72.142",443,8,7,1005,3109],
    [1583847839,17,64,"192.168.7.223",50466,"192.168.7.1",53,1,1,60,124],
    [1583847835,6,309,"192.168.7.146",45471,"172.217.31.195",443,19,13,3130,2586]
  ]

}

let routerData = {
  macid : "",
  owner : {name :"", mobile: "",email : ""},
  lastUpdate : "",
  configuration : {},
  devices: {
    "ab:cd:ef:gh" : {name :"router", status: 1,ipaddr: "192.168.1.128"},
    "ac:bd:ef:gh" : {name :"phone", status: 1,ipaddr: "192.168.1.129", type :"mobile"},
    "ab:cd:ef:hg" : {name :"generic", status: 1,ipaddr: "192.168.1.125"},
    "ab:dc:ef:gh" : {name :"chromecast", status: 1,ipaddr: "192.168.1.121", type: "cast"},
    "cd:ef:gh:ij" : {name : "", status : 0,ipaddr: "192.168.1.200", type :"mobile" },
    "ef:gh:ij:kl" : {name : "phone", status: 2,ipaddr: "192.168.1.205", type :"mobile"}

  },
  telemetry : [
    [1583847847,6,365,"192.168.7.223",49126,"172.217.167.142",443,34,46,3678,52172],
    [1583847844,6,241,"192.168.7.223",60144,"178.250.0.130",443,8,7,1005,3231],
    [1583847843,6,241,"192.168.7.223",52021,"182.161.72.142",443,8,7,1005,3109],
    [1583847839,17,64,"192.168.7.223",50466,"192.168.7.1",53,1,1,60,124],
    [1583847835,6,309,"192.168.7.146",45471,"172.217.31.195",443,19,13,3130,2586]
  ]
}
