// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { Checker } from "./Checker";
import type { PolicyExecution } from "./PolicyExecution";
import type { ProblemID } from "./ProblemID";
import type { SystemPolicy } from "./SystemPolicy";
import type { TestCase } from "./TestCase";
import type { ValidatorType } from "./ValidatorType";

export interface Problem { problem_id: ProblemID, name: string | null, policy_execution: PolicyExecution, system_policy: SystemPolicy | null, test_cases: Array<TestCase>, checker: Checker | null, validation_type: ValidatorType, }