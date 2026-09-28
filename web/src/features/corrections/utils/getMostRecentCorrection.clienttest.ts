import { describe, expect, it } from "vitest";

import { type ScoreDomain } from "@langfuse/shared";

import { getMostRecentCorrection } from "./getMostRecentCorrection";

const createCorrection = (id: string, timestamp: Date): ScoreDomain => ({
  id,
  projectId: "project-id",
  environment: "default",
  name: "output",
  value: 0,
  source: "ANNOTATION",
  authorUserId: null,
  comment: null,
  metadata: {},
  configId: null,
  queueId: null,
  executionTraceId: null,
  createdAt: timestamp,
  updatedAt: timestamp,
  timestamp,
  traceId: "trace-id",
  sessionId: null,
  datasetRunId: null,
  observationId: null,
  longStringValue: "",
  stringValue: null,
  dataType: "CORRECTION",
});

describe("getMostRecentCorrection", () => {
  it("returns the most recent correction without changing the original order", () => {
    const oldest = createCorrection("oldest", new Date("2025-01-01"));
    const newest = createCorrection("newest", new Date("2025-01-03"));
    const middle = createCorrection("middle", new Date("2025-01-02"));
    const corrections = [oldest, newest, middle];
    const originalOrder = [...corrections];

    expect(getMostRecentCorrection(corrections)).toBe(newest);
    expect(corrections).toEqual(originalOrder);
  });
});
