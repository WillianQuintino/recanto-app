'use client';

import HeroCommunityFeedback from "./components/HeroCommunityFeedback";
import HeroMissionOverview from "./components/HeroMissionOverview";
import HeroRecentEvents from "./components/HeroRecentEvents";

export const MainPage = () => {
  return (<div>
    <HeroMissionOverview />
    <HeroRecentEvents />
    <HeroCommunityFeedback />
  </div>);
};