const { el, svg, router, mount, list, text } = redom
let model = { 
  state: {
    navpostion : 0,
    lastStateHome : 1,
    theme: 0
  },
  data : {
    icons : {
      settings : {
        classNames : ".h2.w2.pa2",
        path :"M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
      },
      devices : {
        classNames : ".h-50.w-50",
        path : "M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z"
      },
      network : {
        classNames: ".h-50.w-50",
        path : "M634.91 154.88C457.74-8.99 182.19-8.93 5.09 154.88c-6.66 6.16-6.79 16.59-.35 22.98l34.24 33.97c6.14 6.1 16.02 6.23 22.4.38 145.92-133.68 371.3-133.71 517.25 0 6.38 5.85 16.26 5.71 22.4-.38l34.24-33.97c6.43-6.39 6.3-16.82-.36-22.98zM320 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm202.67-83.59c-115.26-101.93-290.21-101.82-405.34 0-6.9 6.1-7.12 16.69-.57 23.15l34.44 33.99c6 5.92 15.66 6.32 22.05.8 83.95-72.57 209.74-72.41 293.49 0 6.39 5.52 16.05 5.13 22.05-.8l34.44-33.99c6.56-6.46 6.33-17.06-.56-23.15z"
      }
      
    }
    }

}


settingsIconClasses = ".h2.w2.pa2"

class SvgIcon {
  constructor(name) {
  this.el = svg(
  "svg" + model.data.icons[name].classNames,
  svg("symbol", { id: name, viewBox: "0 0 512 512" }, svg("path", { d:model.data.icons[name].path})),
  svg("use", { xlink: { href: "#" + name } })
)
  }
}

const devicesIcon = svg(
  "svg.h-50",
  svg("symbol", { id: "devices", viewBox: "0 0 576 512" }, svg("path", { d:"M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z"})),
  svg("use", { xlink: { href: "#devices" } })
);

const networkIcon = svg(
  "svg.h-50",
  svg("symbol", { id: "network", viewBox: "0 0 640 512" }, svg("path", { d:"M634.91 154.88C457.74-8.99 182.19-8.93 5.09 154.88c-6.66 6.16-6.79 16.59-.35 22.98l34.24 33.97c6.14 6.1 16.02 6.23 22.4.38 145.92-133.68 371.3-133.71 517.25 0 6.38 5.85 16.26 5.71 22.4-.38l34.24-33.97c6.43-6.39 6.3-16.82-.36-22.98zM320 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm202.67-83.59c-115.26-101.93-290.21-101.82-405.34 0-6.9 6.1-7.12 16.69-.57 23.15l34.44 33.99c6 5.92 15.66 6.32 22.05.8 83.95-72.57 209.74-72.41 293.49 0 6.39 5.52 16.05 5.13 22.05-.8l34.44-33.99c6.56-6.46 6.33-17.06-.56-23.15z"})),
  svg("use", { xlink: { href: "#network" } })
);


function changeNav(x) {
  model.state.navpostion = x
  if (x == 1 ) { 
    model.state.navpostion = 1
    app.update("network")}
  else { 
    model.state.navpostion = 0
    app.update("home")}
  return
}

class TopBar {
  constructor() {
    this.update()
  }
  update() {
    this.title = el('div.pa2.flex-grow-1.al.flex.items-center', "PolNet")
    this.setting = el('div.pa2.flex.justify-end', {onclick:function(e){app.update("settings")}}, new SvgIcon("settings"))
    this.el = el('div.w-100.mw8-l.h3.h3-l.fixed.top-0.flex.justify-end.z-999.bg-inherit', this.title, this.setting )
  }
}

