---
title: Image Models
description: Generate images with AI models including DALL-E-2, DALL-E-3, and Stability AI using OpenAI and Stability AI API keys in your Django application.
sidebar:
  order: 3
---

Pegasus includes an optional example app for generating images with multiple different models,
including [Dall-E-2](https://openai.com/index/dall-e-2) and [Dall-E-3](https://openai.com/index/dall-e-3)
and [Stability AI](https://stability.ai/) (Stable Diffusion 3).

## Configuration

To use the Dall-E models, you must set `OPENAI_API_KEY` in your environment,
and to use Stability AI, you must set `STABILITY_AI_API_KEY`.

You can choose which model you want to use from the dropdown on the image generation page.
