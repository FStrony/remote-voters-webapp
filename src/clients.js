import axios from 'axios'

const remoteVotersApiClient = axios.create({
    baseURL: process.env.REAC_APP_REMOTE_VOTERS_API_ENDPOINT || 'http://localhost:5000',
    responseType: 'json'
})

export default {
    remoteVotersApi: {
        client: remoteVotersApiClient,
        endpoints: {
            campaign: {
                getByCode: '/Campaign/getCampaign/'
            }
        }
    }
}