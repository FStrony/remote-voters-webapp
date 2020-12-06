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
                getByCode: '/Campaigns/getCampaign/{0}',
                getAllByCompanyId: '/Campaigns/{0}',
                activate: '/Campaigns/{0}/activate/{1}',
                deactivate: '/Campaigns/{0}/deactivate/{1}',
                delete: '/Campaigns/{0}/delete-campaign/{1}',
                result: '/Campaigns/{0}/get-campaign-results/{1}'
            },
            company: {
                create: '/Companies'
            },
            vote: {
                register: '/Votes'
            },
            authentication: '/Authentication'
        }
    }
}