const resultH = document.querySelector('.result')
const btn = document.querySelector('.count')

let vValue
let sValue
let lzewdValue
let lzewnValue
let lwewValue
let poValue
let lsoValue
let ra2sValue

btn.addEventListener('click', clicked)

function getData() {
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
  poValue = Number(document.getElementById('po').value)
  lsoValue = Number(document.getElementById('lso').value)
  ra2sValue = Number(document.getElementById('ra2s').value)
}

function calculate(v, s, lzewd, lzewn, lwew, po, lso, ra2s) {
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
  console.log(t)
  let a = 0.16 * v / t
  console.log(a)
  let rWall = 0

  if (lwew == 40) {
    rWall = lzewd - lwew + 3 - (Math.log(s / a) * 10)
    if (rWall < 30) {
      rWall = 30
    }
  }
  else {
    let rWallD = lzewd - 35 + 3 - (Math.log(s / a) * 10)
    let rWallN = lzewn - 25 + 3 - (Math.log(s / a) * 10)

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
  console.log(rWall)
  if (lso == 2) {
    rWall = rWall + 2
  }
  else if (lso == 3) {
    rWall = rWall + 5
  }

  let x = po / s
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
  console.log(rWall)
  console.log(result);
  return result.toFixed()
}


function showResult(result) {
  resultH.textContent = result
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
  let result = calculate(vValue, sValue, lzewdValue, lzewnValue, lwewValue, poValue, lsoValue, ra2sValue)
  showResult(result)
  // clear()
}



