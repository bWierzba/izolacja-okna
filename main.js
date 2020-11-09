const resultH = document.querySelector('.result')
const btn = document.querySelector('.count')
const clearBtn = document.querySelector('.clear')
const clearLastRecord = document.querySelector('.clear-last-record')
const mainTable = document.querySelector('tbody')

let ooValue
let opValue
let vValue
let sValue
let lzewdValue
let lzewnValue
let lwewValue
let soValue
let woValue
let poValue
let lsoValue
let ra2sValue


btn.addEventListener('click', clicked)
clearBtn.addEventListener('click', clear)
clearLastRecord.addEventListener('click', deleteLastRecord)

function changeComma(v) {
  for (i = 0; i < v.length; i++) {
    if (v[i] == ',') {
      v = v.substring(0, i) + '.' + v.substring(i + 1)
    }
  }
  return v
}

function deleteLastRecord() {
  if (mainTable.childNodes.length !== 2) {
    let lastRow = document.querySelector('tbody > *:last-child')
    lastRow.remove()
  }
}

function getData() {
  ooValue = document.getElementById('oo').value
  opValue = document.getElementById('op').value
  hValue = Number(changeComma(document.getElementById('h').value))
  abValue = Number(changeComma(document.getElementById('ab').value))
  vValue = hValue * abValue
  sValue = Number(changeComma(document.getElementById('s').value))
  lzewdValue = Number(changeComma(document.getElementById('lzewd').value))
  lzewnValue = Number(changeComma(document.getElementById('lzewn').value))
  lwewValue = changeComma(document.getElementById('lwew').value)
  if (lwewValue == 'kd') {
    lwewValue = 40
  }
  else {
    lwewValue = 0
  }
  soValue = Number(changeComma(document.getElementById('so').value))
  woValue = Number(changeComma(document.getElementById('wo').value))
  poValue = soValue * woValue
  lsoValue = Number(changeComma(document.getElementById('lso').value))
  ra2sValue = Number(changeComma(document.getElementById('ra2s').value))
}

function calculate(oo, op, v, s, lzewd, lzewn, lwew, so, wo, po, lso, ra2s) {
  let result = 0
  let t = 0

  if (v < 45) {
    t = 0.5
  }
  else if (v >= 45 && v < 85) {
    t = 0.6
  }
  else if (v >= 85 && v < 125) {
    t = 0.8
  }
  else if (v >= 125 && v < 165) {
    t = 1
  }
  else if (v >= 165 && v < 225) {
    t = 1.2
  }
  else if (v >= 225) {
    t = 1.5
  }
  let a = 0.16 * v / t
  let rWall = 0

  if (lwew == 40) {
    rWall = lzewd - lwew + 3 + (Math.log10(s / a) * 10)
    if (rWall < 30) {
      rWall = 30
    }
  }
  else {
    let rWallD = lzewd - 35 + 3 + (Math.log10(s / a) * 10)
    let rWallN = lzewn - 25 + 3 + (Math.log10(s / a) * 10)

    if (rWallD > rWallN) {
      rWall = rWallD
    }
    else {
      rWall = rWallN
    }

    if (rWall < 30) {
      rWall = 30
    }
  }
  if (lso == 2) {
    rWall = rWall + 3
  }
  else if (lso == 3) {
    rWall = rWall + 5
  }

  rWall = rWall.toFixed()


  let x = (po / s) * 100
  let xToShow = x.toFixed()



  if (x <= 25) {
    x = 25
  }
  else if (x > 25 && x <= 50) {
    x = 50
  }
  else if (x > 50 && x <= 75) {
    x = 75
  }
  else if (x > 75 && x <= 100) {
    x = 100
  }


  if ((ra2s - rWall) >= 0 && (ra2s - rWall) < 5) {
    result = rWall
  }
  else if ((ra2s - rWall) >= 5 && (ra2s - rWall) < 10) {
    if (x == 25) {
      result = rWall - 5
    }
    else if (x == 50) {
      result = rWall - 2
    }
    else if (x == 75) {
      result = rWall - 1
    }
    else {
      result = rWall
    }
  }
  else if ((ra2s - rWall) >= 10) {
    if (x == 25) {
      result = rWall - 6
    }
    else if (x == 50) {
      result = rWall - 3
    }
    else if (x == 75) {
      result = rWall - 1
    }
    else {
      result = rWall
    }
  }

  result = result + 2

  resultObject = { oo: oo, op: op, so: so, wo: wo, po: po, ps: s, ppo: xToShow, objp: v, cp: t, wrs: rWall, rcp: ra2s, ro: result }

  return resultObject

}


function showResult(result) {
  let row = document.createElement('tr')
  row.classList.add('row')

  let oo = document.createElement('td')
  oo.classList.add('element')
  oo.textContent = result.oo
  row.appendChild(oo)

  let op = document.createElement('td')
  op.classList.add('element')
  op.textContent = result.op
  row.appendChild(op)

  let so = document.createElement('td')
  so.classList.add('element')
  so.textContent = result.so
  row.appendChild(so)

  let wo = document.createElement('td')
  wo.classList.add('element')
  wo.textContent = result.wo
  row.appendChild(wo)

  let po = document.createElement('td')
  po.classList.add('element')
  po.textContent = result.po
  row.appendChild(po)

  let ps = document.createElement('td')
  ps.classList.add('element')
  ps.textContent = result.ps
  row.appendChild(ps)

  let ppo = document.createElement('td')
  ppo.classList.add('element')
  ppo.textContent = result.ppo
  row.appendChild(ppo)

  let objp = document.createElement('td')
  objp.classList.add('element')
  objp.textContent = result.objp
  row.appendChild(objp)

  let cp = document.createElement('td')
  cp.classList.add('element')
  cp.textContent = result.cp
  row.appendChild(cp)

  let wrs = document.createElement('td')
  wrs.classList.add('element')
  wrs.textContent = result.wrs
  row.appendChild(wrs)

  let rcp = document.createElement('td')
  rcp.classList.add('element')
  rcp.textContent = result.rcp
  row.appendChild(rcp)

  let ro = document.createElement('td')
  ro.classList.add('element')
  ro.textContent = result.ro
  row.appendChild(ro)

  mainTable.appendChild(row)

}

function clear() {
  document.getElementById('oo').value = ''
  document.getElementById('op').value = ''
  document.getElementById('v').value = ''
  document.getElementById('s').value = ''
  document.getElementById('lzewd').value = ''
  document.getElementById('lzewn').value = ''
  document.getElementById('lwew').value = ''
  document.getElementById('so').value = ''
  document.getElementById('wo').value = ''
  document.getElementById('lso').value = ''
  document.getElementById('ra2s').value = ''
}

function clicked() {
  getData()
  if (poValue > sValue) return alert('powierzchnia okna nie może być większa niż powierzchnia ściany')
  let result = calculate(ooValue, opValue, vValue, sValue, lzewdValue, lzewnValue, lwewValue, soValue, woValue, poValue, lsoValue, ra2sValue)
  showResult(result)
}





