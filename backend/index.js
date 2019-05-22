const FitbitApiClient = require("fitbit-node");
const express = require("express");
const rp = require("request-promise")
const https = require('https')
const fs = require('fs')

const fitbitAuthServer = express()

const client = new FitbitApiClient({
    clientId: "22DPF6",
    clientSecret: "5f3538567d187a52768935217b220558",
    apiVersion: '1.2' // 1.2 is the default
});

const fitbitAuthCallbackUrl = `https://157.230.2.203/authorizeCallback`

// redirect the user to the Fitbit authorization page
fitbitAuthServer.get(":id/authorize", async (req, res) => {
    // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
    try{
        let isAccountAuthorized = false
        //get account details from dataService using id
        //if access token and refresh token are available for account then send user to "this device is already authorized" page or modal.

        if(isAccountAuthorized){
            return
        } else {

            let callbackUrl = `https://157.230.2.203/${id}/authorizeCallback`
            let url = await client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', callbackUrl)
            console.log(url)
            console.log('about to redirect...')
            return res.redirect(url);
        }
    } catch(error){
        console.log(error)
    }
   
});

// handle the callback from the Fitbit authorization flow
fitbitAuthServer.get(":id/authorizeCallback", async (req, res) => {
    // exchange the authorization code we just received for an access token

    console.log('in callback route')
    console.log(req.query)
    
    let accessTokenResult = await client.getAccessToken(req.query.code, fitbitAuthCallbackUrl)
    let profileDetails = await client.get("/profile.json", accessTokenResult.access_token)

    console.log(accessTokenResult)
    console.log(profileDetails)

    let fitbitId = profileDetails[0].encodedId
    let accessToken = accessTokenResult.access_token
    let refreshToken = ''

    console.log(`saving access token for id ${id} to dataservice /accounts route`)

    //post this to dataService
     let options = {
        uri: `http://localhost:5000/${id}/account/deviceCredentials`,
        method: 'POST',
        body: {
            id,
            deviceCredentials:{
                fitbitId,
                accessToken,
                refreshToken
            }
        },
        json: true
    }
             
    try{            
        await rp(options)
    } catch(error){
        console.log(error)
    }



});

// console.log('RIGHT HERE>>>')

// console.log(__dirname)

// // launch the server
https.createServer({
    key: fs.readFileSync(__dirname + '/certs/server.key', 'utf8'),
    cert: fs.readFileSync(__dirname + '/certs/server.cert', 'utf8')
}, fitbitAuthServer).listen(443);

fitbitAuthServer.listen(80)