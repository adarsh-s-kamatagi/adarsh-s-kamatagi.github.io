---
title: "Gradient Descent, From First Principles"
description: "Deriving why the negative gradient is the direction of steepest descent, with a worked example."
series: ml-foundations
series_title: "ML Foundations"
series_description: "A systematic walkthrough of the math behind machine learning — optimization, loss functions, and the ideas everything else builds on."
chapter: 1
date: 2026-08-15
tags: [optimization, ml-basics]
abstract: "A short derivation of why moving opposite the gradient decreases a function fastest, followed by a worked minimization example and a picture of what the algorithm is actually doing on a loss surface."
---

Gradient descent is usually introduced as a rule to memorize: update your
parameters by subtracting a small multiple of the gradient. It's worth
deriving *why* that particular direction works, rather than taking it on
faith.

## The setup

Suppose we have a differentiable function $f(\mathbf{x})$ that we want to
minimize, where $\mathbf{x} \in \mathbb{R}^n$. Near a point $\mathbf{x}_0$, a
first-order Taylor expansion tells us:

$$
f(\mathbf{x}_0 + \epsilon \mathbf{v}) \approx f(\mathbf{x}_0) + \epsilon \, \nabla f(\mathbf{x}_0)^\top \mathbf{v}
$$

where $\mathbf{v}$ is a unit vector giving the direction we step in, and
$\epsilon$ is a small step size. We want to choose $\mathbf{v}$ to make the
change in $f$ as negative as possible.

## Why the negative gradient wins

The change in $f$ is governed by the dot product $\nabla
f(\mathbf{x}_0)^\top \mathbf{v}$. Since $\mathbf{v}$ is a unit vector, this
dot product is minimized (most negative) exactly when $\mathbf{v}$ points
opposite the gradient:

$$
\mathbf{v}^* = -\frac{\nabla f(\mathbf{x}_0)}{\lVert \nabla f(\mathbf{x}_0) \rVert}
$$

That's the whole idea. The gradient descent update rule just bakes this in,
using the (unnormalized) negative gradient scaled by a learning rate $\eta$:

$$
\mathbf{x}_{t+1} = \mathbf{x}_t - \eta \, \nabla f(\mathbf{x}_t)
$$

<div class="margin-note">
If $\eta$ is too large, the linear (first-order) approximation stops being
accurate over the step, and you can overshoot or diverge — this is why
learning rate tuning matters so much in practice.
</div>

## A worked example

Take $f(x) = (x - 3)^2$, with gradient $f'(x) = 2(x - 3)$. Starting at
$x_0 = 0$ with $\eta = 0.1$:

```python
def f(x):
    return (x - 3) ** 2

def grad_f(x):
    return 2 * (x - 3)

x = 0.0
lr = 0.1

for step in range(20):
    x = x - lr * grad_f(x)

print(f"x ≈ {x:.4f}")  # converges toward 3.0
```

Running this converges $x$ toward $3$, the true minimum, within a couple
dozen steps.

<figure>
  <svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Loss curve with descent steps">
    <rect width="640" height="320" fill="var(--bg-raised)" />
    <polyline points="20,280 60,240 100,205 140,175 180,150 220,128 260,112 300,100 340,92 380,88 420,90 460,96 500,108 540,124 580,146 620,172"
              fill="none" stroke="var(--ink-faint)" stroke-width="2" />
    <circle cx="60" cy="240" r="5" fill="var(--accent)" />
    <circle cx="140" cy="175" r="5" fill="var(--accent)" />
    <circle cx="220" cy="128" r="5" fill="var(--accent)" />
    <circle cx="300" cy="100" r="5" fill="var(--accent)" />
    <circle cx="360" cy="90" r="6" fill="var(--gold)" />
    <text x="360" y="70" font-family="IBM Plex Mono" font-size="12" fill="var(--ink-soft)" text-anchor="middle">x* = 3</text>
  </svg>
  <figcaption>Fig. 1 — Each descent step moves down the curve toward the minimum at x = 3.</figcaption>
</figure>

This is a placeholder diagram built as inline SVG (so it needs no image
file at all, and inherits your theme colors automatically). For photos or
screenshots, drop a file into `assets/images/` and reference it normally:

```html
<figure>
  <img src="/assets/images/my-photo.png" alt="Description of the image" />
  <figcaption>Fig. 2 — Caption text goes here.</figcaption>
</figure>
```

---

That's the core idea underneath essentially every optimizer used in deep
learning today — Adam, RMSProp, and friends are all built on top of this
same first-order intuition, with extra machinery for adapting the step size
and direction.
