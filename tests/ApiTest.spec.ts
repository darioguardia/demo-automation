import {test,request,expect} from "@playwright/test" //https://restful-booker.herokuapp.com/apidoc/index.html

let reqContext2: any 

test.beforeAll("Before all tests", async()=>{
    reqContext2 = await request.newContext({
        baseURL:"https://restful-booker.herokuapp.com",
        extraHTTPHeaders:{
            Accept:"application/json"
        }
    })
})

let firstnameJson: any 
let lastnameJson :any
let totalpriceJson:any
let depositpaidJson :any
let checkinJson :any
let checkoutJson :any
let additionalneedsJson:any



//ID

test("GET ",async({request})=>{
    console.log("GET DATA")
    const resp1 = await request.get("/booking/5")
    const jsonResp = await resp1.json();

    console.log(jsonResp);

    firstnameJson = jsonResp.firstname;
    lastnameJson = jsonResp.lastname;
    totalpriceJson = jsonResp.totalprice;
    depositpaidJson = jsonResp.depositpaid;
    checkinJson = jsonResp.bookingdates.checkin;
    checkoutJson = jsonResp.bookingdates.checkout;
    additionalneedsJson = jsonResp.additionalneeds;

})




//assertions

test("GET ASSERTION",async({request})=>{
    const resp2 = await request.get("/booking/5") 
    console.log(await resp2.json())  
    expect(resp2.status()).toBe(200)
    expect(resp2.ok()).toBeTruthy()
    expect(await resp2.json()).toMatchObject({
  firstname: firstnameJson,
  lastname: lastnameJson,
  totalprice: totalpriceJson,
  depositpaid: depositpaidJson,
  bookingdates: { checkin: checkinJson, checkout: checkoutJson }
})
    const jsonresp =await resp2.json()
    expect(jsonresp.firstname).toEqual(firstnameJson)
    console.log("ASSERTION OK")

})

//api vs ui verification 

test("GET API VS UI",async({page,request})=>{
    const resp1 = await request.get("https://api.demoblaze.com/entries")
    const resp2 = await resp1.json() 
    console.log(await resp2.Items[0].title)  
    await page.goto("https://demoblaze.com/")
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toHaveText(resp2.Items[0].title)
    console.log("API VS UI VERIFICATION OK")

   
})




test("POST",async({request})=>{
    const resp1 = await request.post("/booking",{
        data:{ //body
            "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        }
    })
    const jsonResp = await resp1.json()
    console.log(jsonResp)

    //assertions
    expect(resp1.status()).toBe(200)
    expect(resp1.statusText()).toBe("OK")
    expect(resp1.ok()).toBeTruthy()
    expect(jsonResp.booking).toMatchObject({
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
    additionalneeds: 'Breakfast'
  })
   expect(jsonResp.booking.additionalneeds).toEqual("Breakfast")
   console.log("POST ASSERTION OK")
})


test("PUT",async({request})=>{
    const resp1 = await request.put("/booking/2",{
       headers:{
        Authorization:"Basic YWRtaW46cGFzc3dvcmQxMjM="
       },
       data:{
        "firstname" : "Dario",
        "lastname" : "Guardia",
        "totalprice" : 999,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Pancakes"
    }
    })
    const jsonResp = await resp1.json()
    console.log(jsonResp)
    expect(resp1.status()).toBe(200)
    expect(resp1.statusText()).toBe("OK")
    expect(resp1.ok()).toBeTruthy()
    expect(jsonResp).toMatchObject({
    firstname: 'Dario',
    lastname: 'Guardia',
    totalprice: 999,
    depositpaid: true,
    bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
    additionalneeds: 'Pancakes'
    })
    expect(jsonResp.additionalneeds).toEqual("Pancakes")

    const resp2 = await request.get("/booking/2")
    console.log(await resp2.json())
    expect(await resp2.json()).toMatchObject({
    firstname: 'Dario',
    lastname: 'Guardia',
    totalprice: 999,
    depositpaid: true,
    bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
    additionalneeds: 'Pancakes'
    })

    console.log("PUT ASSERTION OK")
})


test("DELETE", async ({ request }) => {
    const resp1 = await request.delete("/booking/4", {
    headers: {
        Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
    }})
    expect(resp1.status()).toBe(201)
    const respText = await resp1.text()
    console.log(respText)
    expect(respText).toEqual("Created")

    const resp2 = await request.get("/booking/3")
    console.log(resp2.status())
    expect(resp2.status()).toBe(404)
    console.log("DELETE ASSERTION OK")
})

test("FETCH", async ({ request }) => {
    const resp1 = await request.get("/booking/3")
    const respHeaders = resp1.headers()
    console.log(respHeaders)
    expect(respHeaders.server).toEqual("Heroku")
    expect(respHeaders["x-powered-by"]).toEqual("Express")
    console.log("***************************************************************************************************************************************************")
    const headersArrayValue = resp1.headersArray()
    console.log(headersArrayValue)
    console.log("***************************************************************************************************************************************************")
    expect(headersArrayValue.length).toBe(10)
    headersArrayValue.forEach((header)=>{
        console.log(header.name + "::" + header.value)
    })
   

})