class BottomNav {
  constructor() {
    console.log(model.state.navpostion)
    this.devices = el('div.w-50.h-100.tc.f5' + (model.state.navpostion ==  0 ? ".blue" : ""), {onclick:function(e){changeNav(0)}}, new SvgIcon("devices"), el("div", "Devices")) 
    this.network = el('div.w-50.h-100.tc.f5' + (model.state.navpostion ==  1 ? ".blue" : ""), {onclick:function(e){changeNav(1)}}, new SvgIcon("network") , el("div", "Network"))
		this.el = el('div.w-100.mw8-l.h3.h3-l.fixed.bottom-0.flex.shadow-1.pa1.z-999.bg-inherit', this.devices, this.network)
  }
  onmount() {
    switch (model.state.navpostion) {
      case 0 :
        this.devices.classList.add("blue")
        this.network.classList.remove("blue")
        break
      case 1 :
        this.devices.classList.remove("blue")
        this.network.classList.add("blue")
        break
    }
  }
}

class SummaryComponent {
  constructor() {
    this.summary = el("div.flex-grow-1.pa2", el("div", "12 Devices"), el("div.f6", "last updated at 10:00"))
    this.el = el('div.w-100.h3.h3-l.mt5.flex.justify-end', this.summary)
  }
  update() {

  }
}

class DeviceListCard {
  constructor() {
    this.ipaddr, this.macid, this.name, this.manufacturer, this.connectState
    this.logo
    this.deviceSummary
    this.deviceManufacturer
    this.addDevice
    this.el
  }
  update(data) {
    this.ipaddr = data[1]
    this.name = data[0]
    this.manufacturer = data[2]
    this.macid = data[3]
    let macid = this.macid
    let name  = this.name
    let ipaddr = this.ipaddr
    this.connectState = data[4]
    let connectState = this.connectState
    this.logo = el("div.w-10")
    this.deviceSummary = el("div.flex-grow-1.pa2", el("div.f6.f4-l", this.name), el("div.f7.f5-l", this.ipaddr))
    this.deviceManufacturer = el("div.flex-grow-1.pa2.tr", el("div.f6.f4-l", this.manufacturer), el("div.f7.f5-l", this.macid))
    this.addDevice = el("div.w-100.flex", el("button.bg-green.bn.f5.pa1.flex-grow-1", "accept"),el("button.bn.bg-red.f5.pa1.flex-grow-1", "reject"))
    this.el = el("div.w-100.pa2", el("div.w-100.bt.flex.justify-end", {onclick:function(e){
      app.update("details", [macid, ipaddr, name, connectState] )}
    }, this.logo, this.deviceSummary, this.deviceManufacturer))
    }
}

const topBar = new TopBar()
const bottomNav = new BottomNav()
const summaryComponent = new SummaryComponent()
const unconnecteDeviceList = list("div.w-100.mb5", DeviceListCard)
const allowedDeviceList = list("div.w-100.mb5", DeviceListCard)
const deniedDeviceList = list("div.w-100.mb5", DeviceListCard)

class SettingsMenu {
  constructor() {
    this.settingsNav = el("div.w-100.h3.sticky.top-0.flex.z-999.bg-inherit.pa2", el("div", {onclick:function(e){changeNav(model.state.navpostion)}},"back"), el("div.flex-grow-1.tc" , "Settings"))
    this.about = el("div.w-100", " This is the settings page")
    this.toggleTheme = el("div.w-100", {onclick:function(e){
        if (model.state.theme == 0 ) {
          document.body.classList.add("bg-black")
          document.body.classList.remove("bg-white")
          model.state.theme = 1
        }
        else {
          document.body.classList.remove("bg-black")
          document.body.classList.add("bg-white")
          model.state.theme = 0
        }
    }}, "Toggle Theme")
    this.el = el("div.w-100.h-100", this.settingsNav, this.about, this.toggleTheme)
  }
  onmount() {
    this.el.classList.add("slideinright")
    model.state.lastStateHome = 0
  }
  update() {

  }
}

