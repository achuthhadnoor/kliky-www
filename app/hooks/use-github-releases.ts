"use client";

import { useState, useEffect } from "react";

export interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  html_url: string;
  assets: GitHubReleaseAsset[];
}

interface UseGitHubReleasesResult {
  latestVersion: string;
  macUrl: string;
  winUrl: string;
  loading: boolean;
  releases: GitHubRelease[];
}

const CACHE_KEY = "kliky_github_releases_cache";
const CACHE_EXPIRY_KEY = "kliky_github_releases_cache_expiry";
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache time

export function useGitHubReleases(): UseGitHubReleasesResult {
  const [latestVersion, setLatestVersion] = useState("v1.2.0");
  const [macUrl, setMacUrl] = useState(
    "https://github.com/achuthhadnoor/kliky-www/releases",
  );
  const [winUrl, setWinUrl] = useState(
    "https://github.com/achuthhadnoor/kliky-www/releases",
  );
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReleases() {
      // 1. Check local cache first to protect against GitHub API rate-limiting
      if (typeof window !== "undefined") {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

        if (cachedData && cachedExpiry && Date.now() < parseInt(cachedExpiry)) {
          try {
            const parsed = JSON.parse(cachedData) as GitHubRelease[];
            processReleases(parsed);
            setLoading(false);
            return;
          } catch {
            // cache corrupt, proceed to live fetch
          }
        }
      }

      try {
        const response = await fetch(
          "https://api.github.com/repos/achuthhadnoor/kliky-www/releases",
        );
        if (!response.ok) {
          console.warn(
            `GitHub API issue (Status: ${response.status}). Using fallback download links.`,
          );
          setLoading(false);
          return;
        }

        const data = (await response.json()) as GitHubRelease[];

        // Store in local storage cache
        if (typeof window !== "undefined" && data && data.length > 0) {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
          localStorage.setItem(
            CACHE_EXPIRY_KEY,
            (Date.now() + CACHE_DURATION).toString(),
          );
        }

        processReleases(data);
      } catch (error) {
        console.error("Error fetching GitHub releases:", error);
        // Fallback states remain set as initial states
      } finally {
        setLoading(false);
      }
    }

    function processReleases(data: GitHubRelease[]) {
      if (!Array.isArray(data) || data.length === 0) return;

      setReleases(data);

      // Find the latest release (first entry in list)
      const latest = data[0];
      setLatestVersion(latest.tag_name);

      // Default download links fall back to releases html page
      let macDownload = latest.html_url;
      let winDownload = latest.html_url;

      // Scan release assets to bind direct binary URLs
      if (latest.assets && Array.isArray(latest.assets)) {
        latest.assets.forEach((asset) => {
          const name = asset.name.toLowerCase();
          // macOS binary extensions matches
          if (
            name.endsWith(".dmg") ||
            name.endsWith(".pkg") ||
            (name.includes("mac") && name.endsWith(".zip")) ||
            (name.includes("darwin") && name.endsWith(".zip"))
          ) {
            macDownload = asset.browser_download_url;
          }
          // Windows binary extensions matches
          if (
            name.endsWith(".msi") ||
            name.endsWith(".exe") ||
            (name.includes("win") && name.endsWith(".zip")) ||
            (name.includes("pc") && name.endsWith(".zip"))
          ) {
            winDownload = asset.browser_download_url;
          }
        });
      }

      setMacUrl(macDownload);
      setWinUrl(winDownload);
    }

    fetchReleases();
  }, []);

  return { latestVersion, macUrl, winUrl, loading, releases };
}
