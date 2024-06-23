import React from "react";
import { useLoaderData } from "react-router-dom";
import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const response = await customFetch("/jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};
const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats}></StatsContainer>
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
