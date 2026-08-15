---
title: "Choosing a Loss Function"
description: "MSE vs. cross-entropy, and why the choice isn't arbitrary — it follows from what you assume about your data."
series: ml-foundations
series_title: "ML Foundations"
series_description: "A systematic walkthrough of the math behind machine learning — optimization, loss functions, and the ideas everything else builds on."
chapter: 2
date: 2026-08-15
tags: [optimization, ml-basics]
abstract: "Why mean squared error and cross-entropy aren't interchangeable — each one is the 'correct' loss under a different assumption about how your labels are generated."
---

In Chapter 01 we minimized an arbitrary function $f(x)$. In practice, $f$
is almost always a loss function you chose — and that choice isn't
arbitrary. It falls out of maximum likelihood estimation under an
assumption about the noise in your labels.

## Mean squared error assumes Gaussian noise

If you assume your targets $y$ are generated as $y = f_\theta(x) +
\varepsilon$ with $\varepsilon \sim \mathcal{N}(0, \sigma^2)$, maximizing
the likelihood of your data under that model is mathematically equivalent
to minimizing:

$$
\mathcal{L}_{\text{MSE}}(\theta) = \frac{1}{n} \sum_{i=1}^n \big(y_i - f_\theta(x_i)\big)^2
$$

That's why MSE is the default for regression: it's the right loss
specifically when your errors are roughly Gaussian and continuous.

## Cross-entropy assumes a categorical outcome

For classification, labels aren't continuous — they're categorical.
Assuming a categorical (or Bernoulli, for binary) distribution over classes
and doing the same maximum-likelihood derivation gives you cross-entropy
instead:

$$
\mathcal{L}_{\text{CE}}(\theta) = -\frac{1}{n} \sum_{i=1}^n \sum_{c=1}^{C} y_{i,c} \log \hat{y}_{i,c}
$$

<div class="margin-note">
Using MSE for a classification problem still "works" in the sense that
gradient descent will run — but the gradient no longer corresponds to a
correct likelihood model, so training tends to be slower and less
well-behaved near confident predictions.
</div>

The general pattern: pick your loss by asking what distribution you
believe generated your labels, then take the negative log-likelihood under
that distribution. Everything else — MSE, cross-entropy, Huber loss,
Poisson loss — falls out of that one rule.
