const { el, svg, router, mount, list, text } = redom
const QS = function() {var m={};(window.location.search || '?').substr(1).replace(/([^&=]+)=?([^&]*)(?:&+|$)/g, function(match, k, v) {m[k] = v;});return m}()

class TPageNav {
	constructor(owner, tag='div', showNavButtons=true, filterOption) {
		this.text = text()
		this.prev = el('button',{onclick:function(evt){owner.onPageClick(-1)}},'<')
		this.next = el('button',{onclick:function(evt){owner.onPageClick(1)}},'>')
		this.filter = el('input.ml1',{type:'text',autofocus:true,placeholder:'filter by',onkeypress:function(evt){owner.onFilterKey(evt.key, evt.keyCode, this.value)}})
		if ((showNavButtons) && filterOption) {
			this.el = el(tag, [this.filter, this.prev, this.next, this.text])
		} else if(!(showNavButtons) && filterOption) {
			this.el = el(tag, [this.text, this.filter])
		}
		else {
			this.el = el(tag, [this.prev, this.next, this.text])
		}
		this.el._owner = owner
	}
	update(txt) {
		this.text.textContent = txt
	}
	setFilter(txt) {
		this.filter.value = txt
	}
}

class Tc {
	constructor(initData = [false, none], item, i, data) {
		let tag = initData[0] ? 'th' : 'td'
		this.el = el(tag, {onclick: this.onclick})
		this.el._isHead = initData[0]
		this.el._owner = initData[1]
		this.el._xindex = initData[2]
		this.el._index = i
		this.el._formatfn = initData[1].data.formatfns[i]
		this.el.className = initData[1].data.cssclasses[i]
  }
	onclick(evt) {
		this._owner.onCellClick(this._isHead, this._index, this._data)
	}
	update(data, index, items, context) {
		this.el._data = data
		if (this.el._isHead) {
			let tbl = this.el._owner
			if ((index + 1) == Math.abs(tbl.sortIndex)) {
				if (tbl.sortIndex > 0) {
					this.el.textContent = data + '▲'
				} else {
					this.el.textContent = '▼' + data
				}
			} else {
				this.el.textContent = data
			}
		} else {
			this.el.textContent = this.el._formatfn ? this.el._formatfn(data) : data
		}
	}
}

class Tr {
	constructor(initData,item,i,data) {
		this.el = list('tr', Tc, null, [initData[0],initData[1],i])
	}
	update(data, index, items, context) {
		this.el.update(data, context)
	}
}

