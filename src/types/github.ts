/**
 * d-day-labeler
 * Copyright (c) 2023-present NAVER Corp.
 * Apache-2.0
 */

export type TResponseData<TReq extends (...args: any[]) => Promise<{data: any}>> = Awaited<ReturnType<TReq>>["data"];

export type TPRListData = TResponseData<typeof global.octokit.rest.pulls.list>;
export type TRemoveLabelData = TResponseData<typeof global.octokit.rest.issues.removeLabel>;
export type TAddLabelsData = TResponseData<typeof global.octokit.rest.issues.addLabels>;
