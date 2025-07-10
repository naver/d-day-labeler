/**
 * d-day-labeler
 * Copyright (c) 2023-present NAVER Corp.
 * Apache-2.0
 */

/* eslint-disable no-var */
import type {getOctokit} from "@actions/github";

declare global {
    var owner: string;
    var repo: string;
    var octokit: ReturnType<typeof getOctokit>;
    var skipDraft: boolean;
}

export {};