class Table {
	constructor(pageLength=100, filterOption, datafn, onDataChangefn) {
		this.datafn =datafn
		this.filterOption = filterOption
		this.onDataChangefn = onDataChangefn
		this.data = {fields:[],data:[],formatfns:[]}
		this.pageLength = pageLength
		this.subset = []
		this.filterIndex = 0
		this.filterText = ''
		this.pageStart = 0
		this.pageEnd = 0
		this.sortIndex = -1
		this.sortColumn = 3
		this.groupbyIndex = 3
		this.caption = new TPageNav(this, 'caption', (pageLength>0), filterOption)
		this.thead = list('tr', Tc, null, [true, this, 0])
		this.tbody = list('tbody', Tr, null, [false, this])
		this.el = el('table', [this.caption, el('thead',this.thead), this.tbody])
	}
  update() {
		this.data = this.datafn()
		this.subset = this.data.data
		this.pageStart = 0
		if (0 == this.pageLength) {
			this.pageEnd = this.subset.length
		} else {
			this.pageEnd = (this.subset.length < this.pageLength) ? this.subset.length : this.pageLength
		}
		var tempIndex = this.filterIndex
		var tempText = this.filterText
		this.filterText = ''
		this.filterIndex = null
		this.filter(tempText, tempIndex) 
		}
	filter(filterText, filterIndex) {
    if ((filterText != this.filterText) || 
        (filterIndex != this.filterIndex)) {
      if (0 == filterText.length) {
        this.subset = this.data.data
      } else {
        if ('number' == typeof(filterIndex)) {
        let typ = typeof(filterText)
          this.subset = this.data.data.filter(function(x) {
            if ('number' == typ) {
              return (x[filterIndex] == filterText)
            } else {
              return x[filterIndex].toString().includes(filterText)
            }
          })
        } else {
          this.subset = this.data.data.filter(function(x) { 
            let found=false
          	for (let i=0; ((!found) && (i<x.length)); i++) {
              found = x[i].toString().includes(filterText)
            }
            return found
          })
        }
      }
      this.filterIndex = filterIndex
      this.filterText = filterText
      this.sort()
			}
	}
	sort(columnIndex) {
		/*
			columnIndex is 0-start and sortIndex is 1-start to use negative for reverse
			if not columnIndex - sort on existing order
		 */
		if ('number' == typeof(columnIndex)) {
			this.sortColumn = columnIndex
			if (Math.abs(this.sortIndex) == (columnIndex + 1)) {
				this.subset.reverse()
				this.sortIndex = -this.sortIndex
			} else {
				function numCompare(a,b) {return a[columnIndex] - b[columnIndex]}
				function strCompare(a,b) {
					if (a[columnIndex] < b[columnIndex]) return -1
					if (a[columnIndex] > b[columnIndex]) return 1
				}
				if ('string' == typeof(this.subset[0][columnIndex])) {
					this.subset.sort(strCompare)
				} else {
					this.subset.sort(numCompare)
				}
				this.sortIndex = columnIndex+1
			}
		} else {
			let i = Math.abs(this.sortIndex) - 1
			this.subset.sort(function(a,b) {return a[i] - b[i]})
			if (this.sortIndex < 0) {
				this.subset.reverse()
			}
		}
		this.pageStart = 0
		if (0 == this.pageLength) {
			this.pageEnd = this.subset.length
		} else {
			this.pageEnd = (this.subset.length < this.pageLength) ? this.subset.length : this.pageLength
		}
		this.caption.update(' ' + ((this.subset.length>0)?(this.pageStart+1):0) + '-' + this.pageEnd + ' of ' + this.subset.length)
		this.thead.update(this.data.fields)
		if ((this.pageLength > 0) && (this.pageEnd < this.subset.length)) {
			this.tbody.update(this.subset.slice(this.pageStart,this.pageEnd))
		} else {
			this.tbody.update(this.subset)
		}
		if (this.onDataChangefn == undefined) {
			return
		}
		this.onDataChangefn()
	}
	onCellClick(isHead, columnIndex, value) {
		if (isHead) {
			this.sort(columnIndex)
		} else {
			if(!(this.filterOption)) {
				return
			}
			if ((this.filterIndex == columnIndex) &&
					(this.filterText == value)) {
				this.filter('', 0)
				this.caption.setFilter('')
			} else {
				this.filter(value, columnIndex)
				this.caption.setFilter(this.data.fields[columnIndex]+':'+value)
			}
		}
	}
	onPageClick(pageOffset=1) {
		if ((0 == this.pageLength) || (this.subset.length < this.pageLength)) {return}
		if (pageOffset > 0) {
			if (this.pageEnd < this.subset.length) {
				this.pageStart += this.pageLength
				this.pageEnd += this.pageLength
				if (this.pageEnd > this.subset.length) {
					this.pageEnd = this.subset.length
				}
			}
		} else {
			if (this.pageStart > 1) {
				this.pageStart -= this.pageLength
				this.pageEnd = this.pageStart+this.pageLength
			}
		}
		this.caption.update(' ' + ((this.subset.length>0)?(this.pageStart+1):0) + '-' + this.pageEnd + ' of ' + this.subset.length)
		if (this.pageLength > 0) {
			this.tbody.update(this.subset.slice(this.pageStart,this.pageEnd))
		} else {
			this.tbody.update(this.subset)
		}
	}
	onFilterKey(key, keyCode, value) {
		if (13 == keyCode) {
			let match = /([^:]+):(.+)/.exec(value)
			if (match) {
				let i = parseInt(match[1])
				if (!i) {
					i = this.data.fields.indexOf(match[1])
				} else {
					i -= 1 //zero-based-array
					if ((i < 0) || (i >= this.data.fields.length)) {
						i = -1
					}
				}
				if (-1 == i) {
					this.filter(value)
				} else {
					this.filter(match[2], i)
				}
			} else {
				this.filter(value)
			}
		}
	}
}

function getDetailsTableData() {
	val =  {
    fields: ['timeStamp', 'Proto', "Duration",'srcIP', 'srcPort', 'dstIP', 'dstPort', 'srcPkts', 'dstPkts', 'srcBytes', 'dstBytes'],
    cssclasses: ['tr','tr','tr','tr','tr','tr','tr','tr','tr','tr','tr','tr','tr','tr', 'tr','tr','tr'],
    formatfns: [Unix_timestamp,protocolFormatting,durationFormatting,null,null,null,null,null,null,byteFormatting,byteFormatting,null,null],
    data: appData.livedata
    }
  return val
}

function OnDataTableUpdate() {
	graphUpdate()
	summaryTable.update()
	return
}

const detailsTable = new Table(parseInt(QS.pageLength || 25), true, getDetailsTableData)
const tableApp = el("div.h-100.pt5.f5.flex.justify-center", detailsTable)

function Unix_timestamp(t) {
	var dt = new Date(t*1000);
	var hr = dt.getHours();
	var m = "0" + dt.getMinutes();
	var s = "0" + dt.getSeconds();
	return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);  
}

function protocolFormatting(d) {
	if (d == 6 ) {
		return "UDP"
	}
	else if( d == 17 ) {
		return "TCP"
	}
	else {
		return d
	}
}

function durationFormatting(d) {
	d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + "h" : ""
    var mDisplay = m >  0 ? m + "m" : ""
    var sDisplay = s >  0 ? s + "s" : "0s"
    return hDisplay + mDisplay + sDisplay; 
}

function byteFormatting(d) {
	if (d >= 1073741824) {
		return ((d/1073741824).toFixed(2) + "GB")
	}
	if (d >= 1048576) {
		return ((d/1048576).toFixed(2) + "MB")
	}
	else {
		return ((d/1024).toFixed(2) + "KB")
	}
}