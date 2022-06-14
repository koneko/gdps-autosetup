const fs = require("fs")
const p = require("path")

const extraRaw = fs.readFileSync(p.join(__dirname, "./extra.txt"), "utf8")
const endpointsRaw = fs.readFileSync(p.join(__dirname, "./endpoints.txt"), "utf8")
const base64 = (text) => { return Buffer.from(text).toString("base64") }
let path, base;

let endpoints = []

const extra = () => {
    let extra = extraRaw.split(":|:")
    path = extra[0]
    base = extra[1]
}

const getEndpoints = () => {
    let ep = endpointsRaw.split(";")
    ep.forEach(e => {
        let split = e.split(",")
        let find = split[0].replace("\r", "").replace("\n", "")
        let replace = split[1].replace("\r", "").replace("\n", "")
        let encode = split[2]
        let object = {
            findText: find,
            replaceText: replace,
            encode: encode
        }
        endpoints.push(object)
    })
}


const encodeEndpoints = () => {
    for (let i = 0; i < endpoints.length; i++) {
        let element = endpoints[i]
        let find = element.findText
        let replace = element.replaceText
        let encode = element.encode
        if (encode !== "true") return
        let sfind = base64(find)
        let sreplace = base64(replace)
        let object = {
            findText: sfind,
            replaceText: sreplace,
            encode: encode
        }
        endpoints[i] = object
        console.log(`Encoded ${find} to ${sfind}`)
    }
}

const pushSpecialEndpoints = () => {
    let obj = {
        findText: "aHR0cDovL3d3dy5ib29tbGluZ3MuY29tL2RhdGFiYXNlL3",
        replaceText: base64(base),
        encode: false
    }
    endpoints.push(obj)
}


const main = () => {
    extra()
    getEndpoints()
    encodeEndpoints()
    pushSpecialEndpoints()
    for (let i = 0; i < endpoints.length; i++) {
        const buffer = fs.readFileSync(path)
        let element = endpoints[i]
        const index = buffer.indexOf(element.findText);
        console.log(`Found ${element.findText} at index ${index}`)
        buffer.write(element.replaceText, index)
        fs.writeFileSync(path, buffer);
    }
    console.log("Finished writing endpoints to file.")
}

main()