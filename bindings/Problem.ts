// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { Checker } from "./Checker";
import type { ProblemBody } from "./ProblemBody";
import type { ProblemID } from "./ProblemID";
import type { ValidationType } from "./ValidationType";

export interface Problem { id: ProblemID, created_at: string, submitted_by: string, body: ProblemBody, checker: Checker | null, validation: ValidationType, memory_limit: number, time_limit: number, is_public: boolean, test_cases: Array<string>, }