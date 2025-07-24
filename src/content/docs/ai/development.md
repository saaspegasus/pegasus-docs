---
title: AI Integrations for Development
description: Set up AI-powered coding assistants with Cursor, Claude Code, and Junie, including rules files and MCP tools for enhanced Pegasus development workflow.
sidebar:
  order: 1
---

As of version 2025.4, Pegasus includes tooling for integrating with AI-powered coding assistants and tools.
These will be constantly edited, expanded on, and improved as the community is able to provide more feedback on them.

## Video overview

See below for a demo of how you can use these tools to help you with development.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto; margin-bottom: 1em;">
    <iframe src="https://www.youtube.com/embed/o3VrQFdvVQ8" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

## LLM-Friendly Documentation

This documentation has llm-friendly markdown files that can be copy/pasted or linked to in any LLM
or AI-coding assistant.

There is an [llms.txt](/llms.txt) index file with further links to other files you can use,
including the [llms-small.txt file](https://docs.saaspegasus.com/llms-small.txt)
(a compact version of the documentation with the essentials), and the
[llms-full.txt file](https://docs.saaspegasus.com/llms-full.txt), with the complete documentation.

All llm files are formatted in markdown.

## Rules Files

Pegasus ships with a set of rules files that are designed to be used with coding assistants.
These rules are broken out into various sections---e.g. architecture, general guidelines,
and guidelines for specific programming languages and frameworks.
The rules have been custom developed for Pegasus applications and contain best-practices
and information for building on Pegasus.

When the tool supports it (e.g. in Cursor), these rules files will be organized and labeled in ways that
allow for them to be automatically included in the appropriate contexts.

You can edit your rules freely after downloading your project.
They are provided as a quick way to get started.

## MCP

Pegasus also includes a default MCP setup containing two tools, a database inspector (Postgres builds only),
and a web browser.
You can use these tools to give your AI assistants access to your database + schema and let them
work directly with your application in a browser.

See the demo video above for more detail.

## Working with Cursor

[Cursor](https://www.cursor.com/) is an AI code editor (IDE).
If you enable the Cursor integration, your rules files will be saved to the `/.cursor/rules/` directory
and will be labeled to be automatically included based on the context.
For example, the Python coding guidelines will be included anytime you're editing a `.py` file.

The MCP setup for Cursor will be saved to `.cursor/mcp.json`, and should be discoverable by Cursor there.

You can modify the rules files and MCP set up in your Cursor settings or by editing the files by hand.

## Working with Claude Code

[Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) is a command-line
coding assistant built by Anthropic.
If you enable the Claude code integration, your rules will be collapsed into a single, organized `CLAUDE.md`
file for Claude to use.

Additionally, the MCP setup will be saved to `.mcp.json` and should be automatically discovered by claude.

### The Github Workflow file

You can also optionally enable a Github workflow file for Claude.
When this is enabled, you will be able to mention @claude on any Github issue or pull request to trigger a claude code update.

In order for this to work, you will have to add an `ANTHROPIC_API_KEY` to your repository secrets.
You can learn more in the [Claude code docs](https://docs.anthropic.com/en/docs/claude-code/github-actions)
and [Github secrets docs](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions).

## Working with Junie

[Junie](https://www.jetbrains.com/junie/) is the coding assistant built by JetBrains (makers of PyCharm).
If you enable the Junie integration, your rules will be collapsed into a single, organized `.junie/guidelines.md`
file for Junie to use.

## Other tools

If you're using a different tool, it is recommended to choose one of the two above when building your project
and then copy the files to wherever your tool expects them.
Choose "Cursor" if you want the rules files split up, and "Claude" if you prefer a single rules file.

Also, if you'd like support or help configuring a different tool, email support@saaspegasus.com and let me know!
