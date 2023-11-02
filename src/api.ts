/**
 * d-day-labeler
 * Copyright (c) 2023-present NAVER Corp.
 * Apache-2.0
 */

import type {TAddLabelsData, TPRListData, TRemoveLabelData, TResponseData} from "./types";

const MAX_PER_PAGE = 100;

const fetchAllPages = async <TReq extends (...args: any[]) => Promise<{data: any[]}>>(
    request: TReq,
    params: object,
    maxCount = Number.POSITIVE_INFINITY,
): Promise<TResponseData<TReq>> => {
    let [page, len, count] = [1, 0, 0];
    const result = [];

    do {
        const {data} = await request({...params, per_page: MAX_PER_PAGE, page});

        result.push(...data);

        [page, len, count] = [page + 1, data.length, count + data.length];
    } while (len === MAX_PER_PAGE && count < maxCount);

    return result.slice(0, maxCount);
};

export const getPRList = async (): Promise<TPRListData> => {
    return fetchAllPages(global.octokit.rest.pulls.list, {
        owner: global.owner,
        repo: global.repo,
        state: "open",
    });
};

export const removeLabel = async (number: number, name: string): Promise<TRemoveLabelData> => {
    const {data: labels} = await global.octokit.rest.issues.removeLabel({
        owner: global.owner,
        repo: global.repo,
        issue_number: number,
        name,
    });

    return labels;
};

export const addLabels = async (number: number, names: string[]): Promise<TAddLabelsData> => {
    const {data: labels} = await global.octokit.rest.issues.addLabels({
        owner: global.owner,
        repo: global.repo,
        issue_number: number,
        labels: names,
    });

    return labels;
};
