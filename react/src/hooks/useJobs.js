import { useState, useEffect } from "react"

export const useJobs = ({ textToFilter, filters }) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true)
                const params = new URLSearchParams()

                if (textToFilter) params.append('text', textToFilter)
                if (filters.technology) params.append('technology', filters.technology)
                if (filters.location) params.append('type', filters.location)
                if (filters.experienceLevel) params.append('level', filters.experienceLevel)

                const queryParams = params.toString()

                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
                const json = await response.json()

                setJobs(json.data)
                setTotal(json.total)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [textToFilter, filters])

    return { jobs, loading, error, total }
}
