import axios from 'axios'
import { css, keyframes } from 'styled-components'

function getHoliday(h) {
  let g = [
    { date: '1/1', startY: 1949, endY: 9999 },
    { date: '1/15', startY: 1949, endY: 1999 },
    { date: '1/' + happyMonday(h, 1, 2), startY: 2000, endY: 9999 },
    { date: '2/11', startY: 1967, endY: 9999 },
    { date: '3/' + shunbun(h), startY: 1949, endY: 9999 },
    { date: '4/29', startY: 1949, endY: 1988 },
    { date: '4/29', startY: 1989, endY: 2006 },
    { date: '4/29', startY: 2007, endY: 9999 },
    { date: '5/3', startY: 1949, endY: 9999 },
    { date: '5/4', startY: 2007, endY: 9999 },
    { date: '5/5', startY: 1949, endY: 9999 },
    { date: '7/20', startY: 1996, endY: 2002 },
    { date: '7/' + happyMonday(h, 7, 3), startY: 2003, endY: 9999 },
    { date: '8/11', startY: 2016, endY: 9999 },
    { date: '9/15', startY: 1966, endY: 2002 },
    { date: '9/' + happyMonday(h, 9, 3), startY: 2003, endY: 9999 },
    { date: '9/' + shubun(h), startY: 1948, endY: 9999 },
    { date: '10/10', startY: 1966, endY: 1999 },
    { date: '10/' + happyMonday(h, 10, 2), startY: 2000, endY: 9999 },
    { date: '11/3', startY: 1948, endY: 9999 },
    { date: '11/23', startY: 1948, endY: 9999 },
    { date: '12/23', startY: 1989, endY: 9999 },
  ]
  let b = []
  let f = 0
  for (let d = 0; d < g.length; d++) {
    if (h >= g[d]['startY'] && h <= g[d]['endY']) {
      let a = g[d]['date'].split('/')
      b[f] = { month: a[0], day: a[1] }
      f++
      let e = substituteDay(h, parseFloat(a[0]), parseFloat(a[1]), g)
      if (e) {
        let c = e.split('/')
        b[f] = { month: c[0], day: c[1] }
        f++
      }
      let j = nationalHoliday(h, parseFloat(a[0]), parseFloat(a[1]), g)
      if (j) {
        let c = j.split('/')
        b[f] = { month: c[0], day: c[1] }
        f++
      }
    }
  }
  return b
}
function shunbun(a) {
  if (a < 1900 || a > 2099) {
    return
  }
  switch (a % 4) {
    case 0:
      if (a <= 1956) {
        return 21
      }
      if (a <= 2088) {
        return 20
      }
      return 19
    case 1:
      if (a <= 1989) {
        return 21
      }
      return 20
    case 2:
      if (a <= 2022) {
        return 21
      }
      return 20
    case 3:
      if (a <= 1923) {
        return 22
      }
      if (a <= 2055) {
        return 21
      }
      return 20
  }
  // return day
}
function shubun(a) {
  if (a < 1900 || a > 2099) {
    return
  }
  switch (a % 4) {
    case 0:
      if (a <= 2008) {
        return 23
      }
      return 22
    case 1:
      if (a <= 1917) {
        return 24
      }
      if (a <= 2041) {
        return 23
      }
      return 22
    case 2:
      if (a <= 1946) {
        return 24
      }
      if (a <= 2074) {
        return 23
      }
      return 22
    case 3:
      if (a <= 1979) {
        return 24
      }
      return 23
  }
}
function happyMonday(d, e, c) {
  let a = new Date(d, e - 1, 1).getDay()
  let b
  if (a <= 1) {
    b = 2 - a
  } else {
    b = 9 - a
  }
  return b + 7 * (c - 1)
}
function substituteDay(f, h, c, g) {
  if (f >= 1973) {
    let d = new Date(f, h - 1, c)
    let b = d.getDay()
    if (b === 0) {
      let a = false
      while (!a) {
        a = true
        d.setDate(d.getDate() + 1)
        for (let e = 0; e < g.length; e++) {
          if (
            d.getFullYear() >= g[e]['startY'] &&
            d.getFullYear() <= g[e]['endY'] &&
            d.getMonth() + 1 + '/' + d.getDate() === g[e]['date']
          ) {
            a = false
          }
        }
      }
      return d.getMonth() + 1 + '/' + d.getDate()
    }
  }
  return false
}
function nationalHoliday(e, g, b, f) {
  if (e >= 1988) {
    let c = new Date(e, g - 1, b)
    c.setDate(c.getDate() + 2)
    let a = false
    for (let d = 0; d < f.length; d++) {
      if (
        c.getFullYear() >= f[d]['startY'] &&
        c.getFullYear() <= f[d]['endY'] &&
        c.getMonth() + 1 + '/' + c.getDate() === f[d]['date']
      ) {
        a = true
      }
    }
    if (a) {
      c.setDate(c.getDate() - 1)
      a = false
      for (let d = 0; d < f.length; d++) {
        if (
          c.getFullYear() >= f[d]['startY'] &&
          c.getFullYear() <= f[d]['endY'] &&
          c.getMonth() + 1 + '/' + c.getDate() === f[d]['date']
        ) {
          a = true
        }
      }
      if (!a) {
        return c.getMonth() + 1 + '/' + c.getDate()
      }
    }
  }
  return false
}

const sendGet = (url, headers) => {
  return axios
    .get(url, {
      headers: {
        Accept: 'application/json',
        ...headers,
      },
    })
    .then(response => response.data)
}

const sendPost = (url, data, headers) => {
  return axios
    .post(url, data, {
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        // 'X-CSRF-Token': document.getElementsByName('csrf-token').item(0).content,
        ...headers,
      },
    })
    .then(response => {
      return {
        status: response.status,
        ...response.data,
      }
    })
    .catch(error => {
      return {
        status: error.response.status,
        ...error.response.data,
      }
    })
}

const sendPatch = (url, data, headers) => {
  return axios
    .patch(url, data, {
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        // 'X-CSRF-Token': document.getElementsByName('csrf-token').item(0).content,
        ...headers,
      },
    })
    .then(response => {
      return {
        status: response.status,
        ...response.data,
      }
    })
    .catch(error => {
      return {
        status: error.response.status,
        ...error.response.data,
      }
    })
}

const sendDelete = (url, headers) => {
  return axios
    .delete(url, {
      headers: {
        Accept: 'application/json',
        ...headers,
      },
    })
    .then(response => {
      return {
        status: response.status,
        ...response.data,
      }
    })
    .catch(error => {
      return {
        status: error.response.status,
        ...error.response.data,
      }
    })
}

const media = {
  pc: (...args: any[]) => css`
    @media (min-width: 768px) {
      ${css.call(this, ...args)};
    }
  `,
  sp: (...args: any[]) => css`
    @media (max-width: 767px) {
      ${css.call(this, ...args)};
    }
  `,
  // tablet: (...args) => css`
  //   @media (min-width: 768px) {
  //     ${ css(...args) }
  //   }
  // `,
}

export { getHoliday, sendGet, sendPost, sendPatch, sendDelete, media }
