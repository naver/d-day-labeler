/**
 * d-day-labeler
 * Copyright (c) 2023-present NAVER Corp.
 * Apache-2.0
 */

import * as core from "@actions/core";
import * as github from "@actions/github";

export const initialize = (): void => {
    global.owner = github.context.repo.owner;
    global.repo = github.context.repo.repo;

    const token = core.getInput("token", {required: true});
    const octokit = github.getOctokit(token);

    global.octokit = octokit;
};
