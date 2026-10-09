# Agent Conventions

> **Authority:** POLICY  
> **Owner:** user ↔ Chat/Agent interaction semantics for the Publishing Platform project  
> **Scope:** conversation approval, work resumption, decision boundaries, communication, tool use, remote-state reconciliation, and user-owned security operations  
> **Read when:** the task involves approval, resume/recovery, tool failure or fallback, remote mutation, ambiguous current state, or interaction decisions  
> **Enforced by:** Chat/Agent behavior; tool-specific authorization and safety controls remain owned by the corresponding integration

Project state, planning, Git workflow, implementation rules, and repository-specific technical contracts remain in their owning sources routed by [CONTEXT](../CONTEXT.md).

## Approval

`LGTM` approves the immediately preceding proposed action. Proceed without asking for conversation confirmation again.

Approval is limited to the scope of that proposal.

## Resume work

When the user says `작업 재개` or otherwise asks to resume work, recover the task from canonical sources, live Project/Issue/PR state, and owning-repository Evidence routed by CONTEXT.

Read live state when the requested operation or conclusion depends on that state. A document-only explanation does not require unrelated Project metadata to be reverified.

Do not ask the user to restate information that can be recovered from those sources. Do not maintain a session handoff file or transcript as a parallel current-state ledger.

## Decision boundary

When existing policy and context are sufficient, make routine and reversible decisions and continue.

Ask the user only when a meaningful product, policy, ownership, or other non-derivable decision remains. Resolve factual uncertainty from canonical or live sources before asking.

Work in small, verifiable deltas. Do not make surrounding metadata verification a blocker when it does not affect the requested operation or conclusion.

## Policy mismatch and recovery

When observed behavior or live state conflicts with the working understanding, re-enter through [CONTEXT](../CONTEXT.md), reload the relevant owning source, and reconcile before continuing work that depends on the discrepancy.

Use [Repository Design](repository-design.md#policy--policy-discovery-and-interpretation) to distinguish policy scope, local specialization, guidance, implementation facts, and historical Evidence. Use its [policy change boundary](repository-design.md#policy--policy-changes) when adding, changing, or removing a rule.

Resolve recoverable facts before asking. If a meaningful user decision remains, identify the exact unresolved choice and its dependent work; continue independent work within the existing authorization. A request to review a proposal does not itself approve its normative changes. Do not ask again for approval already given for the same scope.

## Communication

Use Korean prose for project discussion unless the task requires another language. Preserve exact English field, option, command, identifier, and API names.

When a relevant GitHub Issue, PR, branch, commit, workflow run, or other durable object has a known URL, provide a clickable link on first useful mention.

Report tool failures and unresolved state explicitly rather than presenting an intended operation as completed.

## Durable state

Promote durable decisions to their owning canonical sources rather than leaving them only in Chat.

If work must continue in a later session, represent the unfinished state in Project #11, an Issue, a PR, or owning-repository Evidence as appropriate.

Historical reasoning comes from Git history and immutable Evidence, not a session-specific handoff ledger.

## Capability fallback

Before handing a project operation back to the user as manual work, check whether a currently available project-capable tool, plugin, MCP integration, or skill can perform it directly.

Prefer the narrowest currently connected capability that can complete the requested operation with the required authority and verifiable result. Do not redirect a bounded operation to a broader execution environment merely because that environment is available when an existing connected capability is sufficient.

Do not infer a general capability limitation from one integration's unsupported operation or denial. Treat integration capabilities as runtime state rather than maintaining a static capability inventory in project policy.

## Tool failures

Do not repeatedly guess alternative arguments after a failed tool call.

Inspect the actual error, capability, schema, or live state first, and retry only when there is a concrete reason the next attempt should differ.

A failed, rejected, expired, approval-blocked, timed-out, or otherwise ambiguous write does not establish the resulting remote state.

Before retrying an ambiguous write or concluding that manual user intervention is required, re-read the relevant canonical remote state when that state is observable.

## Remote state verification

Do not infer that a remote object is absent from a partial list result.

When a result exposes `totalCount`, returned-item count, pagination, a cursor, a limit, truncation, or another completeness signal, determine whether the retrieved result is complete before concluding that a target does not exist.

If a target is not present in an incomplete result, continue the read using the supported pagination, limit, cursor, or direct lookup mechanism before considering a write or asking the user. Prefer direct lookup by a stable identifier when it can establish the required state with equal or greater authority.

Do not infer remote state solely from the expected automation path. The presence or absence of a repository-local workflow, activation mechanism, webhook, or other implementation path does not prove the corresponding remote state. Read the remote source of truth directly when possible.

Before performing a write whose purpose is to reconcile remote state:

1. read the current canonical state;
2. determine whether the desired state is already satisfied;
3. compute and perform only the remaining delta;
4. verify the resulting canonical state with a separate read when that verification materially affects the conclusion.

If the desired state is already present, treat the operation as satisfied. Do not retry a previously failed or approval-blocked write merely because its execution result was unsuccessful.

## Tool-specific approval

Conversation approval and tool-enforced execution approval are separate concepts.

`LGTM` approves the proposed action at the Chat/Agent interaction layer. If a connected tool independently requires local, provider-side, or command-bound approval, conversation approval does not bypass that mechanism.

Likewise, an app-level permission does not override a connected tool or plugin's own authorization and safety policy.

Do not request tool-specific approval until a live-state check shows that the corresponding write is still necessary.

When a tool requires separate approval, explain only the minimum user action required by that tool. When the integration exposes a canonical executable operator command, provide that exact command rather than only a request ID or abstract approval instruction. Do not invent an approval command that the integration has not established.

Do not present that requirement as a general limitation of the external service, ChatGPT, or other available integrations.

Do not generalize an approval requirement, denial, or unsupported operation from one tool to other tools without checking their capabilities.

After a tool-specific approval or mutation, verify the remote state when the result determines subsequent work.

## User-owned security boundary

Account, credential, secret, OAuth-consent, security-key, and equivalent security-sensitive operations remain user-owned.

Do not request secret values or assume responsibility for those operations. When user action is required, provide only the necessary procedure or executable command.
