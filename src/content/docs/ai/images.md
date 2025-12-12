---
title: Image Models
description: Generate images with AI models including DALL-E-2, DALL-E-3, and Stability AI using OpenAI and Stability AI API keys in your Django application.
sidebar:
  order: 3
---

Pegasus includes an optional example app for generating images with multiple different models,
including
[Gemini/Nano Banana Pro](https://gemini.google/overview/image-generation/),
[Dall-E-2](https://openai.com/index/dall-e-2) and [Dall-E-3](https://openai.com/index/dall-e-3)
and [Stability AI](https://stability.ai/) (Stable Diffusion 3).

## Configuration

You will need to set the following environment/.env variables to use the different models:

| Model | Environment Variable |
|-------|---------------------|
| Gemini / Nano Banana | `AI_IMAGES_GEMINI_API_KEY` |
| Dall-E | `AI_IMAGES_OPENAI_API_KEY` |
| Stability AI | `AI_IMAGES_STABILITY_AI_API_KEY` |

You can choose which model you want to use from the dropdown on the image generation page.
