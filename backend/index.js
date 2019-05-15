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

const fitbitAuthCallbackUrl = `https://157.230.2.203/callback`

// redirect the user to the Fitbit authorization page
fitbitAuthServer.get("/authorize", async (req, res) => {
    // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
    try{
        
        let url = await client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', fitbitAuthCallbackUrl)
        console.log(url)
        console.log('about to redirect...')
        return res.redirect(url);

    } catch(error){
        console.log(error)
    }
   
});

// handle the callback from the Fitbit authorization flow
fitbitAuthServer.get("/callback", async (req, res) => {
    // exchange the authorization code we just received for an access token

    console.log('in callback route')
    console.log(req.query)
    
    // let accessTokenResult = await client.getAccessToken(req.query.code, fitbitAuthCallbackUrl)
    // let profileDetails = await client.get("/profile.json", accessTokenResult.access_token)

    // let id = profileDetails[0].encodedId
    // let accessToken = accessTokenResult.access_token

    //console.log(`saving access token for id ${id} to dataservice /accounts route`)

    // //post this to dataService
    //  let options = {
    //     uri: 'http://localhost:5000/accounts',
    //     method: 'POST',
    //     body: {
    //         id,
    //         accessToken
    //     },
    //     json: true
    // }
             
    // try{            
    //     accounts = await rp(options)
    // } catch(error){
    //     console.log(error)
    // }



});

// console.log('RIGHT HERE>>>')

// console.log(__dirname)

// // launch the server
// https.createServer({
//     key: fs.readFileSync(__dirname + '/certs/server.key', 'utf8'),
//     cert: fs.readFileSync(__dirname + '/certs/server.cert', 'utf8')
// }, fitbitAuthServer).listen(443);

fitbitAuthServer.listen(443)