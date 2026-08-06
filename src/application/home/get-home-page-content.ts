import { homePageContent } from "@/src/domain/home/content";
import type { HomePageContent } from "@/src/domain/home/models";

export function getHomePageContent(): HomePageContent {
  return homePageContent;
}
