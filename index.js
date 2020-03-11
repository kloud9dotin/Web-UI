const { el, svg, router, mount, list, text } = redom
let model = { 
  state: {
    navposition : 0,
    lastStateHome : 1,
    theme: localStorage.getItem("theme") || 0,
    expandDevice : ""
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
      },
      leftArrow : {
        classNames: ".h2.w2.pa2",
        path:"M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
      },
      tick : {
        classNames: ".h2.w2.pa2",
        path:"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
      },
      dashboard : {
        classNames: ".h-50.w-50",
        path:"M288 32C128.94 32 0 160.94 0 320c0 52.8 14.25 102.26 39.06 144.8 5.61 9.62 16.3 15.2 27.44 15.2h443c11.14 0 21.83-5.58 27.44-15.2C561.75 422.26 576 372.8 576 320c0-159.06-128.94-288-288-288zm0 64c14.71 0 26.58 10.13 30.32 23.65-1.11 2.26-2.64 4.23-3.45 6.67l-9.22 27.67c-5.13 3.49-10.97 6.01-17.64 6.01-17.67 0-32-14.33-32-32S270.33 96 288 96zM96 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm48-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm246.77-72.41l-61.33 184C343.13 347.33 352 364.54 352 384c0 11.72-3.38 22.55-8.88 32H232.88c-5.5-9.45-8.88-20.28-8.88-32 0-33.94 26.5-61.43 59.9-63.59l61.34-184.01c4.17-12.56 17.73-19.45 30.36-15.17 12.57 4.19 19.35 17.79 15.17 30.36zm14.66 57.2l15.52-46.55c3.47-1.29 7.13-2.23 11.05-2.23 17.67 0 32 14.33 32 32s-14.33 32-32 32c-11.38-.01-20.89-6.28-26.57-15.22zM480 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"
      },
      mobile : {
        classNames: ".h-50.w-50",
        path:"M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"
      },
      cast : {
        classNames: ".h-50.w-50",
        path:"M447.83 64H64a42.72 42.72 0 0 0-42.72 42.72v63.92H64v-63.92h383.83v298.56H298.64V448H448a42.72 42.72 0 0 0 42.72-42.72V106.72A42.72 42.72 0 0 0 448 64zM21.28 383.58v63.92h63.91a63.91 63.91 0 0 0-63.91-63.92zm0-85.28V341a106.63 106.63 0 0 1 106.64 106.66v.34h42.72a149.19 149.19 0 0 0-149-149.36h-.33zm0-85.27v42.72c106-.1 192 85.75 192.08 191.75v.5h42.72c-.46-129.46-105.34-234.27-234.8-234.64z"
      },
      generic : {
        classNames: ".h-50.w-50",
        path:"M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"
      }      
    }
    }

}

function changeNav(x) {
  model.state.navposition = x
  if (x == 1 ) { 
    model.state.navposition = 1
    app.update("devices")}
  else { 
    model.state.navposition = 0
    app.update("dashboard")}
  return
}

function changeTheme() {
  if (model.state.theme == 0 ) {
    document.body.classList.add("bg-black")
    document.body.classList.remove("bg-white")
    model.state.theme = 1
    localStorage.setItem("theme", model.state.theme)
  }
  else {
    document.body.classList.remove("bg-black")
    document.body.classList.add("bg-white")
    model.state.theme = 0
    localStorage.setItem("theme", model.state.theme)
  }
}

class SvgIcon {
  constructor(name) {
  this.el = svg(
  "svg" + model.data.icons[name].classNames,
  svg("symbol", { id: name, viewBox: "0 0 512 512" }, svg("path", { d:model.data.icons[name].path})),
  svg("use", { xlink: { href: "#" + name } })
)
  }
}

class Option {
	constructor() {
			this.el = el("option")
	}
	update(data) {
			this.el.textContent = data[0]
			this.el.value = data[1]
	}
}

class SelectSection {
	constructor(text,data, defaultVal) {
		this.value = defaultVal
		this.text = text
		this.select =list('select.bg-inherit.bn', Option)
		this.el =el('div',this.text,this.select)
		this.select.id = "test"
		this.update(data)
  }
	update(data) {
		this.select.update(data)
	}
}