class HomePage {
  constructor() {
    
    this.el = el("div.h-100.w-100.f4.z-0.bg-inherit", new TopBar(), summaryComponent, el("div.pa2","Pending"), unconnecteDeviceList, el("div.pa2", "Allowed"), allowedDeviceList,  el("div.pa2", "Denied"), deniedDeviceList,  new BottomNav())
  }
  onmount() {
    if (!model.state.lastStateHome) {
      console.log("yes")
      this.el.classList.add("slideinleft")
    }
    model.state.lastStateHome = 1
  }
  onunmount() {
    this.el.classList.remove("slideinleft")
  }
  update() {

  }
}

class NetworkPage {
  constructor() {
    this.el = el("div.h-100.w-100.f4.z-0", new TopBar(),new BottomNav())
  }
  onmount() {
    if (!model.state.lastStateHome) {
      console.log("yes")
      this.el.classList.add("slideinleft")
    }
    model.state.lastStateHome = 1
  }
  onunmount() {
    this.el.classList.remove("slideinleft")
  }
  update() {

  }
}

class DeviceInfo {
  constructor() {
    this.deviceMac, this.ipaddr, this.name, this.connectState
    this.deviceDetailsNav = el("div.w-100.h3.sticky.top-0.flex.z-999.bg-inherit.pa2", el("div", {onclick:function(e){app.update("home")}},"back"), el("div.flex-grow-1.tc" , "Device Details"))
    this.MACID = el("div.w-100")
    this.IPADDR = el("div.w-100")
    this.nameLabel = el("span", "Name ")
    this.deviceName = el("input", {oninput:function(e){
      if (deviceInfo.connectState == 0 ) {
        if (this.value.length > 0 ) {
          document.forms["connectionState"]["allow"].checked = true
        }
        else {
          document.forms["connectionState"]["deny"].checked = true
        }
      }
    }})
    this.connectionStateRadio = el("form", {name:"connectionState"}, el("input", {type:"radio",name:"connectionState",id:"allow",value:"allow"}),el("label", {for:"allow"}, "Allow"),el("input", {type:"radio",name:"connectionState",id:"deny",value:"deny"}),el("label", {for:"deny"}, "Deny"))
    this.save = el("button","save")
    this.cancel = el("button", "Cancel")
    this.el = el("div.w-100.h-100.pa2", this.deviceDetailsNav, this.MACID, this.IPADDR, this.nameLabel, this.deviceName, this.connectionStateRadio, this.save, this.cancel)
  }
  update(data) {
    model.state.lastStateHome = 0
    this.deviceMac = data[0]
    this.ipaddr = data[1]
    this.name = data[2]
    this.MACID.textContent = "Mac ID: " + this.deviceMac
    this.IPADDR.textContent = "IP ADDR: " + this.ipaddr
    this.deviceName.value = this.name
    this.connectState = data[3]
    if (this.connectState == 0 ) {
      document.forms["connectionState"]["deny"].checked = true
    }
    else if ( this.connectState == 1 ) {
      document.forms["connectionState"]["allow"].checked = true
    }
    else {
      document.forms["connectionState"]["deny"].checked = true
    }
    this.deviceData = el("div.w-100", el("div", "MAC ID : " + this.deviceMac))
  }
  onmount() {
    this.el.classList.add("slideinright")
    model.state.lastStateHome = 0
  }
}

const settingsMenu = new SettingsMenu()
const Network = new NetworkPage()
const Home = new HomePage()
const deviceInfo = new DeviceInfo()
const app = router('.app.h-100', {
  home: Home,
  settings: settingsMenu,
  network: Network,
  details: deviceInfo
})
const mainNode = el("div.w-100.h-100.flex.justify-center", {id:"mainnode"},el("div.w-100.h-100.mw8-l", app))

function main() {
  mount(document.body, mainNode)
  app.update('home')
  unconnecteDeviceList.update(unconnectedDeviceListData)
  allowedDeviceList.update(connectedDeviceListData)
  deniedDeviceList.update(deniedDeviceListData)
}



window.addEventListener('load', function(){setTimeout(main,0)}, false)