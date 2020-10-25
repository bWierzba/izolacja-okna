const resultH = document.querySelector('.result')
const btn = document.querySelector('.count')

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

let table = []

btn.addEventListener('click', clicked)

function getData() {
  ooValue = document.getElementById('oo').value
  opValue = document.getElementById('op').value
  vValue = Number(document.getElementById('v').value)
  sValue = Number(document.getElementById('s').value)
  lzewdValue = Number(document.getElementById('lzewd').value)
  lzewnValue = Number(document.getElementById('lzewn').value)
  lwewValue = document.getElementById('lwew').value
  if (lwewValue == 'kd') {
    lwewValue = 40
  }
  else {
    lwewValue = 0
  }
  soValue = Number(document.getElementById('so').value)
  woValue = Number(document.getElementById('wo').value)
  poValue = soValue * woValue
  lsoValue = Number(document.getElementById('lso').value)
  ra2sValue = Number(document.getElementById('ra2s').value)
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

  console.log(po)
  console.log(s)

  let x = (po / s) * 100
  let xToShow = x.toFixed()

  console.log(x)

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

  // return result + 2
}


function showResult(result) {
  const mainTable = document.querySelector('.table')
  let row = document.createElement('div')
  row.classList.add('row')

  let oo = document.createElement('div')
  oo.classList.add('element')
  oo.textContent = result.oo
  row.appendChild(oo)

  let op = document.createElement('div')
  op.classList.add('element')
  op.textContent = result.op
  row.appendChild(op)

  let so = document.createElement('div')
  so.classList.add('element')
  so.textContent = result.so
  row.appendChild(so)

  let wo = document.createElement('div')
  wo.classList.add('element')
  wo.textContent = result.wo
  row.appendChild(wo)

  let po = document.createElement('div')
  po.classList.add('element')
  po.textContent = result.po
  row.appendChild(po)

  let ps = document.createElement('div')
  ps.classList.add('element')
  ps.textContent = result.ps
  row.appendChild(ps)

  let ppo = document.createElement('div')
  ppo.classList.add('element')
  ppo.textContent = result.ppo
  row.appendChild(ppo)

  let objp = document.createElement('div')
  objp.classList.add('element')
  objp.textContent = result.objp
  row.appendChild(objp)

  let cp = document.createElement('div')
  cp.classList.add('element')
  cp.textContent = result.cp
  row.appendChild(cp)

  let wrs = document.createElement('div')
  wrs.classList.add('element')
  wrs.textContent = result.wrs
  row.appendChild(wrs)

  let rcp = document.createElement('div')
  rcp.classList.add('element')
  rcp.textContent = result.rcp
  row.appendChild(rcp)

  let ro = document.createElement('div')
  ro.classList.add('element')
  ro.textContent = result.ro
  row.appendChild(ro)

  mainTable.appendChild(row)

}

function clear() {
  document.getElementById('v').value = ''
  document.getElementById('s').value = ''
  document.getElementById('lzewd').value = ''
  document.getElementById('lzewn').value = ''
  document.getElementById('lwew').value = ''
  document.getElementById('po').value = ''
  document.getElementById('lso').value = ''
  document.getElementById('ra2s').value = ''
}

function clicked() {
  getData()
  if (poValue > sValue) return alert('powierzchnia okna nie może być większa niż powierzchnia ściany')
  let result = calculate(ooValue, opValue, vValue, sValue, lzewdValue, lzewnValue, lwewValue, soValue, woValue, poValue, lsoValue, ra2sValue)
  showResult(result)
  // clear()
}



