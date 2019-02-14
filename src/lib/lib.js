import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
const key = 'yimou6'
import { remote } from 'electron'
// 配置文件路径
const uri = path.join(remote.app.getPath('userData'), '/config.conf')
/**
 * 读取配置文件
 */
export async function readConfig() {
  try {
    let file = await fs.readFileSync(uri)
    return {
      success: true,
      file: file.toString()
    }
  } catch (e) {
    // 文件读取错误，配置文件不存在
    return {
      success: false
    }
  }
}

/**
 * 写入配置文件
 */
export async function writeConfig(data) {
  let template = `{
    "user": "${data.name}",
    "pwd": "${data.password}"
  }`
  try {
    // console.log(uri)
    let doc = await fs.writeFileSync(uri, template)
    if (doc) {
      return {
        success: false,
        message: doc
      }
    } else {
      return {
        success: true
      }
    }
  } catch (e) {
    return {
      success: false,
      message: e
    }
  }
}


//加密
export function encrypt(plainText) {
  let mykey = crypto.createCipher('aes-128-cbc', key)
  let mystr = mykey.update(plainText, 'utf8', 'hex')
  try {
    mystr += mykey.final('hex');
  } catch (e) {
    mystr = null
  }
  return mystr
}

export function decrypt(cipherText) {
  var mykey = crypto.createDecipher('aes-128-cbc', key)
  var mystr = mykey.update(cipherText, 'hex', 'utf8')
  mystr += mykey.final('utf8')
  return mystr
}