class TopBar {
  constructor() {
    this.networkSelect = new SelectSection("",[['54:A3:1B:42:37:E4',0],['54:A3:1B:42:39:30',1],['54:A3:1B:42:34:2C',3]],0)
    this.title = el('div.pa2.flex-grow-1.al.flex.items-center', this.networkSelect)
    this.setting = el('div.pa2.flex.justify-end', {onclick:function(e){app.update("settings")}}, new SvgIcon("settings"))
    this.el = el('div.w-100.mw8-l.h3.h3-l.fixed.top-0.flex.justify-end.z-999.bg-inherit', this.title, this.setting )
  }
  update() {
    this.networkSelect.update()
  }
}

class BottomNav {
  constructor() {
    this.devices = el('div.w-50.h-100.tc.f5' + (model.state.navposition ==  0 ? ".blue" : ""), {onclick:function(e){changeNav(1)}}, new SvgIcon("devices"), el("div", "Devices")) 
    this.dashboard = el('div.w-50.h-100.tc.f5' + (model.state.navposition ==  1 ? ".blue" : ""), {onclick:function(e){changeNav(0)}}, new SvgIcon("dashboard") , el("div", "Dashboard"))
		this.el = el('div.w-100.mw8-l.h3.h3-l.fixed.bottom-0.flex.shadow-1.pa1.z-999.bg-inherit', this.dashboard, this.devices)
  }
  onmount() {
    switch (model.state.navposition) {
      case 0 :
        this.dashboard.classList.add("blue")
        this.devices.classList.remove("blue")
        break
      case 1 :
        this.dashboard.classList.remove("blue")
        this.devices.classList.add("blue")
        break
    }
  }
}

class SummaryComponent {
  constructor() {
    this.summary = el("div.flex-grow-1.pa2", el("div", "6 Devices"), el("div.f6", "last updated at 10:00"))
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
    this.ipaddr = routerData.devices[data].ipaddr
    this.name = routerData.devices[data].name || ""
    this.macid = data
    let macid = this.macid
    //let name  = this.name
    //let ipaddr = this.ipaddr
    this.connectState = routerData.devices[data].status
    //let connectState = this.connectState
    this.connectionStateRadio = el("form.pa2.w-100.tc", {name:"connectionState",}, el("span.pa2", "Access:"), el("input.pa2", {type:"radio",name:"connectionState",id:"allow",value:"allow"}),el("label.pa2", {for:"allow"}, "Allow"),el("input.pa2", {type:"radio",name:"connectionState",id:"deny",value:"deny"}),el("label.pa2", {for:"deny"}, "Deny"))
    this.confirmAction = el("div.w100.tc", el("button.bn.w-50.bg-green.pa2", {onclick:function() {
      model.state.expandDevice = ""
      Devices.update()
    }}, "Apply"), el("button.bn.w-50.bg-red.pa2", {onclick:function() {
      model.state.expandDevice = ""
      Devices.update()
    }}, "Cancel"))
    this.nameInput = el("div.tc", el("span", "Name: "),el("input.pa2", {onclick:function(e) {e.stopPropagation()},placeholder:this.name}))
    this.logo = el("div.h3.w3.pa2.flex.items-center",(routerData.devices[data].type ? new SvgIcon(routerData.devices[data].type): new SvgIcon("generic")))
    this.deviceSummary = el("div.flex-grow-1.pa2", el("div.f6.f4-l", this.ipaddr))
    this.deviceManufacturer = el("div.flex-grow-1.pa2.tr", el("div.f6.f4-l", (this.name != ""? this.name : this.macid)))
    this.el = el("div.w-100.pa2.", el("div.w-100.bt.flex.justify-end.items-center", {onclick:function(e){
      if (model.state.expandDevice == macid) {
        return
      }
      else {
        model.state.expandDevice = macid
      }
      Devices.update()
      /*app.update("details", [macid, ipaddr, name, connectState] )*/}
    }, this.logo, this.deviceSummary, this.deviceManufacturer), (model.state.expandDevice == macid && this.nameInput), (model.state.expandDevice == macid && this.connectionStateRadio),(model.state.expandDevice == macid && this.confirmAction) )
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
    this.settingsNav = el("div.w-100.h3.sticky.top-0.flex.z-999.bg-inherit.pa2.items-center", el("div", {onclick:function(e){changeNav(model.state.navposition)}}, new SvgIcon("leftArrow")), el("div.flex-grow-1.tc.blue" , "Settings"))
    this.about = el("div.w-100.pa2", " This is the settings page")
    this.toggleTheme = el("div.w-100.pa2", {onclick:function(e){changeTheme()}}, "Toggle Theme")
    this.changelog = el("div.pt5.pa2",el("h3","Change Log"),
     el('ul', 
     el('li', "Change Order of tabs in bottom Nav"),
     el('li', "Replaced Network tab with Dashboard"),
     el('li', "Added Select option to toggle between different MAC-ID"),
     el('li', "Change Data Structure to single JSON object"), 
     el('li', "Added table in network tab")
     ))
    this.el = el("div.w-100.h-100", this.settingsNav, this.about, this.toggleTheme, this.changelog)
  }
  onmount() {
    this.el.classList.add("slideinright")
    model.state.lastStateHome = 0
  }
  update() {

  }
}

