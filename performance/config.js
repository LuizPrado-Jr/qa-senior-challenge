export const config = {
    baseUrl: __ENV.API_BASE_URL,
    apiKey: __ENV.REQRES_API_KEY,

    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<1000']
    }
}