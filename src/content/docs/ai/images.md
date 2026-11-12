---
title: Image Models
description: Generate images with AI models including Nano Banana Pro, Nano Banana 2, and GPT Image 2 using Gemini and OpenAI API keys in your Django application.
sidebar:
  order: 3
---

Pegasus includes an optional example app for generating images with multiple different models,
including
[Nano Banana Pro and Nano Banana 2](https://gemini.google/overview/image-generation/) from Google,
and [GPT Image 2](https://platform.openai.com/docs/guides/image-generation) from OpenAI.

## Configuration

You will need to set the following environment/.env variables to use the different models:

| Model | Environment Variable |
|-------|---------------------|
| Nano Banana Pro / Nano Banana 2 | `AI_IMAGES_GEMINI_API_KEY` |
| GPT Image 2 | `AI_IMAGES_OPENAI_API_KEY` |

You can choose which model you want to use from the dropdown on the image generation page.
