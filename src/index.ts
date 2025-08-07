/**
 * d-day-labeler
 * Copyright (c) 2023-present NAVER Corp.
 * Apache-2.0
 */

import * as core from "@actions/core";
import {addLabels, getPRList, removeLabel} from "./api";
import {initialize} from "./initialize";
import type {TPRListData} from "./types";

const D_N_PATTERN = /^D-(\d+)$/;

const getNextLabel = (name: string): `D-${number | string}` => {
    const [, day] = name.match(D_N_PATTERN);
    const currentDDay = parseInt(day);
    const nextDDay = currentDDay <= 0 ? 0 : currentDDay - 1;

    return `D-${nextDDay}`;
};

interface ILabelChange {
    number: number;
    current: string;
    next: string;
}

const updateLabel = async ({number, current, next}: ILabelChange): Promise<boolean> => {
    if (current === next) {
        return false;
    }

    return Promise.all([removeLabel(number, current), addLabels(number, [next])]).then(
        () => {
            core.info(`Successfully updated label for PR #${number} from "${current}" to "${next}"`);

            return true;
        },
        error => {
            core.warning(`Failed to update label for PR #${number}: ${error.message}`);

            throw error;
        },
    );
};

const updateLabels = async (changes: ILabelChange[]): Promise<boolean[]> => {
    return Promise.all(changes.map(updateLabel));
};

const extractLabelChanges = (prList: TPRListData): ILabelChange[] => {
    return prList
        .filter(pr => {
            // Skip draft PRs if the skipDraft option is enabled
            if (global.skipDraft && pr.draft) {
                core.info(`Skipping draft PR #${pr.number}`);
                return false;
            }
            return true;
        })
        .map(({number, labels}) => ({
            number,
            dLabel: labels.find(({name}) => D_N_PATTERN.test(name))?.name,
        }))
        .filter(({dLabel}) => !!dLabel)
        .map(({number, dLabel}) => ({number, current: dLabel, next: getNextLabel(dLabel)}));
};

const run = async (): Promise<void> => {
    try {
        initialize();

        const updated = await getPRList().then(extractLabelChanges).then(updateLabels);

        core.info(`Successfully updated labels for all ${updated.filter(Boolean).length} PRs.`);
    } catch (error) {
        core.setFailed((error as Error).message);
    }
};

run();
