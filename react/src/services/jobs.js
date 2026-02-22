export async function getJobs() {
    const response = await fetch('https://jscamp-api.vercel.app/api/jobs')
    const data = await response.json()
    return data
}