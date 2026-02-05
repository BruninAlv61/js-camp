import { getJobs } from "../services/jobs.js";
import { useState, useEffect } from "react";

export const useJobs = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobs = await getJobs();
                setJobs(jobs);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return { jobs, loading, error }
};