class DevicesPage {
  constructor() {
    
    this.el = el("div.h-100.w-100.f4.z-0.bg-inherit", new TopBar(), summaryComponent, el("div.pa2.yellow","Pending"), unconnecteDeviceList, el("div.pa2.green", "Allowed"), allowedDeviceList,  el("div.pa2.red", "Denied"), deniedDeviceList,  new BottomNav())
  }
  onmount() {
    if (!model.state.lastStateHome) {
      this.el.classList.add("slideinleft")
    }
    model.state.lastStateHome = 1
  }
  onunmount() {
    this.el.classList.remove("slideinleft")
  }
  update() {
    let deviceKeys = Object.keys(routerData.devices)
    unconnecteDeviceList.update(deviceKeys.filter(k => routerData.devices[k].status == 0))
    allowedDeviceList.update(deviceKeys.filter(k => routerData.devices[k].status == 1))
    deniedDeviceList.update(deviceKeys.filter(k => routerData.devices[k].status == 2))
  }
}

class DashboardPage {
  constructor() {
    this.el = el("div.h-100.w-100.f4.z-0", new TopBar(), new BottomNav())
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
/*
class DeviceInfo {
  constructor() {
    this.deviceMac, this.ipaddr, this.name, this.connectState
    this.save = el("div", {onclick:function(e){console.log("saving")}},new SvgIcon("tick"))
    this.deviceDetailsNav = el("div.w-100.h3.sticky.top-0.flex.z-999.bg-inherit.pa2.items-center", el("div", {onclick:function(e){app.update("devices")}},new SvgIcon("leftArrow")), el("div.flex-grow-1.tc.blue" , "Device Details"), this.save)
    this.MACID = el("div.w-100.pa2")
    this.IPADDR = el("div.w-100.pa2")
    this.nameLabel = el("span.pa2", "Name ")
    this.deviceName = el("input.pa2", {oninput:function(e){
      if (deviceInfo.connectState == 0 ) {
        if (this.value.length > 0 ) {
          document.forms["connectionState"]["allow"].checked = true
        }
        else {
          document.forms["connectionState"]["deny"].checked = true
        }
      }
    }}),
    this.connectionStateRadio = el("form.pa2", {name:"connectionState"}, el("input", {type:"radio",name:"connectionState",id:"allow",value:"allow"}),el("label", {for:"allow"}, "Allow"),el("input", {type:"radio",name:"connectionState",id:"deny",value:"deny"}),el("label", {for:"deny"}, "Deny"))
    this.el = el("div.w-100.h-100.tc", this.deviceDetailsNav, this.MACID, this.IPADDR, this.nameLabel, this.deviceName, this.connectionStateRadio, this.cancel)
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
*/
const settingsMenu = new SettingsMenu()
const Dashboard = new DashboardPage()
const Devices = new DevicesPage()
//const deviceInfo = new DeviceInfo()
const app = router('.app.h-100', {
  devices: Devices,
  settings: settingsMenu,
  dashboard: Dashboard,
  //details: deviceInfo
})
const mainNode = el("div.w-100.h-100.flex.justify-center", {id:"mainnode"},el("div.w-100.h-100.mw8-l", app))

function main() {
  model.state.theme == 0 ? document.body.classList.add("bg-white"):document.body.classList.add("bg-black")
  mount(document.body, mainNode)
  app.update('dashboard')
  Devices.update()
}



window.addEventListener('load', function(){setTimeout(main,0)}, false)