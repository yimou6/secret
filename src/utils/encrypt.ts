import { encode, decode } from 'js-base64'

/**
 * todo 加密
 * @param doc
 */
export function encryptDoc(doc: string | object): string {
    if (typeof doc === 'string') {
        return encode(doc)
    }
    return encode(JSON.stringify(doc))
}

/**
 * todo 解密
 * @param doc
 */
export function decryptDoc(doc: string): string {
    return decode(doc)
}

